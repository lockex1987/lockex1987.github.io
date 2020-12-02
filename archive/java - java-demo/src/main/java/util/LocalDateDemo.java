package util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

public class LocalDateDemo {

	public static void main(String[] args) {
		drawCalendar();
	}

	private static void testObject() {
		LocalDate date = LocalDate.now();
		LocalDate.of(1987, 5, 11);
		System.out.println(date.getDayOfMonth() + "/" + date.getMonth().getValue() + "/" + date.getYear());
		LocalTime time = LocalTime.now();
		System.out.println(time.getHour() + "/" + time.getMinute());
	}

	private static void drawCalendar() {
		LocalDate d = LocalDate.now();
		int month = d.getMonthValue();
		int day = d.getDayOfMonth();

		d = d.minusDays(day - 1); // set to start of month
		DayOfWeek dayOfWeek = d.getDayOfWeek();
		int value = dayOfWeek.getValue(); // 1 = Monday,..., 7 = Sunday

		System.out.println("Mon Tue Wed Thu Fri Sat Sun");
		for (int i = 1; i < value; i++) {
			System.out.print("    ");
		}
		while (d.getMonthValue() == month) {
			System.out.printf("%3d", d.getDayOfMonth());
			if (d.getDayOfMonth() == day) {
				System.out.print("*");
			} else {
				System.out.print(" ");
			}
			d = d.plusDays(1);
			if (d.getDayOfWeek() == DayOfWeek.MONDAY) {
				System.out.println();
			}
		}
	}
}
