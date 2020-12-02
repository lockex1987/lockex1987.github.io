package cttd.admin.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.cage.Cage;
import com.github.cage.GCage;

import common.util.PasswordUtil;
import cttd.admin.dao.UserDAO;
import cttd.admin.model.User;
import common.util.CommonUtils;

/**
 * Xử lý đăng nhập SSO.
 */
@Controller
public class LoginController {
	
	// Key để lưu mã captcha trong session
	private static final String SESSION_CAPTCHA_TOKEN = "captchaToken";
	
	// Key để lưu số lần đăng nhập thất bại trong session
	private static final String SESSION_LOGIN_FAILED_NUM = "loginFailedNum";
	
	@Autowired
	private UserDAO userService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String showLogin(HttpSession session) {
		// Kiểm tra đã có phiên chưa, có thì reload
		User user = (User) session.getAttribute("currentUser");
		if (user != null) {
			return "home";
		} else {
			// Chưa có hiển thị trang đăng nhập
			return "login";
		}
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody String processLogin(HttpSession session,
			HttpServletRequest req, HttpServletResponse resp,
			@RequestParam String loginName,
			@RequestParam String password,
			@RequestParam(required = false) String captcha) {
		String storedCaptcha = (String) session.getAttribute(SESSION_CAPTCHA_TOKEN);
		
		// Trường hợp cần kiểm tra captcha
		if (storedCaptcha != null) {
			// Captcha không chính xác
			if (!storedCaptcha.equalsIgnoreCase(captcha)) {
				return "{ \"returnCode\": 5, \"useCaptcha\": true }";
			}

			// Người dùng đã nhập đúng, reset lại captcha
			session.setAttribute(SESSION_CAPTCHA_TOKEN, null);
			session.setAttribute(SESSION_LOGIN_FAILED_NUM, null);
		}		

		User u = userService.getUserByLoginName(loginName);
		
		// Người dùng không tồn tại
		if (u == null) {
			return "{ \"returnCode\": 1, \"useCaptcha\": " + increaFailedNum(session) + " }";
		}

		String salt = u.getSalt();
		String passwordHashOfUser = PasswordUtil.encryptPassword(password, salt);
		
		// Password không chính xác
		if (!passwordHashOfUser.equals(u.getPasswordHash())) {
			return "{ \"returnCode\": 1, \"useCaptcha\": " + increaFailedNum(session) + " }";
		}
		
		// Đăng nhập thành công
		
		// Fix lỗi Session Fixation
		session.invalidate();
		session = req.getSession(true);

		session.setAttribute("currentUser", u);
		session.setAttribute("contextPath", req.getContextPath());
		return "{ \"returnCode\": 0 }";
	}
	
	@RequestMapping(value = "/captcha", method = RequestMethod.GET)
	public void getCaptcha(HttpSession session, HttpServletRequest req, HttpServletResponse resp) throws IOException {
		Cage cage = new GCage();
		
		// Bước 1: Sinh xâu ngẫu nhiên
		String token = CommonUtils.generateCaptcha();
		
		// Bước 2: Lưu vào session
		session.setAttribute(SESSION_CAPTCHA_TOKEN, token);
		
		// Bước 3.1: Thiết lập header (chú ý chỉnh lại đúng contentType)
		long time = System.currentTimeMillis();
		resp.setContentType("image/" + cage.getFormat());
		//resp.setContentType(MediaType.IMAGE_PNG_VALUE);
		
		resp.setHeader("Cache-Control", "no-cache, no-store");
		resp.setHeader("Pragma", "no-cache");
		resp.setDateHeader("Last-Modified", time);
		resp.setDateHeader("Date", time);
		resp.setDateHeader("Expires", time);
		
		// Bước 3.2: Trả về file ảnh binary cho người dùng
		// Cách 1: Sử dụng thư viện Cage (bị lỗi font khi triển khai trên con thật của admin.itrithucviet.vn
		cage.draw(token, resp.getOutputStream());
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String showLogin() {
		return "home";
	}

	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(ModelMap model, HttpSession session) {
		session.invalidate();
		// Không còn path là /logout trên URL nữa
		return "redirect:/";
	}
	
	/**
	 * Tăng số lần đăng nhập thất bại lên 1.
	 * Kiểm tra xem đã cần captcha chưa
	 * @param session
	 * @return true nếu cần captcha
	 */
	private boolean increaFailedNum(HttpSession session) {
		Long loginFailedNum = (Long) session.getAttribute(SESSION_LOGIN_FAILED_NUM);
		if (loginFailedNum == null) {
			session.setAttribute(SESSION_LOGIN_FAILED_NUM, 1L);
			return false;
		} else if (loginFailedNum > 3) {
			return true;
		} else {
			loginFailedNum++;
			session.setAttribute(SESSION_LOGIN_FAILED_NUM, loginFailedNum);
			return false;
		}
	}
}
