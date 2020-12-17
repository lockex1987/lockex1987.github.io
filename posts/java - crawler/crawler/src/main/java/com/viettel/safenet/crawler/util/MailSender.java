package com.viettel.safenet.crawler.util;

import java.util.Date;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import com.sun.mail.smtp.SMTPAddressFailedException;
import javax.mail.NoSuchProviderException;
import lombok.extern.slf4j.Slf4j;

/**
 * Gửi mail.
 */
@Slf4j
public class MailSender {

	/**
	 * Java objects to operate.
	 */
	protected MimeMessage message;
	protected Transport transport;
	protected Session session;

	/**
	 * Configurations
	 */
	protected String username;
    protected String password;
	protected String alias;
	protected String host;
	protected int port;	

	public MailSender(String username, String password, String alias, String host, int port) {
		this.username = username;
		this.password = password;
		this.alias = alias;
		this.host = host;
		this.port = port;
	}

	private void initSessionAndTransport() {
        try {
            Properties props = new Properties();
            props.put("mail.transport.protocol", "smtps");
            props.put("mail.smtps.auth", "true");
            props.put("mail.smtps.host", host);
            props.put("mail.smtps.port", port);
            session = Session.getDefaultInstance(props);
            transport = session.getTransport("smtps");
        } catch (NoSuchProviderException ex) {
            log.error("Error when init sender", ex);
        }
	}

	/**
	 * Basic function.
	 * 
	 * @param recipient
	 * @param subject
	 * @param content
	 * @return 0 neu thanh cong, -1 neu that bai noi chung, 1 neu do dia chi dich
	 *         khong ton tai
	 */
	public int sendMail(String recipient, String subject, String content) {
		try {
			Multipart multipart = createMultipart(content);
			sendMail(recipient, subject, multipart);
			return 0;
		} catch (Exception ex) {
			Throwable cause = ex.getCause();
			if (cause instanceof SMTPAddressFailedException) {
				// Email khong ton tai, bo qua
				return 1;
			} else {
				log.error("Loi khi gui mail", ex);
				return -1;
			}
		}
	}

	private Multipart createMultipart(String content) throws Exception {
		Multipart multipart = new MimeMultipart();

		// Text part
		MimeBodyPart textPart = new MimeBodyPart();
		textPart.setContent(content, "text/html; charset=UTF-8");
		multipart.addBodyPart(textPart);

		return multipart;
	}

	public void sendMail(String recipient, String subject, Multipart multipart) throws Exception {
		message = new MimeMessage(session);
		message.setFrom(new InternetAddress(username, alias, "UTF-8"));
		message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
		message.setSubject(subject, "utf-8");
		message.setSentDate(new Date());
		message.setContent(multipart);

		if (transport == null) {
			initSessionAndTransport();
		}
		if (!transport.isConnected()) {
			transport.connect(host, port, username, password);
		}
		try {
			transport.sendMessage(message, message.getAllRecipients());
		} catch (Exception ex) {
			transport = null;
			throw ex;
		}
	}

	/**
	 * Dong ket noi, giai phong tai nguyen.
	 */
	public void closeTransport() {
		try {
			if (transport != null) {
				transport.close();
			}
		} catch (Exception ex) {
			// Do nothing
		}
	}
}