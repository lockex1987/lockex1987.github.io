/*
 * NVH.
 */
package common.util;

import common.bean.UserBean;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Listener so nguoi online.
 *
 * @author lockex1987
 */
public class LoginSessionListener implements HttpSessionListener {

	public static List<UserBean> userOnlineList = new LinkedList<>();

	@Override
	public void sessionCreated(HttpSessionEvent hse) {
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent hse) {
		String id = hse.getSession().getId();
		if (userOnlineList != null && userOnlineList.size() > 0 && id != null) {
			Iterator<UserBean> itr = userOnlineList.iterator();
			while (itr.hasNext()) {
				UserBean u = itr.next();
				if (u.getSessionId().equals(id)) {
					itr.remove();
				}
			}
		}
	}
}
