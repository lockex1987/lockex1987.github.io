package com.ifi.boot.csm.model;

public class UserAlertConfig {
	private int userId;
	private SMS sms;
	private Email email;
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public SMS getSms() {
		return sms;
	}
	public void setSms(SMS sms) {
		this.sms = sms;
	}
	public Email getEmail() {
		return email;
	}
	public void setEmail(Email email) {
		this.email = email;
	}
}
