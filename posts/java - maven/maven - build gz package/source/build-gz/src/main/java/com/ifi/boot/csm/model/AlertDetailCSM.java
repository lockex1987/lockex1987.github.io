package com.ifi.boot.csm.model;

public class AlertDetailCSM {
	private String alertName;
	private String siteName;
	private String moduleName;
	private String maxValue;
	private String minValue;
	private UserAlertConfig[] listUser;
	public String getAlertName() {
		return alertName;
	}
	public void setAlertName(String alertName) {
		this.alertName = alertName;
	}
	public String getSiteName() {
		return siteName;
	}
	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getMaxValue() {
		return maxValue;
	}
	public void setMaxValue(String maxValue) {
		this.maxValue = maxValue;
	}
	public String getMinValue() {
		return minValue;
	}
	public void setMinValue(String minValue) {
		this.minValue = minValue;
	}
	public UserAlertConfig[] getListUser() {
		return listUser;
	}
	public void setListUser(UserAlertConfig[] listUser) {
		this.listUser = listUser;
	}
}
