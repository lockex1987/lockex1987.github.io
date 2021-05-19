package common.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;
import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.activation.MailcapCommandMap;
import javax.activation.MimetypesFileTypeMap;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import com.sun.mail.smtp.SMTPAddressFailedException;

public class CalendarMail extends MailSender {

	/**
	 * Calendar format
	 */
	private SimpleDateFormat iCalendarDateFormat;
	private int alarmMinute;

	public CalendarMail(String username, String password, String alias, String host, int port)
			throws Exception {
		super(username, password, alias, host, port);
	}

	public void initCalendar() {
		MimetypesFileTypeMap mimetypes = (MimetypesFileTypeMap) MimetypesFileTypeMap.getDefaultFileTypeMap();
		mimetypes.addMimeTypes("text/calendar ics ICS");
		MailcapCommandMap mailcap = (MailcapCommandMap) MailcapCommandMap.getDefaultCommandMap();
		mailcap.addMailcap("text/calendar;; x-java-content-handler=com.sun.mail.handlers.text_plain");
		iCalendarDateFormat = new SimpleDateFormat("yyyyMMdd'T'HHmm'00'");
		alarmMinute = 60;
	}

	public int sendCalendar(String email, Timestamp startTime, Timestamp endTime, String roomName,
			String subject, String description, Hashtable<String, FileDataSource> files, String uid,
			String sequence, String method) {
		try {
			// Multipart multipart = new MimeMultipart("alternative");
			Multipart multipart = new MimeMultipart();

			// iCalendar
			multipart.addBodyPart(
					this.buildCalendarPart(startTime, endTime, roomName, subject, description, uid, sequence, method, email));

			// Dinh kem file
			if (files != null) {
				Set<Map.Entry<String, FileDataSource>> entrySet = files.entrySet();
				for (Map.Entry<String, FileDataSource> entry : entrySet) {
					MimeBodyPart attachmentPart = new MimeBodyPart();
					attachmentPart.setDataHandler(new DataHandler(entry.getValue()));
					attachmentPart.setFileName(entry.getKey());
					multipart.addBodyPart(attachmentPart);
				}
			}

			message = new MimeMessage(session);
			message.setFrom(new InternetAddress(username, alias, "UTF-8"));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
			message.setSubject(subject, "utf-8");
			message.setSentDate(new Date());
			message.setContent(multipart);
			if (!transport.isConnected()) {
				transport.connect(host, port, username, password);
			}
			transport.sendMessage(message, message.getAllRecipients());
			return 0;
		} catch (Exception ex) {
			Throwable cause = ex.getCause();
			if (cause instanceof SMTPAddressFailedException) {
				System.out.println("Email khong ton tai, bo qua: " + email);
				return 1;
			} else {
				ex.printStackTrace();
				return -1;
			}
		}
	}

	private BodyPart buildCalendarPart(Timestamp startTime, Timestamp endTime, String roomName,
			String subject, String description, String uid, String sequence, String method, String email) {
		try {
			if (method == null || method.length() <= 0) {
				method = "REQUEST";
			}
			MimeBodyPart calendarPart = new MimeBodyPart();
			Calendar cl = Calendar.getInstance();
			Date currentTime = cl.getTime();
			StringBuilder sb = new StringBuilder();
			sb.append("BEGIN:VCALENDAR\n");
			sb.append("METHOD:").append(method).append("\n");
			sb.append("PRODID: Viettel Corporation - Meeting\n");
			sb.append("VERSION:2.0\n");
			sb.append("BEGIN:VTIMEZONE\n");
			sb.append("TZID:ICT\n");
			sb.append("BEGIN:STANDARD\n");
			sb.append("DTSTART:16010101T000000\n");
			sb.append("TZOFFSETFROM:+0700\n");
			sb.append("TZOFFSETTO:+0700\n");
			sb.append("END:STANDARD\n");
			sb.append("END:VTIMEZONE\n");
			sb.append("BEGIN:VEVENT\n");
			sb.append("DTSTAMP;TZID=ICT:").append(iCalendarDateFormat.format(currentTime)).append("\n");
			sb.append("DTSTART;TZID=ICT:").append(iCalendarDateFormat.format(startTime)).append("\n");
			sb.append("DTEND;TZID=ICT:").append(iCalendarDateFormat.format(endTime)).append("\n");
			sb.append("UID:").append(uid).append("\n");
			sb.append("ATTENDEE;CN=\"VOffice attendee\";RSVP=TRUE:mailto:").append(email).append("\n");
			sb.append("ORGANIZER;CN=\"VOffice organizer\":mailto:").append("vofficeadmin@viettel.com.vn").append("\n");
			sb.append("LOCATION:").append(roomName).append("\n");
			sb.append("DESCRIPTION:").append(description).append("\n");
			sb.append("SEQUENCE:").append(sequence).append("\n");
			sb.append("PRIORITY:5\n");
			sb.append("CLASS:PUBLIC\n");

			if (method.equals("REQUEST")) {
				if (subject != null && !subject.isEmpty()) {
					sb.append("SUMMARY:").append(subject).append("\n");
				}

				// sb.append("TRANSP:OPAQUE\n");
				sb.append("STATUS:CONFIRMED\n");

				sb.append("X-MICROSOFT-CDO-BUSYSTATUS:BUSY\n");
				sb.append("X-MICROSOFT-CDO-IMPORTANCE:1\n");
				sb.append("X-MICROSOFT-DISALLOW-COUNTER:FALSE\n");
				sb.append("X-MS-OLK-ALLOWEXTERNCHECK:TRUE\n");
				sb.append("X-MS-OLK-AUTOFILLLOCATION:FALSE\n");
				sb.append("X-MS-OLK-CONFTYPE:0\n");

				sb.append("BEGIN:VALARM\n");
				sb.append("ACTION:DISPLAY\n");
				sb.append("DESCRIPTION:REMINDER\n");
				sb.append("TRIGGER;RELATED=START:-PT00H").append(alarmMinute).append("M00S\n");
				sb.append("END:VALARM\n");
			} else {
				if (subject != null && !subject.isEmpty()) {
					sb.append("SUMMARY:").append("[Cancelled] ").append(subject).append("\n");
				}

				// sb.append("TRANSP:TRANSPARENT\n");
				sb.append("STATUS:CANCELLED\n");

				sb.append("X-MICROSOFT-CDO-BUSYSTATUS:FREE\n");
				sb.append("X-MICROSOFT-CDO-IMPORTANCE:1\n");
				sb.append("X-MICROSOFT-DISALLOW-COUNTER:FALSE\n");
				sb.append("X-MS-OLK-ALLOWEXTERNCHECK:TRUE\n");
				sb.append("X-MS-OLK-APPTSEQTIME:20120801T063835Z\n");
				sb.append("X-MS-OLK-AUTOFILLLOCATION:FALSE\n");
				sb.append("X-MS-OLK-AUTOSTARTCHECK:FALSE\n");
				sb.append("X-MS-OLK-CONFTYPE:0\n");
			}

			sb.append("END:VEVENT\n");
			sb.append("END:VCALENDAR");
			calendarPart.addHeader("Content-Class", "urn:content-classes:calendarmessage");
			calendarPart.setContent(sb.toString(), "text/calendar;method=REQUEST;charset=UTF-8");
			return calendarPart;
		} catch (MessagingException ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public static void main(String[] args) throws Exception {
		// Test gui mail binh thuong
		// MailSender mailSender = new MailSender("HuyenNV1@viettel.com.vn", "12345678aA@", "Quan tri", "203.113.131.19",
		// 465);
		// mailSender.connectTransport();
		// mailSender.sendMail("HuyenNV1@viettel.com.vn", "Test", "ABC 123", null);
		// mailSender.closeTransport();

		// Test gui Calendar
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MINUTE, 4);
		Timestamp startTime = new Timestamp(calendar.getTime().getTime());
		calendar.add(Calendar.HOUR_OF_DAY, 2);
		Timestamp endTime = new Timestamp(calendar.getTime().getTime());
		String email = "DoanhNC@viettel.com.vn";
		String subject = "Test Reminder 2";
		String roomName = "Test nao";
		String temp = "Máy chiếu, checklist\nCó xuống dòng".replace("\n", "\\n");
		String description = "1. Chủ trì: PGĐ Nguyễn Văn Thọ\\n"
				+ "2. Chuẩn bị: PBTT: MSS\\n"
				+ "3. Thành phần: PBTT:MSS\\n"
				+ "4. Nội dung chuẩn bị:\\n" + temp;
		String uid = "fadfadfdsf";
		String sequence = "1";
		String method = "REQUEST";
		// String sequence = "2";
		// String method = "CANCEL";
		CalendarMail mailSender = new CalendarMail("HuyenNV1@viettel.com.vn", "12345678aA@", "Quan tri",
				"203.113.131.19", 465);
		mailSender.initCalendar();
		mailSender.sendCalendar(email, startTime, endTime, roomName, subject, description, null, uid,
				sequence, method);
		mailSender.closeTransport();
	}
}
