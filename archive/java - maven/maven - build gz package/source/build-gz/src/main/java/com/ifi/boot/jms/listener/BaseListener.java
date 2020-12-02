package com.ifi.boot.jms.listener;

import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ifi.boot.main.SendingAlertApplication;


public class BaseListener implements MessageListener {
	private static Logger logger = LoggerFactory.getLogger(BaseListener.class);
	public void onMessage(Message message) {
		try {
			logger.info("Received message: ");
			String msg = ((TextMessage) message).getText();
			SendingAlertApplication.queue.add(msg);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

}
