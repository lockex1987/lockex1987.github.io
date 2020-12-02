package common.util;

import java.time.DateTimeException;
import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.MonthDay;
import java.time.OffsetDateTime;
import java.time.Year;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.Locale;

/**
 * Very rich API.
 * Too much API.
 */
public class DatetimeJava8Demo {

	public static void main(String[] args) {
		// testDayOfWeek();
		// testMonth();
		// testLocalDate();
		testYearMonth();
	}

	private static void testDayOfWeek() {
		System.out.printf("%s%n", DayOfWeek.MONDAY.plus(3));

		DayOfWeek dow = DayOfWeek.MONDAY;
		Locale locale = Locale.getDefault();
		// Locale locale = Locale.CHINESE;
		System.out.println(dow.getDisplayName(TextStyle.FULL, locale));
		System.out.println(dow.getDisplayName(TextStyle.NARROW, locale));
		System.out.println(dow.getDisplayName(TextStyle.SHORT, locale));
	}

	private static void testMonth() {
		System.out.printf("%d%n", Month.FEBRUARY.maxLength());

		Month month = Month.AUGUST;
		Locale locale = Locale.getDefault();
		System.out.println(month.getDisplayName(TextStyle.FULL, locale));
		System.out.println(month.getDisplayName(TextStyle.NARROW, locale));
		System.out.println(month.getDisplayName(TextStyle.SHORT, locale));
	}

	private static void testLocalDate() {
		LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
		TemporalAdjuster adj = TemporalAdjusters.next(DayOfWeek.WEDNESDAY);

		LocalDate nextWed = date.with(adj);
		System.out.printf("For the date of %s, the next Wednesday is %s.%n",
				date, nextWed);

		DayOfWeek dotw = LocalDate.of(2012, Month.JULY, 9).getDayOfWeek();
	}

	private static void testYearMonth() {
		YearMonth date = YearMonth.now();
		System.out.printf("%s: %d%n", date, date.lengthOfMonth());

		YearMonth date2 = YearMonth.of(2010, Month.FEBRUARY);
		System.out.printf("%s: %d%n", date2, date2.lengthOfMonth());

		YearMonth date3 = YearMonth.of(2012, Month.FEBRUARY);
		System.out.printf("%s: %d%n", date3, date3.lengthOfMonth());
	}

	private static void testMonthDay() {
		MonthDay date = MonthDay.of(Month.FEBRUARY, 29);
		boolean validLeapYear = date.isValidYear(2010);
	}

	private static void testYear() {
		boolean validLeapYear = Year.of(2012).isLeap();
	}

	private static void testLocalTime() {
		LocalTime thisSec;

		for (;;) {
			thisSec = LocalTime.now();

			// implementation of display code is left to the reader
			System.out.println(thisSec.getHour() + ":" + thisSec.getMinute() + ":" + thisSec.getSecond());
		}
	}

	private static void testLocalDateTime() {
		System.out.printf("now: %s%n", LocalDateTime.now());

		System.out.printf("Apr 15, 1994 @ 11:30am: %s%n",
				LocalDateTime.of(1994, Month.APRIL, 15, 11, 30));

		System.out.printf("now (from Instant): %s%n",
				LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault()));

		System.out.printf("6 months from now: %s%n",
				LocalDateTime.now().plusMonths(6));

		System.out.printf("6 months ago: %s%n",
				LocalDateTime.now().minusMonths(6));
	}

	private static void testZonedDateTime() {
		DateTimeFormatter format = DateTimeFormatter.ofPattern("MMM d yyyy  hh:mm a");

		// Leaving from San Francisco on July 20, 2013, at 7:30 p.m.
		LocalDateTime leaving = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
		ZoneId leavingZone = ZoneId.of("America/Los_Angeles");
		ZonedDateTime departure = ZonedDateTime.of(leaving, leavingZone);

		try {
			String out1 = departure.format(format);
			System.out.printf("LEAVING:  %s (%s)%n", out1, leavingZone);
		} catch (DateTimeException exc) {
			System.out.printf("%s can't be formatted!%n", departure);
			throw exc;
		}

		// Flight is 10 hours and 50 minutes, or 650 minutes
		ZoneId arrivingZone = ZoneId.of("Asia/Tokyo");
		ZonedDateTime arrival = departure.withZoneSameInstant(arrivingZone)
				.plusMinutes(650);

		try {
			String out2 = arrival.format(format);
			System.out.printf("ARRIVING: %s (%s)%n", out2, arrivingZone);
		} catch (DateTimeException exc) {
			System.out.printf("%s can't be formatted!%n", arrival);
			throw exc;
		}

		if (arrivingZone.getRules().isDaylightSavings(arrival.toInstant())) {
			System.out.printf("  (%s daylight saving time will be in effect.)%n",
					arrivingZone);
		} else {
			System.out.printf("  (%s standard time will be in effect.)%n",
					arrivingZone);
		}
	}

	private static void testOffsetDateTime() {
		// Find the last Thursday in July 2013.
		LocalDateTime localDate = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
		ZoneOffset offset = ZoneOffset.of("-08:00");

		OffsetDateTime offsetDate = OffsetDateTime.of(localDate, offset);
		OffsetDateTime lastThursday = offsetDate.with(TemporalAdjusters.lastInMonth(DayOfWeek.THURSDAY));
		System.out.printf("The last Thursday in July 2013 is the %sth.%n",
				lastThursday.getDayOfMonth());
	}

	private static void testTemporalAdjusters() {
		LocalDate date = LocalDate.of(2000, Month.OCTOBER, 15);
		DayOfWeek dotw = date.getDayOfWeek();
		System.out.printf("%s is on a %s%n", date, dotw);

		System.out.printf("first day of Month: %s%n",
				date.with(TemporalAdjusters.firstDayOfMonth()));
		System.out.printf("first Monday of Month: %s%n",
				date.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY)));
		System.out.printf("last day of Month: %s%n",
				date.with(TemporalAdjusters.lastDayOfMonth()));
		System.out.printf("first day of next Month: %s%n",
				date.with(TemporalAdjusters.firstDayOfNextMonth()));
		System.out.printf("first day of next Year: %s%n",
				date.with(TemporalAdjusters.firstDayOfNextYear()));
		System.out.printf("first day of Year: %s%n",
				date.with(TemporalAdjusters.firstDayOfYear()));

	}
}
