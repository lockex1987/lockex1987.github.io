package common.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeUtil {

	public static Date convertStringToDate(String text) {
		try {
			DateFormat dateFormat = new SimpleDateFormat(ConvertTimeBetweenZones.DATE_FORMAT);
			return dateFormat.parse(text);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static String convertDateToString(Date date) {
		DateFormat dateFormat = new SimpleDateFormat(ConvertTimeBetweenZones.DATE_FORMAT);
		return dateFormat.format(date);
	}
}
