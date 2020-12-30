/*
 * NVH.
 */
package common.server;

// TODO
//import com.guhesan.querycrypt.QueryCrypt;

import common.bean.ActionResult;
import common.bean.MenuBean;
import common.bean.PermissionBean;
import common.bean.UserBean;
import common.util.ActionConfigUtil;
import common.util.CommonUtils;
import common.util.DBUtil;
import common.util.LoginSessionListener;
import common.util.PermissionUtil;
import common.util.RequestUtil;
import lombok.extern.slf4j.Slf4j;

import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.hibernate.Query;

//import com.guhesan.querycrypt.QueryCrypt;

/**
 * Skeleton of the application.
 *
 * @author lockex1987
 */
@Slf4j
public class ServiceAction extends Action {

	/**
	 * Kiem tra token
	 */
	private final ActionConfigUtil actionConfigUtil = new ActionConfigUtil();
	/**
	 * Kiem tra quyen
	 */
	private final PermissionUtil permissionUtil = CommonUtils.getConfig("permissionCheckerClass") == null
					? null : PermissionUtil.newInstance(CommonUtils.getConfig("permissionCheckerClass"));
	/**
	 * Luu log
	 */
	private final boolean saveRequestLog = CommonUtils.getConfig("saveRequestLog") == null
					? false : Boolean.parseBoolean(CommonUtils.getConfig("saveRequestLog"));

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest req, HttpServletResponse res)
					throws Exception {
		Date startTime = new Date();
		String className = RequestUtil.getEncryptedParameter(req, "className");
		String methodName = RequestUtil.getEncryptedParameter(req, "methodName");
		if (className == null) {
			return mapping.findForward("index");
		}

		// Kiem tra token
		String path = className + "!" + methodName;
		Long csrfConfig = actionConfigUtil.getCsrfConfig(path);
		if (ActionConfigUtil.SAVE_CSRF.equals(csrfConfig)) {
			saveToken(req);
		} else if (ActionConfigUtil.CHECK_CSRF.equals(csrfConfig)) {
			if (!isTokenValid(req)) {
				return mapping.findForward("invalidToken");
			} else {
				resetToken(req);
				saveToken(req);
			}
		}

		// Kiem tra session hijacking
		HttpSession session = req.getSession();
		for (UserBean u : LoginSessionListener.userOnlineList) {
			if (u.getSessionId().equals(session.getId())
							&& (!u.getIpAddress().equals(req.getRemoteAddr()) || !u.getUserAgent().equals(req.getHeader("User-Agent")))) {
				try {
					session.invalidate();
				} catch (Exception ex) {
					log.error("Loi khi invalidate session");
				}
			}
		}

		try {
			// Begin transaction
			DBUtil.openThreadSession();
			DBUtil.beginTransaction();

			// Check quyen
			PermissionBean permissionBean = null;
			if (permissionUtil != null) {
				permissionBean = actionConfigUtil.getPermissionConfig(path);
			}
			if (permissionUtil != null && permissionBean != null && !permissionUtil.havePermission(permissionBean, req)) {
				return mapping.findForward("invalidPermission");
			} else {
				// Forward all parameters for Controller

				Class[] classArg = new Class[]{
					ActionForm.class,
					HttpServletRequest.class,
					HttpServletResponse.class
				};
				Object[] objectArg = new Object[]{
					form,
					req,
					res
				};
				Class classObj = Class.forName(className);
				Method method = classObj.getMethod(methodName, classArg);
				//ActionResult actionResult = (ActionResult) method.invoke(classObj.newInstance(), objectArg);
				ActionResult actionResult = (ActionResult) method.invoke(null, objectArg); // static method, seems slower

				UserBean userBean = (UserBean) req.getSession().getAttribute("userBean");
				if (saveRequestLog) {
					Date endTime = new Date();
					String sql = " INSERT INTO Request_Log( "
									+ "     user_name, "
									+ "     ip_address, "
									+ "     action_date, "
									+ "     hour, "
									+ "     minute, "
									+ "     second, "
									+ "     path, "
									+ "     execute_time "
									+ " ) "
									+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ? ) ";
					Query query = DBUtil.createSQLQuery(sql);
					query.setParameter(0, userBean == null ? "" : userBean.getLoginName());
					query.setParameter(1, req.getRemoteAddr());
					query.setParameter(2, (endTime.getYear() + 1900) * 10000 + (endTime.getMonth() + 1) * 100 + endTime.getDate());
					query.setParameter(3, endTime.getHours());
					query.setParameter(4, endTime.getMinutes());
					query.setParameter(5, endTime.getSeconds());
					query.setParameter(6, path);
					query.setParameter(7, endTime.getTime() - startTime.getTime());
					query.executeUpdate();
				}

				DBUtil.commitTransaction();

				// Process response
				res.setContentType("text/html; charset=UTF-8");
				if (actionResult == null) {
					return null;
				} else if (actionResult.json != null) {
					PrintWriter writer = res.getWriter();
					writer.print(actionResult.json);
					writer.flush();
					writer.close();
					return null;
				} else {
					String menuCode = RequestUtil.getParameter(req, "menuCode");
					if (menuCode != null && !menuCode.isEmpty()) {
						Map<String, MenuBean> menuMap = (Map<String, MenuBean>) session.getAttribute("menuMap");
						MenuBean menuBean = menuMap.get(menuCode);
						if (menuBean != null) {
							String[] codes = menuBean.getCodePath().split("/");
							StringBuilder subMenu = new StringBuilder();
							if (codes.length > 1) {
								for (int i = 0; i < codes.length - 1; i++) {
									MenuBean parentMenu = menuMap.get(codes[i]);
									subMenu.append("<li class='top'>")
													.append("<a class='top_link'><span class='down'>").append(parentMenu.getName()).append("</span></a>")
													.append("<span class='down-arrow'></span>")
													.append(parentMenu.getSubMenu())
													.append("</li>");
								}
							}
							subMenu.append("<li class='top'><span id='pagePath'>").append(menuBean.getName()).append("</span></li>");
							req.setAttribute("pageTitle", menuBean.getName());
							req.setAttribute("subMenu", subMenu.toString());
						}
					}
					ActionForward actionForward = mapping.findForward(actionResult.page);
					String pageForward = actionForward.getPath();
					if (actionResult.redirect != null) {
						//TODO
						pageForward += "?"; // + QueryCrypt.encrypt(req, actionResult.redirect)
					}
					ActionForward af = new ActionForward(pageForward, true);
					return af;
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
//			LOGGER.error(path, ex);
			DBUtil.rollbackTransaction();
			return mapping.findForward("error");
		} finally {
			DBUtil.closeSession();
		}
	}
}
