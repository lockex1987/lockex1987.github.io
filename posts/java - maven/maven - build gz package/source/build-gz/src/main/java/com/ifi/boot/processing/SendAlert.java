package com.ifi.boot.processing;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.ifi.boot.common.DateUtils;
import com.ifi.boot.csm.model.AlertDetailCSM;
import com.ifi.boot.csm.model.Email;
import com.ifi.boot.csm.model.SMS;
import com.ifi.boot.csm.model.UserAlertConfig;
import com.ifi.boot.jms.model.JMSAlertModel;
import com.ifi.boot.processing.mail.SendAlertEmail;
import com.ifi.boot.processing.sms.SendAlertSMS;

public class SendAlert {
	public static String URL_API_CSM_GET_USER_INFO;
	public static ResourceLoader resourceLoader;
	private static final String NEW_LINE = System.getProperty("line.separator");
	private static final Logger LOGGER = LoggerFactory.getLogger(SendAlert.class);
	private static final int TYPE_TIME = 1;
	private static final int TYPE_DAY = 2;
	private static final int TYPE_WEEK = 3;
	private static final int TYPE_MONTH = 4;
	private static final int TYPE_YEAR = 5;

	public void sendAlert(JMSAlertModel[] arrModel) {
		SendAlertEmail alertEmail = new SendAlertEmail();
		SendAlertSMS alertSMS = new SendAlertSMS();
		for (JMSAlertModel jmsAlertModel : arrModel) {
			AlertDetailCSM alertDetailCSM = getUserInfo(jmsAlertModel.getAlert_id());
			UserAlertConfig[] arrAlertUserConf = alertDetailCSM.getListUser();
			String message = composeMessage(alertDetailCSM, jmsAlertModel.getHistory_value());
			String subject = alertDetailCSM.getSiteName() + " - Alerte de dépassement pour "
					+ alertDetailCSM.getAlertName();
			for (UserAlertConfig userAlertConfig : arrAlertUserConf) {
				SMS sms = userAlertConfig.getSms();
				Email email = userAlertConfig.getEmail();
				alertEmail.sendMail(email.getEmail(), message, subject);
				// alertSMS.sendSMS("84916245581", message);
				alertSMS.sendSMS(sms.getPhone(), message);
			}
		}
	}

	private AlertDetailCSM getUserInfo(int alertId) {
		RestTemplate restTemplate = new RestTemplate();
		AlertDetailCSM alertDetailCSM = restTemplate.getForObject(URL_API_CSM_GET_USER_INFO + "/" + alertId,
				AlertDetailCSM.class);
		return alertDetailCSM;
	}
	
	private String composeMessage(AlertDetailCSM alertDetailCSM, String historyValue) {
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(historyValue, JsonObject.class);
		String date = jsonObject.get("date").getAsString();
		String hour = jsonObject.get("hour").getAsString();
		SimpleDateFormat dateFormat = new SimpleDateFormat(DateUtils.DATE_TIME_FORMAT);
		Date dateTime = null;
		int typeDate = -1;
		try {
			if (hour != null && !hour.isEmpty() && !"null".equalsIgnoreCase(hour)) {
				dateTime = dateFormat.parse(date + "-" + hour);
				typeDate = TYPE_TIME;
			} else {
				if (date.length() == 4) {
					typeDate = TYPE_YEAR;
				} else if (date.length() == 6) {
					dateFormat.applyPattern("yyyyMM");
					dateTime = dateFormat.parse(date);
					typeDate = TYPE_MONTH;
				} else if (date.length() > 6) {
					if (!date.contains(" ")) {
						dateFormat.applyPattern(DateUtils.YYYYMMDD_2);
						dateTime = dateFormat.parse(date);
						typeDate = TYPE_DAY;
					} else {
						typeDate = TYPE_WEEK;
					}
				}

			}
		} catch (ParseException e) {
			LOGGER.error("Parse date error: " + e.getMessage());
		}
		String dateTimeStr = "";
		switch (typeDate) {
		case TYPE_TIME:
			dateFormat.applyPattern(DateUtils.ALERT_DATE_TIME_FR);
			dateTimeStr = dateFormat.format(dateTime);
			break;
		case TYPE_MONTH:
			dateFormat.applyPattern(DateUtils.MONTH_SLASH_YEAR_FORMAT);
			dateTimeStr = dateFormat.format(dateTime);
			break;
		case TYPE_DAY:
			dateFormat.applyPattern(DateUtils.DDMMYYYY);
			dateTimeStr = dateFormat.format(dateTime);
			break;
		case TYPE_YEAR:
		case TYPE_WEEK:
			dateTimeStr = date;
			break;
		default:
			break;
		}
		// int alert_id = jsonObject.get("alertId").getAsInt();
		String valueCalculate = jsonObject.get("valueCalculate").getAsString();
		// String depass = jsonObject.get("depass").getAsString();
		String template = getMessageTemplate();
		String minValue = (alertDetailCSM.getMinValue() != null) ? alertDetailCSM.getMinValue() : "null";
		template = template.replace("SITE_NAME", alertDetailCSM.getSiteName()).replace("DATE", dateTimeStr)
				.replace("MODULE_NAME", alertDetailCSM.getModuleName()).replace("VALUE_RECORED", valueCalculate)
				.replace("MAX_VALUE", alertDetailCSM.getMaxValue()).replace("MIN_VALUE", minValue);

		return template;
	}

	private String getMessageTemplate() {
		Resource resource = resourceLoader.getResource("classpath:sms_email.txt");
		StringBuilder result = new StringBuilder("");

		// Get file from resources folder
		File file = null;
		try {
			file = resource.getFile();
		} catch (IOException e1) {
			LOGGER.error("Error while reading sms_email.txt file");
		}

		try (Scanner scanner = new Scanner(file)) {

			while (scanner.hasNextLine()) {
				String line = scanner.nextLine();
				result.append(line).append(NEW_LINE);
			}

			scanner.close();

		} catch (IOException e) {
			LOGGER.error("Error while reading sms_email.txt file");
		}
		return result.toString();
	}
}
