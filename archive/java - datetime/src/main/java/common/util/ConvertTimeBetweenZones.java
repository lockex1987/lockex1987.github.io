package common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

public class ConvertTimeBetweenZones {

	public static final String DATE_FORMAT = "dd-MM-yyyy HH:mm:ss";
	private static final String SINGAPORE_TIME_STRING = "22-01-2015 21:00:00";

	// Asia/Calcutta
	// Asia/Tehran
	// Asia/Ho_Chi_Minh
	// Europe/Paris
	// UTC
	// DateTimeZone.UTC
	private static final String SINGAPORE_ZONE = "Asia/Singapore";
	private static final String NEW_YORK_ZONE = "America/New_York";

	// Zone objects
	private static final ZoneId singaporeZoneId = ZoneId.of(SINGAPORE_ZONE);
	private static final ZoneId newYokZoneId = ZoneId.of(NEW_YORK_ZONE);

	private static final TimeZone singaporeTimeZone = TimeZone.getTimeZone(SINGAPORE_ZONE);
	private static final TimeZone newYorkTimeZone = TimeZone.getTimeZone(NEW_YORK_ZONE);

	// Formatter objects
	private static final SimpleDateFormat singaporeFormatter = new SimpleDateFormat(DATE_FORMAT);
	private static final SimpleDateFormat newYorkFormatter = new SimpleDateFormat(DATE_FORMAT);
	private static final SimpleDateFormat commonFormatter = new SimpleDateFormat(DATE_FORMAT);
	private static final DateTimeFormatter java8Formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);

	static {
		// Attention!
		singaporeFormatter.setTimeZone(singaporeTimeZone);
		newYorkFormatter.setTimeZone(newYorkTimeZone);
	}

	public static void main(String[] args) {
		System.out.println("------------- Date Time Java 8 -------------");
		convertUsingDateTimeJava8();
		System.out.println("------------- Joda Time -------------");
		convertUsingJodaTime();
		System.out.println("------------- Joda Time 2 -------------");
		convertUsingJodaTime2();
		System.out.println("------------- Date -------------");
		convertUsingDate();
		System.out.println("------------- Calendar -------------");
		convertUsingCalendar();

		// testConvertFrenchZone();
	}

	private static void convertUsingDateTimeJava8() {
		LocalDateTime ldt = LocalDateTime.parse(SINGAPORE_TIME_STRING, java8Formatter);

		// LocalDateTime + ZoneId = ZonedDateTime
		ZonedDateTime singaporeDateTime = ldt.atZone(singaporeZoneId);
		ZonedDateTime newYorkDateTime = singaporeDateTime.withZoneSameInstant(newYokZoneId);

		System.out.println("Date (Singapore): " + java8Formatter.format(singaporeDateTime));
		System.out.println("Date (New York) : " + java8Formatter.format(newYorkDateTime));
	}

	private static void convertUsingJodaTime() {
		try {
			org.joda.time.DateTimeZone newYorkDtz = org.joda.time.DateTimeZone.forID(NEW_YORK_ZONE);

			Date singaporeDate = singaporeFormatter.parse(SINGAPORE_TIME_STRING);

			org.joda.time.DateTime singaporeDateTime = new org.joda.time.DateTime(singaporeDate);

			org.joda.time.DateTime newYorkDateTime = singaporeDateTime.withZone(newYorkDtz);
			Date newYorkDate = newYorkDateTime.toLocalDateTime().toDate();

			System.out.println("Date (Singapore): " + singaporeFormatter.format(singaporeDate));
			System.out.println("Date (New York) : " + commonFormatter.format(newYorkDate));
			
			System.out.println("Date (Singapore) (error): " + commonFormatter.format(singaporeDate));
			System.out.println("Date (New York)  (error): " + newYorkFormatter.format(newYorkDate));

		} catch (ParseException ex) {
			ex.printStackTrace();
		}
	}

	private static void convertUsingJodaTime2() {
		Date vietnameseDate = DateTimeUtil.convertStringToDate(SINGAPORE_TIME_STRING);

		org.joda.time.DateTimeZone singaporeDtz = org.joda.time.DateTimeZone.forID(SINGAPORE_ZONE);
		org.joda.time.DateTimeZone newYorkDtz = org.joda.time.DateTimeZone.forID(NEW_YORK_ZONE);

		// Get current moment in default time zone
		org.joda.time.DateTime vietnameseDateTime = new org.joda.time.DateTime(vietnameseDate);

		// Find the moment when Paris will have/had the same time
		org.joda.time.DateTime singaporeDateTime = vietnameseDateTime.withZoneRetainFields(singaporeDtz);

		// Translate to UTC local time
		org.joda.time.DateTime newYorkDateTime = singaporeDateTime.withZone(newYorkDtz);

		// 'toLocalDateTime' is to date time of UTC
		Date newYorkDate = newYorkDateTime.toLocalDateTime().toDate();

		System.out.println("Date (Singapore): " + SINGAPORE_TIME_STRING);
		System.out.println("Date (New York) : " + DateTimeUtil.convertDateToString(newYorkDate));
	}

	private static void convertUsingDate() {
		try {
			Date date = singaporeFormatter.parse(SINGAPORE_TIME_STRING);

			System.out.println("Date (Singapore): " + singaporeFormatter.format(date));
			System.out.println("Date (New York) : " + newYorkFormatter.format(date));
			System.out.println("Date (Singapore) (error): " + commonFormatter.format(date));
			System.out.println("Date (New York)  (error): " + commonFormatter.format(date));
		} catch (ParseException ex) {
			ex.printStackTrace();
		}
	}

	private static void convertUsingCalendar() {
		try {
			Date date = singaporeFormatter.parse(SINGAPORE_TIME_STRING);

			Calendar newYorkCalendar = new GregorianCalendar();
			newYorkCalendar.setTime(date);
			newYorkCalendar.setTimeZone(newYorkTimeZone);

			System.out.println("Date (Singapore): " + singaporeFormatter.format(date));

			int year = newYorkCalendar.get(Calendar.YEAR);
			int month = newYorkCalendar.get(Calendar.MONTH);
			int dayOfMonth = newYorkCalendar.get(Calendar.DAY_OF_MONTH);
			int hour = newYorkCalendar.get(Calendar.HOUR_OF_DAY); // 12 hour clock
			int minute = newYorkCalendar.get(Calendar.MINUTE);
			int second = newYorkCalendar.get(Calendar.SECOND);

			System.out.printf("Date (New York) : %02d-%02d-%04d %02d:%02d:%02d\n",
					dayOfMonth, month + 1, year,
					hour, minute, second);
		} catch (ParseException ex) {
			ex.printStackTrace();
		}
	}
}
