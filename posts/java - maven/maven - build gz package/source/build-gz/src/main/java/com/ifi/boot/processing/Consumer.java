package com.ifi.boot.processing;

import java.util.Calendar;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifi.boot.common.Constants;
import com.ifi.boot.common.Utils;
import com.ifi.boot.jms.model.JMSAlertModel;
import com.ifi.boot.main.SendingAlertApplication;
import com.ifi.boot.processing.mail.SendAlertEmail;


public class Consumer implements Runnable {

	ConcurrentLinkedQueue<String> queue = SendingAlertApplication.queue;
	private static Logger logger = LoggerFactory.getLogger(Consumer.class);
	// Name of the thread
	String threadName;
	public void run() {
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone(Constants.GMT_TIME_ZONE_STR));
		while (true) {
			String msg = queue.poll();
			if (msg != null) {
				System.setProperty("http.proxyHost", "10.225.3.1");
		          System.setProperty("http.proxyPort", "3128");
				String content = msg;
				logger.info("Start procssing: \n" + content);
				ObjectMapper mapper = new ObjectMapper();
				try {
					JMSAlertModel[] listAlert = mapper.readValue(content, JMSAlertModel[].class);
					SendAlert alert = new SendAlert();
					alert.sendAlert(listAlert);
				} catch (Exception ex) {
					logger.error("Exception on processing message: " + msg + " detail: " + ex.getMessage());
				}
			} else {
				// for not burning the CPU with time sleep in idle status
				Utils.sleep(500); // 0.5 seconds
			}
		}

	}
	
	public Consumer(String threadName) {
		this.threadName = threadName;
	}
}
