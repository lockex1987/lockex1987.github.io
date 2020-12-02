package email;

import java.net.URL;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.ImageHtmlEmail;
import org.apache.commons.mail.MultiPartEmail;
import org.apache.commons.mail.SimpleEmail;
import org.apache.commons.mail.resolver.DataSourceUrlResolver;

import common.util.CommonUtils;
import common.util.MailSender;

public class CommonsEmailDemo {

	private static final String USERNAME = "lockex1987";
	private static final String PASSWORD = "xxx";
	private static final String SENDER = "lockex1987@gmail.com";
	private static final String RECIPIENT = "huyennv1@yahoo.com";
	private static final String HOST = "smtp.gmail.com";
	private static final int PORT = 465;

	public static void main(String[] args) throws Exception {
		System.out.println("Start");
//		testPureJava();
//		testTextEmail();
//		testAttachment();
//		testHtml();
//		testInlineImage();
//		testEmbeddedImage();
		testMyEmail();
		System.out.println("Finish");
	}
	
	private static void testPureJava() throws Exception {
		Properties props = new Properties();
		props.put("mail.smtp.host", HOST);
		props.put("mail.smtp.socketFactory.port", PORT);
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", PORT);

		Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(USERNAME, PASSWORD);
			}
		});

		Message message = new MimeMessage(session);
		message.setFrom(new InternetAddress(SENDER));
		message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(RECIPIENT));
		message.setSubject("Testing Subject");
		message.setText("Dear Mail Crawler," + "\n\n No spam to my email, please!");
		Transport.send(message);
	}

	private static void init(Email email) throws Exception {
		email.setHostName(HOST);
		email.setSmtpPort(PORT);
		email.setAuthenticator(new DefaultAuthenticator(USERNAME, PASSWORD));
		email.setFrom(SENDER);
		email.addTo(RECIPIENT);
		email.setSSLOnConnect(true);
	}

	private static void testTextEmail() throws Exception {
		Email email = new SimpleEmail();
		init(email);
		email.setSubject("TestMail");
		email.setMsg("This is a test mail ... :-)");
		email.send();
	}

	private static void testAttachment() throws Exception {
		// Create the attachment
		EmailAttachment attachment = new EmailAttachment();

		//	  attachment.setPath("/home/locke/cttd.jpg");
		//	  attachment.setDisposition(EmailAttachment.ATTACHMENT);
		//	  attachment.setDescription("Picture of John");
		//	  attachment.setName("John");

		attachment.setURL(new URL("http://www.apache.org/images/asf_logo_wide.gif"));
		attachment.setDisposition(EmailAttachment.ATTACHMENT);
		attachment.setDescription("Apache logo");
		attachment.setName("Apache logo");

		// Create the email message
		MultiPartEmail email = new MultiPartEmail();
		init(email);
		email.setSubject("The picture");
		email.setMsg("Here is the picture you wanted");

		// add the attachment
		email.attach(attachment);

		// send the email
		email.send();
	}
	
	private static void testHtml() throws Exception {
		HtmlEmail email = new HtmlEmail();
		init(email);
		email.setSubject("Test HTML email");
		email.setHtmlMsg("<html><body>The apache logo - <img src='http://www.apache.org/images/asf_logo_wide.gif'/><body></html>");
		email.send();
	}

	private static void testInlineImage() throws Exception {
		// Create the email message
		HtmlEmail email = new HtmlEmail();
		init(email);
		email.setSubject("Test email with inline image");
		// embed the image and get the content id
		URL url = new URL("http://www.apache.org/images/asf_logo_wide.gif");
		String cid = email.embed(url, "Apache logo");
		// set the html message
		email.setHtmlMsg("<html><body>The apache logo - <img src='cid:" + cid + "'/><body></html>");
		// set the alternative message
		email.setTextMsg("Your email client does not support HTML messages");
		// send the email
		email.send();
	}

	private static void testEmbeddedImage() throws Exception {
		// load your HTML email template
		String htmlEmailTemplate = ".... <img src='http://www.apache.org/images/feather.gif'/> ....";
		// define you base URL to resolve relative resource locations
		URL url = new URL("http://www.apache.org");
		// create the email message
		ImageHtmlEmail email = new ImageHtmlEmail();
		init(email);
		email.setDataSourceResolver(new DataSourceUrlResolver(url));
		email.setSubject("Test email with inline image");
		// set the html message
		email.setHtmlMsg(htmlEmailTemplate);
		// set the alternative message
		email.setTextMsg("Your email client does not support HTML messages");
		// send the email
		email.send();
	}
	
	private static void testMyEmail() throws Exception {
		// Init
		String subject = "Test my email";
		String content = "<strong>Java</strong> is cool";
		String htmlText = "<h1>Hello</h1> <img src='cid:imageCid'>";
		MailSender mailSender = new MailSender(USERNAME, PASSWORD, SENDER, HOST, PORT);
		
		// Method 1:
//		mailSender.sendMail(SENDER, subject, content, null);
		
		// Method 3:
		Multipart multipart = new MimeMultipart();
		
		// text part
		MimeBodyPart textPart = new MimeBodyPart();
		textPart.setContent(htmlText, "text/html; charset=UTF-8");
		multipart.addBodyPart(textPart);
		
		// image part
		MimeBodyPart imagePart = new MimeBodyPart();
    DataSource fds = new FileDataSource("/home/locke/cttd.jpg");
    imagePart.setDataHandler(new DataHandler(fds));
    imagePart.setHeader("Content-ID", "<imageCid>");
    multipart.addBodyPart(imagePart);
    
    mailSender.sendMail(SENDER, subject, multipart);

		// Send
		mailSender.closeTransport();
	}
}
