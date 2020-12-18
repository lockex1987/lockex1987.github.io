package common.util;

import java.util.Date;
import java.util.Hashtable;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.BodyPart;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.junit.Ignore;
import org.junit.Test;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MailSenderTests {

	String username = "lockex1987";
	// Không được để lộ password
	String password = "Khong duoc de lo password";
	String alias = "Nguyễn Văn Huyên";
	
	
	String host = "smtp.gmail.com";
	String receivingHost = "imap.gmail.com"; // for imap protocol
	int port = 465;

	// Recipient
	String recipient = "safenet.vn@gmail.com";
	String subject = "Introduction " + (new Date()).getTime();
	String content = "This is an <b>HTML</b> message.";

	/**
	 * Gửi mail văn bản bình thường.
	 */
	//@Ignore
	@Test
	public void testSendTextByGmail() throws Exception {
		MailSender mailSender = new MailSender(username, password, alias, host, port);
		mailSender.sendMail(recipient, subject, content, null);
		mailSender.closeTransport();
		log.info("Finish");

		// Test send by Yahoo?
	}

	/**
	 * Gửi mail có file đính kèm.
	 */
	@Ignore
	@Test
	public void testSendAttachmentByGmail() throws Exception {
		Hashtable<String, FileDataSource> files = new Hashtable<>();
		String fileName = "test.txt";
		String filePath = CommonUtils.getAbsolutePathByClassLoader(fileName);
		files.put(fileName, new FileDataSource(filePath));

		MailSender mailSender = new MailSender(username, password, alias, host, port);
		mailSender.sendMail(recipient, subject, content, files);
		mailSender.closeTransport();
		System.out.println("Finish");
	}

	@Ignore
	@Test
	public void testSendInlineImage() throws Exception {
		Properties props = new Properties();
		// Properties props = System.getProperties();
		props.put("mail.transport.protocol", "smtps");
		props.put("mail.smtps.auth", "true");
		props.put("mail.smtps.host", host);
		props.put("mail.smtps.port", port);
		Session session = Session.getDefaultInstance(props);
		Transport transport = session.getTransport("smtps");

		// This mail has 2 part, the BODY and the embedded image
		//MimeMultipart multipart = new MimeMultipart("related");
		MimeMultipart multipart = new MimeMultipart();

		// The first part (the html)
		BodyPart textPart = new MimeBodyPart();
		textPart.setContent("<H1>Hello</H1><img src='cid:image'>", "text/html; charset=UTF-8");
		multipart.addBodyPart(textPart);

		// The second part (the image)
		MimeBodyPart imagePart = new MimeBodyPart();
		String filePath = CommonUtils.getAbsolutePathByClassLoader("test.jpg");
		FileDataSource fds = new FileDataSource(filePath);
		imagePart.setDataHandler(new DataHandler(fds));
		imagePart.setHeader("Content-ID", "<image>");
		multipart.addBodyPart(imagePart);

		MimeMessage message = new MimeMessage(session);
		message.setFrom(new InternetAddress(username, alias, "UTF-8"));
		//message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
		message.setRecipient(Message.RecipientType.TO, new InternetAddress("lockex1987@gmail.com"));
		message.setSubject(subject, "utf-8");
		message.setSentDate(new Date());
		message.setContent(multipart);

		// Send message
		transport.connect(host, port, username, password);
		transport.sendMessage(message, message.getAllRecipients());

		System.out.println("Sent message successfully....");

	}

	@Ignore
	@Test
	public void testReadGmail() throws Exception {
		Properties props = new Properties(); // System.getProperties();
		props.setProperty("mail.store.protocol", "imaps");
		Session session = Session.getDefaultInstance(props);
		Store store = session.getStore("imaps");
		store.connect(receivingHost, username, password);
		Folder folder = store.getFolder("INBOX"); // get inbox
		folder.open(Folder.READ_ONLY); // open folder only to read
		Message[] messages = folder.getMessages();
		System.out.println("Number of messages: " + messages.length);
		for (Message msg : messages) {
			Address[] fromAddress = msg.getFrom();
			String from = fromAddress[0].toString();
			String subject = msg.getSubject();
			String toList = parseAddresses(msg.getRecipients(RecipientType.TO));
			String ccList = parseAddresses(msg.getRecipients(RecipientType.CC));
			String sentDate = msg.getSentDate().toString();
			String contentType = msg.getContentType();
			String messageContent = "";

			if (contentType.contains("text/plain") || contentType.contains("text/html")) {
				try {
					Object content = msg.getContent();
					if (content != null) {
						messageContent = content.toString();
					}
				} catch (Exception ex) {
					messageContent = "[Error downloading content]";
					ex.printStackTrace();
				}
			}

			// Print out details of each message
			System.out.println("Message:");
			System.out.println("\t From: " + from);
			System.out.println("\t Subject: " + subject);
			System.out.println("\t Sent Date: " + sentDate);
			System.out.println("\t ContentType: " + contentType);
			System.out.println("\t Message: " + messageContent);
		}

		// Close connections
		folder.close(true);
		store.close();
	}

	/**
	 * Returns a list of addresses in String format separated by comma
	 *
	 * @param address
	 *            an array of Address objects
	 * @return a string represents a list of addresses
	 */
	private String parseAddresses(Address[] address) {
		String listAddress = "";
		if (address != null) {
			for (int i = 0; i < address.length; i++) {
				listAddress += address[i].toString() + ", ";
			}
		}
		if (listAddress.length() > 1) {
			listAddress = listAddress.substring(0, listAddress.length() - 2);
		}
		return listAddress;
	}
}
