package common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateTimeUtil {

	// Convert between String object and Date object.
	public static Date convertStringToDate(String date, String pattern) {
		if (date == null || date.trim().isEmpty()) {
			return null;
		} else {
			SimpleDateFormat sdf = new SimpleDateFormat(pattern);
			sdf.setLenient(false);
			try {
				return sdf.parse(date);
			} catch (ParseException ex) {
				return null;
			}
		}
	}

	public static Date convertStringToDate(String date) {
		return convertStringToDate(date, "dd/MM/yyyy");
	}

	public static Date convertStringToDateWithTime(String datetime) {
		return convertStringToDate(datetime, "dd/MM/yyyy HH:mm:ss");
	}

	public static String convertDateToString(Date date, String pattern) {
		if (date == null) {
			return "";
		} else {
			SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
			return dateFormat.format(date);
		}
	}

	public static String convertDateToString(Date date) {
		return convertDateToString(date, "dd/MM/yyyy");
	}

	/**
	 * So ngay trong thang.
	 *
	 * @param month
	 *            Thang, thang chuan
	 * @param year
	 *            Nam, nam chuan
	 * @return So ngay trong thang
	 */
	public static int getDaysOfMonth(int month, int year) {
		final int[] MONTH_DAYS = new int[] { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		int num = MONTH_DAYS[month];
		if (month == 2) {
			if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {
				num++;
			}
		}
		return num;
	}

	public static Date getFirstDayOfMonth(int month, int year) {
		if (month > 9) {
			return convertStringToDate("01/" + month + "/" + year);
		} else {
			return convertStringToDate("01/0" + month + "/" + year);
		}
	}

	public static Date getLastDayOfMonth(int month, int year) {
		if (month > 9) {
			return convertStringToDate(getDaysOfMonth(month, year) + "/" + month + "/" + year);
		} else {
			return convertStringToDate(getDaysOfMonth(month, year) + "/0" + month + "/" + year);
		}
	}

	/**
	 * Cong valueToAdd ngay vao ngay inputDate.
	 *
	 * @param date
	 * @param numberOfDays
	 * @return
	 */
	public static Date addDate(Date date, int numberOfDays) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.DATE, numberOfDays);
		return c.getTime();
	}
}
