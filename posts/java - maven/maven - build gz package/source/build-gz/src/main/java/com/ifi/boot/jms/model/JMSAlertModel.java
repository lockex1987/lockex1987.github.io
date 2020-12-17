package com.ifi.boot.jms.model;

import java.util.UUID;

public class JMSAlertModel {
	private int alert_id;
	private UUID history_id;
	private String history_date;
	private String history_hour;
	private String history_value;
	public int getAlert_id() {
		return alert_id;
	}
	public String getHistory_value() {
		return history_value;
	}
	public void setHistory_value(String history_value) {
		this.history_value = history_value;
	}
	public void setAlert_id(int alert_id) {
		this.alert_id = alert_id;
	}
	public UUID getHistory_id() {
		return history_id;
	}
	public void setHistory_id(UUID history_id) {
		this.history_id = history_id;
	}
	public String getHistory_date() {
		return history_date;
	}
	public void setHistory_date(String history_date) {
		this.history_date = history_date;
	}
	public String getHistory_hour() {
		return history_hour;
	}
	public void setHistory_hour(String history_hour) {
		this.history_hour = history_hour;
	}
}
