package cttd.admin.controller;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import common.bean.PaginationList;
import common.util.PasswordUtil;
import cttd.admin.dao.UserDAO;
import cttd.admin.model.User;
import common.util.DBUtil;

/**
 * Người dùng.
 */
@Controller
public class UserController {

	@Autowired
	private UserDAO userDAO;

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public String index() {
		return "user";
	}

	@RequestMapping(value = "/user/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public PaginationList search(@RequestParam String query, @RequestParam Integer page) {
		PaginationList paginationList = userDAO.search(query, page);
		return paginationList;
	}

	@RequestMapping(value = "/user/get", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public User get(@RequestParam Integer id) {
		User u = DBUtil.get(User.class, id);
		//TODO: Không được hiện password ở đây
		return u;
	}

	// Avatar?
	@RequestMapping(value = "/user/save", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public String save(
			@RequestParam(required = false) Long id,
			@RequestParam String loginName,
			@RequestParam String fullName,
			@RequestParam(required = false) String email,
			@RequestParam(required = false) String phone,
			@RequestParam(required = false) String password) {
		// Nếu trùng thì báo lỗi
		if (userDAO.duplicateLoginName(loginName, id)) {
			return "{ \"returnCode\": 1 }";
		}

		User u;
		if (id != null && id > 0) {
			u = DBUtil.get(User.class, id);

			// Nếu nhập mật khẩu thì cập nhật, không nhập thì bỏ qua
			if (password != null && !password.isEmpty()) {
				setPassword(password, u);
			}
		} else {
			u = new User();
			u.setCreatedTime(new Timestamp(new Date().getTime()));
			setPassword(password, u);
		}

		u.setLoginName(loginName);
		u.setFullName(fullName);
		u.setEmail(email);
		u.setPhone(phone);
		if (id != null && id > 0) {
			DBUtil.update(u);
		} else {
			DBUtil.save(u);
		}

		return "{ \"returnCode\": 0 }";
	}

	@RequestMapping(value = "/user/delete", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public String deleteUser(@RequestParam Long id) {
		DBUtil.deleteById(id, User.class, "id");
		return "{ \"returnCode\": 0 }";
	}

	private void setPassword(String password, User u) {
		String salt = PasswordUtil.generateSalt();
		String passwordHash = PasswordUtil.encryptPassword(password, salt);
		u.setSalt(salt);
		u.setPasswordHash(passwordHash);
	}
}
