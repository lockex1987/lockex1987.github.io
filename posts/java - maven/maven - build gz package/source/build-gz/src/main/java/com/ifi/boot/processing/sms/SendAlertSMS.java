package com.ifi.boot.processing.sms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

public class SendAlertSMS {
	public static String URL_API_SMS;
	public static String API_KEY;
	private static final String RESPONSE_CODE_OK = "OK";
	private static final String RESPONSE_CODE_ERROR_01 = "ERROR 01";
	private static final String RESPONSE_CODE_ERROR_02 = "ERROR 02";
	private static final String RESPONSE_CODE_ERROR_03 = "ERROR 03";
	private static final String RESPONSE_CODE_ERROR_04 = "ERROR 04";
	private static final String RESPONSE_CODE_ERROR_05 = "ERROR 05";
	private static final String RESPONSE_CODE_ERROR = "ERROR";
	private static final Logger LOGGER = LoggerFactory.getLogger(SendAlertSMS.class);
	
	public void sendSMS(String phoneNum, String msg){
		RestTemplate restTemplate = new RestTemplate();
		UriComponentsBuilder componentsBuilder = UriComponentsBuilder.fromHttpUrl(URL_API_SMS)
				.queryParam("apikey", API_KEY)
				.queryParam("dest", phoneNum)
				.queryParam("msg", msg)
				.queryParam("charset", "utf-8")
				.queryParam("coding", "unicode")
				.queryParam("mode", "Standard")
				.queryParam("strategy", "2");
		ResponseEntity<String> entity = restTemplate.getForEntity(componentsBuilder.build().encode().toUri(), String.class);
		if (entity.getStatusCode().equals(HttpStatus.OK)) {
			String responseText = entity.getBody();
			switch (responseText) {
			case RESPONSE_CODE_OK:
				LOGGER.info("The message has been accepted by smsbox platform");
				break;
			case RESPONSE_CODE_ERROR_01:
				LOGGER.error("Settings are missing. Check the arguments of your query.");
				LOGGER.error(componentsBuilder.toString());
				break;
			case RESPONSE_CODE_ERROR_02:
				LOGGER.error("Incorrect password, account banned or restricted by IP address.");
				LOGGER.error("Phone Number: "+phoneNum);
				LOGGER.error("Message: "+msg);
				break;
			case RESPONSE_CODE_ERROR_03:
				LOGGER.error("Credit exhausted or inadequate.");
				break;
			case RESPONSE_CODE_ERROR_04:
				LOGGER.error("Invalid destination number or badly formatted.");
				LOGGER.error("Phone Number: "+phoneNum);
				LOGGER.error("Message: "+msg);
				break;
			case RESPONSE_CODE_ERROR_05:
				LOGGER.error("internal execution error in smsbox application.");
				break;
			default:
				LOGGER.error("Sending failed for another reason (this number in black list, unavailable operator, unmanaged code, ...).");
				break;
			}
		}
	}
}
