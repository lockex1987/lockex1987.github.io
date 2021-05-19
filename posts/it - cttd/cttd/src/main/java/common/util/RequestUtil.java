/*
 * NVH.
 */
package common.util;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

// TODO: QueryCrypt library is commercial now
//import com.guhesan.querycrypt.QueryCrypt;
//import com.guhesan.querycrypt.beans.RequestParameterObject;

import common.bean.UserBean;

/**
 *
 * @author lockex1987
 */
public class RequestUtil {

	// Ma thanh cong
	private static final Long SUCCESS_CODE = 0L;
	// Ma loi
	private static final Long ERROR_CODE = 1L;

	// Bien session luu thong tin user
	private static final String USER_BEAN = "userBean";

	// Ngon ngu, dia phuong (xau)
	private static final String LOCALE = "sessionLocale";
	// Ngon ngu, dia phuong (doi tuong locale)
	private static final String LOCALE_KEY = "org.apache.struts.action.LOCALE";

	// Thu muc chua template
	private static String EXPORT_TEMPLATE_FOLDER = "/share/export_template/";
	// Thu muc chua file tam de import
	private static String IMPORT_CONFIG_FOLDER = "/share/import_config/";
	// Thu muc chua file tam de import
	private static String IMPORT_TEMPLATE_FOLDER = "/share/import_template/";

	public static String getParameter(HttpServletRequest req, String param) {
		String s = req.getParameter(param);
		if (s != null) {
			return s;
		} else if (req.getParameter("_hd") == null) {
			// 'hd' means 'Huyen Duong'
			return null;
		} else {
			//RequestParameterObject r = QueryCrypt.decrypt(req);
			//return r.getParameter(param);
			
			return req.getParameter(param);
		}
	}

	public static String getEncryptedParameter(HttpServletRequest req, String param) {
		//RequestParameterObject r = QueryCrypt.decrypt(req);
		//return r.getParameter(param);
		
		return req.getParameter(param);
	}

	public static void createSuccessMessage(HttpServletRequest req, String messageKey,
			String extraValue, Object... args) {
		createMessage(req, SUCCESS_CODE, messageKey, extraValue, args);
	}

	public static void createErrorMessage(HttpServletRequest req, String messageKey,
			String extraValue, Object... args) {
		createMessage(req, ERROR_CODE, messageKey, extraValue, args);
	}

	private static void createMessage(HttpServletRequest req, Long returnCode, String messageKey,
			String extraValue, Object... args) {
		req.setAttribute("returnCode", returnCode);
		req.setAttribute("extraValue", extraValue);

		if (messageKey != null) {
			req.setAttribute("message", getMessage(messageKey, req, args));
		}

		String callback = RequestUtil.getParameter(req, "callback");
		if (!CommonUtils.isNullOrEmpty(callback)) {
			req.setAttribute("callback", callback);
		}
	}

	public static String getExportTemplatePath(HttpServletRequest req, String relativePath) {
		return req.getRealPath(EXPORT_TEMPLATE_FOLDER
				+ req.getSession().getAttribute(LOCALE)
				+ relativePath);
	}

	public static UserBean getUserBean(HttpServletRequest req) {
		return (UserBean) req.getSession().getAttribute(USER_BEAN);
	}

	public static void setUserBean(HttpServletRequest req, UserBean userBean) {
		HttpSession session = req.getSession();
		session.setAttribute(USER_BEAN, userBean);
	}

	public static void setLocale(HttpServletRequest req, String locale) {
		HttpSession session = req.getSession();

		session.setAttribute(LOCALE, locale);

		String[] a = locale.split("_");
		session.setAttribute(LOCALE_KEY, new Locale(a[0], a[1]));
	}

	public static String getLocaleString(HttpServletRequest req) {
		HttpSession session = req.getSession();
		return (String) session.getAttribute(LOCALE);
	}

	public static Locale getLocaleObject(HttpServletRequest req) {
		HttpSession session = req.getSession();
		Locale locale = (Locale) session.getAttribute(LOCALE_KEY);
		return locale;
	}

	public static String getMessage(String key, HttpServletRequest req) {
		return MessageUtil.getMessage(key, getLocaleObject(req));
	}

	public static String getMessage(String key, HttpServletRequest req, Object... args) {
		return MessageUtil.getMessage(key, getLocaleObject(req), args);
	}
}
