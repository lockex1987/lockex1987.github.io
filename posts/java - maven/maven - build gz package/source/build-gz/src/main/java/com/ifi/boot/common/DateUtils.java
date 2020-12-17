package com.ifi.boot.common;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import org.apache.log4j.Logger;

public class DateUtils {

	private static final Logger LOGGER = Logger.getLogger(DateUtils.class);

	public static final String FULL_DATE_FORMAT = "dd-MM-yyyy HH:mm:ss";
	public static final String FULL_DATE_FORMAT_EN = "MM-dd-yyyy HH:mm:ss";
	public static final String FULL_DATE_FORMAT_MSS = "yyyyMMdd-HHmmss-SSS";
	public static final String FULL_DATE_FORMAT_MSS_2 = "yyyyMMdd_hhmmss_SSS";

	public static final String FULL_DATE_FORMAT_DDMMYYYY = "dd/MM/yyyy HH:mm:ss";
	public static final String ALERT_DATE_TIME_FR = "dd/MM/yyyy à HH:mm";

	public static final String FULL_DATE_FORMAT_DDMMYY = "dd/MM/yy HH:mm:ss";

	public static final String DDMMYYYY = "dd/MM/yyyy";
	public static final String DDMMYY = "dd/MM/yy";
	public static final String DDMMYYYY_2 = "ddMMyyyy";
	public static final String YYYYMMDD = "yyyy-MM-dd";
	public static final String HH_MM_DATE_FORMAT = "HH:mm";
	public static final String HH_MM_WITH_AM_PM_DATE_FORMAT = "hh:mm a";
	public static final String HH_MM_SS_DATE_FORMAT = "HH:mm:ss";

	public static final String PRODUCTION_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

	public static final String TICKET_PRODUCTION_FILENAME = "yyyyMMdd";
	public static final String HH_MM_SS_DATE_FORMAT_2 = "HH/mm/ss";

	public static final String DATETIMEFILE = "HH:mm:ss-dd/MM/yyyy";

	public static final String MMDDYYYY = "MM/dd/yyyy";
	public static final String MMDDYYYY_2 = "MMddyyyy";
	public static final String MMDDYYYY_3 = "MM/dd/yyyy-HH:mm:ss";

	public static final String YYYYMMDD_2 = "yyyyMMdd";

	public static final String DDMM = "dd-MMM";

	public static final String MMMYYYY = "MMM-yyyy";

	public static final String MMYYYY = "MM-yyyy";

	public static final String FULL_DATE_FORMAT_2 = "yyyy-MM-dd'T'HH:mm:ss.S";

	public static final String FULL_DATE_FORMAT_3 = "yyyy-MM-dd'T'HH:mm:ss";

	public static final String DATE_TIME_FORMAT = "yyyyMMdd-HHmmss";
	public static final String DATE_TIME_FORMAT_2 = "yyMMdd-HHmmss";
	public static final String DATE_TIME_FORMAT_3 = "yyyyMMdd-HHmm";
	public static final String MONTH_SLASH_YEAR_FORMAT = "MM/yyyy";
	public static String startWinterSuffix;
	public static String endWinterSuffix;
	public static String startSpringSuffix;
	public static String endSpringSuffix;
	public static String startSummerSuffix;
	public static String endSummerSuffix;
	public static String startAutumnSuffix;
	public static String endAutumnSuffix;

	public static String getStringFromDate(Date date, String format, String timeZone) {

		if (date != null && format != null && !("").equals(format)) {
			try {
				SimpleDateFormat sp = new SimpleDateFormat(format);
				sp.setTimeZone(TimeZone.getTimeZone(timeZone));
				String result = "";
				result = sp.format(date);
				return result;
			} catch (IllegalArgumentException ex) {
				LOGGER.error("Format invalid", ex);
			}

		}

		return null;
	}

	public static String getStringFromDateLocale(Date date, String format, Boolean isFrance) {
		if (date != null && format != null && !("").equals(format)) {
			try {
				if (isFrance) {
					SimpleDateFormat sp = new SimpleDateFormat(format, Locale.FRANCE);
					String result = "";
					result = sp.format(date);
					return result;
				} else {
					SimpleDateFormat sp = new SimpleDateFormat(format, Locale.ENGLISH);
					String result = "";
					result = sp.format(date);
					return result;
				}
			} catch (IllegalArgumentException ex) {
				LOGGER.error("Format invalid", ex);
			}

		}

		return null;
	}

	public static Date getDateFromString(String dateStr, String format) {

		if (dateStr != null && !("").equals(dateStr) && format != null && !("").equals(format)) {
			try {
				SimpleDateFormat sp = new SimpleDateFormat(format);
				Date result = new Date();
				result = sp.parse(dateStr);
				return result;
			} catch (ParseException ex) {
				LOGGER.error("Parse exception", ex);
			}

		}

		return null;
	}

	public static Date getDateFromFilename(String strDate) {

		if (strDate != null && strDate.length() >= 14) {

			strDate = strDate.substring(0, 4) + "-" + strDate.substring(4, 6) + "-" + strDate.substring(6, 9)
					+ strDate.substring(9, 11) + ":" + strDate.substring(11, 13) + ":"
					+ strDate.substring(13, strDate.length());

			SimpleDateFormat formatter = new SimpleDateFormat(PRODUCTION_DATE_FORMAT);
			try {
				Date date = formatter.parse(strDate);

				return date;
			} catch (Exception ex) {
				LOGGER.error("Exception", ex);
			}
		}

		return new Date();
	}

	@SuppressWarnings("deprecation")
	public static Date getProductionTimeByDate(Date productionDate) {
		if (productionDate == null) {
			return new Date();
		}

		// Create new instance of time
		Date ret = new Date(productionDate.getTime());

		int productionMinute = productionDate.getMinutes();

		productionMinute = productionMinute / 10 * 10;

		ret.setMinutes(productionMinute);
		ret.setSeconds(0);

		return new Date(ret.getTime());
	}

	@SuppressWarnings("deprecation")
	public static Date getNextPeriod(Date date) {
		if (date == null) {
			return new Date();
		}

		Date ret = new Date(date.getTime());

		int productionMinute = date.getMinutes();

		productionMinute = (productionMinute / 10 + 1) * 10;

		ret.setMinutes(productionMinute);
		ret.setSeconds(0);

		return new Date(ret.getTime());
	}

	public static Date getTimeBeforeTenMins(Date date) {

		if (date == null) {
			return null;
		}

		long time = date.getTime();
		long timeBeforeTenMins = time - 10 * 60 * 1000;

		return new Date(timeBeforeTenMins);
	}

	public static Date getTimeAfterTenMins(Date date) {

		if (date == null) {
			return null;
		}

		long time = date.getTime();
		long timeAfterTenMins = time + 10 * 60 * 1000;

		return new Date(timeAfterTenMins);
	}

	public static String getMonthNameWithLocale(Date date, Locale locale) {

		DateFormat formatter = new SimpleDateFormat("MMMM", locale);

		String ret = "";

		if (date != null) {

			ret = formatter.format(date);
		}

		return ret;
	}

	/**
	 * get current date by format yyyyMMdd
	 * 
	 * @return string of current date
	 */
	public static String getCurrentDate() {
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		// get current date time with Date()
		Date date = new Date();

		return dateFormat.format(date);
	}

	public static Date getStartOfDay(Date date) {

		if (date != null) {

			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.set(Calendar.HOUR_OF_DAY, 0);
			cal.set(Calendar.MINUTE, 0);
			cal.set(Calendar.SECOND, 0);
			cal.set(Calendar.MILLISECOND, 0);

			return cal.getTime();
		}

		return null;
	}

	public static Date getStartOfMonth(Date date) {

		if (date != null) {

			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.set(Calendar.DAY_OF_MONTH, 1);
			cal.set(Calendar.HOUR_OF_DAY, 0);
			cal.set(Calendar.MINUTE, 0);
			cal.set(Calendar.SECOND, 0);
			cal.set(Calendar.MILLISECOND, 0);

			return cal.getTime();
		}

		return null;
	}

	public static Date addOneDay(Date date) {

		if (date != null) {

			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.add(Calendar.DAY_OF_MONTH, 1);

			return cal.getTime();
		}

		return null;
	}

	public static Date subtracOneDay(Date date) {

		if (date != null) {

			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.add(Calendar.DAY_OF_MONTH, -1);

			return cal.getTime();
		}

		return null;
	}

	public static Date addOneMonth(Date date) {

		if (date != null) {

			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.add(Calendar.MONTH, 1);

			return cal.getTime();
		}

		return null;
	}

	public static Date subtracOneMonth(Date date) {

		if (date != null) {

			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.add(Calendar.MONTH, -1);

			return cal.getTime();
		}

		return null;
	}

	/**
	 * return date string format by dd/MM/yy
	 * 
	 * @param strDate
	 *            11.2.16
	 * @return 11/02/16
	 */
	public static String getDateTrame(String strDate) {
		String[] dateSplit = strDate.split("\\.");
		if (dateSplit.length == 3) {
			String month = dateSplit[1];
			if (month.length() == 1) {
				month = "0" + month;
			}

			String dateAfterProcess = dateSplit[0] + "/" + month + "/" + dateSplit[2];
			return dateAfterProcess;
		} else {
			return null;
		}
	}

	public static Date getDate(String dateStr, String dateFormat, String timeZone) throws ParseException {
		Date date = null;

		SimpleDateFormat df = new SimpleDateFormat(dateFormat);
		df.setTimeZone(TimeZone.getTimeZone(timeZone));
		date = df.parse(dateStr);
		return date;
	}

	public static List<Integer> getYearRequestList(Date sDate, Date eDate) {
		List<Integer> result = null;

		Calendar sCal = Calendar.getInstance();
		Calendar eCal = Calendar.getInstance();

		if (sDate.getTime() <= eDate.getTime()) {
			sCal.setTime(sDate);
			eCal.setTime(eDate);
		}

		result = new ArrayList<Integer>();
		for (int year = sCal.get(Calendar.YEAR); year <= eCal.get(Calendar.YEAR); year++) {
			result.add(year);
		}

		return result;
	}

	public static int getYear(Date date, String timeZone) throws ParseException {
		Calendar ca = Calendar.getInstance();
		ca.setTimeZone(TimeZone.getTimeZone(timeZone));
		ca.setTime(date);
		return ca.get(Calendar.YEAR);
	}

	public static boolean isWeekend(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeZone(TimeZone.getTimeZone(Constants.GMT_TIME_ZONE_STR));
		cal.setTime(date);
		if (cal.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY || cal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
			return true;
		}
		return false;
	}

	/**
	 * Method compare 2 java.util.Date objects ignore hour
	 * 
	 * @param firstDate
	 * @param secondDate
	 * @return
	 */
	public static int compareDateIgnoreHour(Date firstDate, Date secondDate) {
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(firstDate);
		Calendar cal2 = Calendar.getInstance();
		cal2.setTime(secondDate);
		int year1 = cal1.get(Calendar.YEAR);
		int year2 = cal2.get(Calendar.YEAR);
		if (year1 < year2) {
			return -1;
		} else if (year1 == year2) {
			if (cal1.get(Calendar.DAY_OF_YEAR) < cal2.get(Calendar.DAY_OF_YEAR)) {
				return -1;
			} else if (cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR)) {
				return 0;
			} else {
				return 1;
			}
		} else {
			return 1;
		}
	}

	public static int getSeasonFromDate(Date date) {
		try {
			Calendar cal = Calendar.getInstance(TimeZone.getTimeZone(Constants.GMT_TIME_ZONE_STR));
			cal.setTime(date);
			int year = cal.get(Calendar.YEAR);
			// get spring date
			Date springStart = getDate(year + startSpringSuffix, YYYYMMDD_2, Constants.GMT_TIME_ZONE_STR);
			Date springEnd = getDate(year + endSpringSuffix, YYYYMMDD_2, Constants.GMT_TIME_ZONE_STR);
			// get summer date
			Date summerStart = getDate(year + startSummerSuffix, YYYYMMDD_2, Constants.GMT_TIME_ZONE_STR);
			Date summerEnd = getDate(year + endSummerSuffix, YYYYMMDD_2, Constants.GMT_TIME_ZONE_STR);
			// get autumn date
			Date autumnStart = getDate(year + startAutumnSuffix, YYYYMMDD_2, Constants.GMT_TIME_ZONE_STR);
			Date autumnEnd = getDate(year + endAutumnSuffix, YYYYMMDD_2, Constants.GMT_TIME_ZONE_STR);

			if (compareDateIgnoreHour(date, springStart) >= 0 && compareDateIgnoreHour(date, springEnd) <= 0) {
				return Constants.SEASON_SPRING;
			} else if (compareDateIgnoreHour(date, summerStart) >= 0 && compareDateIgnoreHour(date, summerEnd) <= 0) {
				return Constants.SEASON_SUMMER;
			} else if (compareDateIgnoreHour(date, autumnStart) >= 0 && compareDateIgnoreHour(date, autumnEnd) <= 0) {
				return Constants.SEASON_AUTUMN;
			} else {
				return Constants.SEASON_WINTER;
			}
		} catch (ParseException e) {
			LOGGER.error(e.getMessage());
		}
		return 0;
	}

	public static List<String> getMonthFromDateRange(Date startDate, Date endDate) {
		List<String> listMonthYear = new ArrayList<>();
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone(Constants.GMT_TIME_ZONE_STR));
		SimpleDateFormat format = new SimpleDateFormat(MONTH_SLASH_YEAR_FORMAT);
		format.setTimeZone(TimeZone.getTimeZone(Constants.GMT_TIME_ZONE_STR));
		cal.setTime(startDate);
		int startMonth = cal.get(Calendar.MONTH);
		int startYear = cal.get(Calendar.YEAR);
		cal.setTime(endDate);
		int endYear = cal.get(Calendar.YEAR);
		int endMonth = cal.get(Calendar.MONTH);
		if (endYear > startYear) {
			int diffYear = endYear - startYear;
			int diffMonth = 12 * diffYear + endMonth - startMonth;
			cal.setTime(startDate);
			listMonthYear.add(format.format(cal.getTime()));
			for (int i = 0; i < diffMonth; i++) {
				cal.add(Calendar.MONTH, 1);
				listMonthYear.add(format.format(cal.getTime()));
			}
			return listMonthYear;
		} else if (endYear == startYear) {
			int diffMonth = endMonth - startMonth;
			cal.setTime(startDate);
			if (diffMonth == 0) {
				listMonthYear.add(format.format(cal.getTime()));
			} else {
				listMonthYear.add(format.format(cal.getTime()));
				for (int i = 0; i < diffMonth; i++) {
					cal.add(Calendar.MONTH, 1);
					listMonthYear.add(format.format(cal.getTime()));
				}
			}
		}
		return listMonthYear;
	}

	public static List<String> getSeasonFromDateRange(Date startDate, Date endDate) {
		List<String> listSeason = new ArrayList<>();
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone(Constants.GMT_TIME_ZONE_STR));
		for (; compareDateIgnoreHour(startDate, endDate) <= 0;) {
			int season = getSeasonFromDate(startDate);
			cal.setTime(startDate);
			String seasonYear = season + "-" + cal.get(Calendar.YEAR);
			cal.add(Calendar.MONTH, 3);
			startDate = cal.getTime();
			listSeason.add(seasonYear);
		}
		return listSeason;
	}

	public static String getMonthYear(Date date, String timeZone, String monthYearFormat) throws ParseException {
		SimpleDateFormat f = new SimpleDateFormat(monthYearFormat);
		f.setTimeZone(TimeZone.getTimeZone(timeZone));
		return f.format(date);
	}
}
