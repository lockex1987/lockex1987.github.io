package cttd.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import common.bean.PaginationList;
import cttd.admin.dao.RoleDAO;
import cttd.admin.model.Role;
import cttd.admin.model.User;
import cttd.admin.model.UserRole;
import common.util.DBUtil;

@Controller
public class RoleController {

	@Autowired
	private RoleDAO roleDAO;

	@RequestMapping(value = "/role", method = RequestMethod.GET)
	public String index() {
		return "role";
	}

	@RequestMapping(value = "/role/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public PaginationList search(@RequestParam String query, @RequestParam Integer page) {
		PaginationList paginationList = roleDAO.search(query, page);
		return paginationList;
	}

	@RequestMapping(value = "/role/get", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public Role get(@RequestParam Long id) {
		Role role = DBUtil.get(Role.class, id);
		return role;
	}

	@RequestMapping(value = "/role/save", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public String save(@RequestParam(required = false) Long id,
			@RequestParam String code,
			@RequestParam String name) {
		if (DBUtil.duplicate(Role.class, "id", id, "code", code)) {
			return "{ \"returnCode\": 1 }";
		}
		Role role = (id != null) ? DBUtil.get(Role.class, id) : new Role();
		role.setName(name);
		role.setCode(code);
		DBUtil.saveOrUpdate(role);
		return "{ \"returnCode\": 0 }";
	}

	@RequestMapping(value = "/role/delete", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public String delete(@RequestParam Long id) {
		// Xóa cả bảng RolePermission
		DBUtil.deleteById(id, UserRole.class, "roleId");
		DBUtil.deleteById(id, Role.class, "id");
		return "{ \"returnCode\": 0 }";
	}

	@RequestMapping(value = "/role/user/get-all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public List<UserRole> getAllUsers(@RequestParam Long roleId) {
		// Lấy ra tất cả người dùng
		List<User> userList = DBUtil.find(User.class, "id desc");

		// Lấy ra những người dùng hiện tại của vai trò
		List<UserRole> checkedUserRoleList = DBUtil.find(UserRole.class, "roleId", roleId, "id");

		// Chuyển sang Map cho dễ xử lý
		Map<Long, Long> checkedUserRoleMap = new HashMap<>();
		for (UserRole e : checkedUserRoleList) {
			checkedUserRoleMap.put(e.getUserId(), e.getId());
		}

		// Danh sách trả về cho người dùng
		List<UserRole> allUserRoleList = new ArrayList<>(userList.size());
		for (User u : userList) {
			Long userId = u.getId();
			UserRole userRole = new UserRole();
			userRole.setRoleId(roleId);
			userRole.setUserId(userId);
			userRole.setLoginName(u.getLoginName());
			userRole.setFullName(u.getFullName());
			Long userRoleId = checkedUserRoleMap.get(userId);
			if (userRoleId == null) {
				userRole.setChecked(false);
			} else {
				userRole.setChecked(true);
				userRole.setId(userRoleId);
			}
			
			allUserRoleList.add(userRole);
		}
		return allUserRoleList;
	}

	@RequestMapping(value = "/role/user/add", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public String addUserToRole(@RequestParam Long roleId, @RequestParam Long userId) {
		UserRole userRole = new UserRole();
		userRole.setRoleId(roleId);
		userRole.setUserId(userId);
		DBUtil.save(userRole);
		DBUtil.flushSession();
		Long id = userRole.getId();
		return "{ \"returnCode\": 0, \"id\": " + id + " }";
	}

	@RequestMapping(value = "/role/user/remove", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public String removeUserFromRole(@RequestParam Long userRoleId) {
		DBUtil.deleteById(userRoleId, UserRole.class, "id");
		return "{ \"returnCode\": 0 }";
	}
}
