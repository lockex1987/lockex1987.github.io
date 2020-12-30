package common.util;

import java.util.Date;
import java.util.Hashtable;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.sun.mail.smtp.SMTPAddressFailedException;

import lombok.extern.slf4j.Slf4j;

/**
 * Send mail utility. Change Google account access for less secure apps Some
 * apps and devices use less secure sign-in technology, which makes your account
 * more vulnerable. You can turn off access for these apps, which we recommend,
 * or turn on access if you want to use them despite the risks.
 * 
 * https://support.google.com/accounts/answer/6010255?hl=vi
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
	protected String alias;
	protected String host;
	protected int port;
	protected String password;

	/**
	 * Information retrieved from application.properties file.
	 */
	public MailSender() throws Exception {
		ResourceBundle rb = getConfig();
		init(rb.getString("emailUser"),
				rb.getString("emailPassword"),
				rb.getString("emailSender"),
				rb.getString("emailHost"),
				Integer.parseInt(rb.getString("emailPort")));
	}

	/**
	 * Constructor with user name, password, alias from user.
	 */
	public MailSender(String username, String password, String alias) throws Exception {
		ResourceBundle rb = getConfig();
		init(username,
				password,
				alias,
				rb.getString("emailHost"),
				Integer.parseInt(rb.getString("emailPort")));
	}

	/**
	 * Full constructor
	 */
	public MailSender(String username, String password, String alias, String host, int port) throws Exception {
		init(username,
				password,
				alias,
				host,
				port);
	}

	/**
	 * Set all parameter.
	 */
	private void init(String username, String password, String alias, String host, int port) throws Exception {
		this.username = username;
		this.password = password;
		this.alias = alias;
		this.host = host;
		this.port = port;
	}

	private void initSessionAndTransport() throws Exception {
		Properties props = new Properties();
		// Properties props = System.getProperties();
		props.put("mail.transport.protocol", "smtps");
		props.put("mail.smtps.auth", "true");
		props.put("mail.smtps.host", host);
		props.put("mail.smtps.port", port);
		session = Session.getDefaultInstance(props);
		transport = session.getTransport("smtps");
	}

	/**
	 * Basic function.
	 * 
	 * @param recipient
	 * @param subject
	 * @param content
	 * @param files
	 * @return 0 neu thanh cong, -1 neu that bai noi chung, 1 neu do dia chi dich
	 *         khong ton tai
	 */
	public int sendMail(String recipient, String subject, String content, Hashtable<String, FileDataSource> files) {
		try {
			Multipart multipart = createMultipart(content, files);
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

	private Multipart createMultipart(String content, Hashtable<String, FileDataSource> files) throws Exception {
		Multipart multipart = new MimeMultipart();

		// Text part
		MimeBodyPart textPart = new MimeBodyPart();
		textPart.setContent(content, "text/html; charset=UTF-8");
		multipart.addBodyPart(textPart);

		// File attachment parts
		if (files != null) {
			for (String name : files.keySet()) {
				MimeBodyPart filePart = new MimeBodyPart();
				filePart.setDataHandler(new DataHandler((DataSource) files.get(name)));
				filePart.setFileName(name);
				multipart.addBodyPart(filePart);
			}
		}
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

	private ResourceBundle getConfig() {
		return ResourceBundle.getBundle("application");
	}
}
