package common.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cttd.admin.model.User;
import lombok.extern.slf4j.Slf4j;
import common.util.DBUtil;

@Slf4j
public class CommonFilter implements Filter {

	// Các đường dẫn mà không cần đăng nhập
	private static final String[] PUBLIC_EQUALS_URLS = {
			"",
			"/",
			"/login",
			"/captcha"
	};
	private static final String[] PUBLIC_STARTS_WITH_URLS = {
			"/public/"
	};

	// Các đường dẫn file tĩnh, không cần filter
	private static final String[] STATIC_URLS = {
			"/js/",
			"/css/",
			"/images/",
			"/lib/",
			"/html/"
	};

	// Các cấu hình của filter
	private String charset;
	private boolean enableCors;
	private boolean enableDatabase;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		charset = filterConfig.getInitParameter("charset");
		if (charset == null) {
			charset = "UTF-8";
		}

		String corsConfig = filterConfig.getInitParameter("enableCors");
		if (corsConfig == null) {
			enableCors = false;
		} else {
			enableCors = Boolean.parseBoolean(corsConfig);
		}

		String databaseConfig = filterConfig.getInitParameter("enableDatabase");
		if (databaseConfig == null) {
			enableDatabase = false;
		} else {
			enableDatabase = Boolean.parseBoolean(corsConfig);
		}
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		try {
			String url = req.getRequestURI();
			String contextPath = req.getContextPath();

			// Nếu là file tĩnh thì trả về luôn
			if (isStaticUrl(contextPath, url)) {
				chain.doFilter(req, resp);
				return;
			}

			// Kiểm tra phân quyền
			User user = (User) req.getSession().getAttribute("currentUser");
			if (!isPublicUrl(contextPath, url) && user == null) {
				log.debug("Not public url: " + url);
				redirectLoginPage(req, resp);
				return;
			}

			characterEncoding(req);
			enableCors(resp);

			long startTime = System.currentTimeMillis();
			if (enableDatabase) {
				chainWithDatabase(req, resp, chain);
			} else {
				chain.doFilter(req, resp);
			}

			long executeTime = System.currentTimeMillis() - startTime;
			log.debug("Execute time (" + url + "): " + executeTime);
		} catch (Exception ex) {
			log.error("Catch Error", ex);
			processError(req, resp, ex);
		}
	}

	@Override
	public void destroy() {
	}

	private void enableCors(HttpServletResponse res) {
		if (enableCors) {
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
			res.setHeader("Access-Control-Allow-Headers", "*");
			res.setHeader("Access-Control-Max-Age", "3600");
		}
	}

	private void characterEncoding(ServletRequest request) throws UnsupportedEncodingException {
		request.setCharacterEncoding(charset);
	}

	private void processError(ServletRequest request, HttpServletResponse res, Exception ex)
			throws IOException, ServletException {
		// Analyze the servlet exception
		// res.sendRedirect("/login.jsp");

		// Khong bat duoc loi 404 not found
		request.setAttribute("errorMessage", ex);
		res.setStatus(200);
		res.setContentType("text/html; charset=UTF-8");

		request.getServletContext()
				.getRequestDispatcher("/WEB-INF/pages/error.jsp")
				.forward(request, res);

		// throw ex;
	}

	private void redirectLoginPage(ServletRequest request, HttpServletResponse res)
			throws IOException, ServletException {
		res.setStatus(200);
		res.setContentType("text/html; charset=UTF-8");
		request.getServletContext()
				.getRequestDispatcher("/WEB-INF/pages/login.jsp")
				.forward(request, res);
	}

	private void chainWithDatabase(ServletRequest request, ServletResponse response, FilterChain chain) {
		// Access database
		try {
			DBUtil.openThreadSession();
			DBUtil.beginTransaction();

			chain.doFilter(request, response);
			DBUtil.commitTransaction();
		} catch (Exception ex) {
			ex.printStackTrace();
			DBUtil.rollbackTransaction();
		} finally {
			DBUtil.closeSession();
		}
	}

	private void logging() {
		// Log, CSRF
	}

	private boolean isPublicUrl(String contextPath, String url) {

		for (String s : PUBLIC_EQUALS_URLS) {
			if (url.equals(contextPath + s)) {
				return true;
			}
		}

		for (String s : PUBLIC_STARTS_WITH_URLS) {
			if (url.startsWith(contextPath + s)) {
				return true;
			}
		}

		return false;
	}

	public boolean isStaticUrl(String contextPath, String url) {
		for (String s : STATIC_URLS) {
			if (url.startsWith(contextPath + s)) {
				return true;
			}
		}
		return false;
	}
}
