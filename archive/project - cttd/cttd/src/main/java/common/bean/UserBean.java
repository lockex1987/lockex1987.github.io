/*
 * NVH.
 */
package common.bean;

import java.util.Date;
import javax.servlet.http.HttpSession;

/**
 * Luu thong tin nguoi dung.
 *
 * @author lockex1987
 */
public class UserBean {

	private Long sysUserId; // Id nguoi dung
	private String loginName; // Ten dang nhap
	private String fullName; // Ten day du
	private Date loginTime; // Thoi gian dang nhap
	private String ipAddress; // Dia chi IP
	private String sessionId; // Session ID
	private HttpSession httpSession; // Doi tuong session
	private String userAgent; // User agent

	public UserBean() {
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Date getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public HttpSession getHttpSession() {
		return httpSession;
	}

	public void setHttpSession(HttpSession httpSession) {
		this.httpSession = httpSession;
	}

	public Long getSysUserId() {
		return sysUserId;
	}

	public void setSysUserId(Long sysUserId) {
		this.sysUserId = sysUserId;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}
}
