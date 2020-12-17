package com.ifi.boot.processing.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class SendAlertEmail {
	public static JavaMailSender javaMailSender;
	public static String emailSender;
	private static final Logger LOGGER = LoggerFactory.getLogger(SendAlertEmail.class);
	public void sendMail(String toEmail, String message, String subject){
		SimpleMailMessage mail = new SimpleMailMessage();
        try {
            mail.setTo(toEmail);
            mail.setFrom(emailSender);
            mail.setSubject(subject);
            mail.setText(message);
            javaMailSender.send(mail);
        } catch (Exception e) {
        	LOGGER.error("Error while sending email: "+e.getMessage());
		}
        
	}
}
