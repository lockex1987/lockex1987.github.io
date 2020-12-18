/*
 * NVH.
 */
package common.util;

import javax.servlet.http.HttpServletRequest;

import common.bean.PermissionBean;
import lombok.extern.slf4j.Slf4j;

/**
 * Check permission.
 * Move to each controller.
 *
 * @author lockex1987
 */
@Slf4j
public abstract class PermissionUtil {

	public PermissionUtil() {
	}

	public abstract boolean havePermission(PermissionBean bean, HttpServletRequest req);

	public static PermissionUtil newInstance(String className) {
		try {
			PermissionUtil obj = (PermissionUtil) Class.forName(className).newInstance();
			return obj;
		} catch (Exception ex) {
			log.error("Loi khi khoi tao", ex);
			return null;
		}
	}
}
