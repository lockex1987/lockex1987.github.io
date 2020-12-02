package util;

import java.util.Date;

public class DateDemo {

	public static void main(String args[]) {
		// Date d = new Date(87, 4, 11);
		// long n =
		Date d = new Date(1253867275826L);
		System.out.println("Day: " + d.getDay());
		System.out.println("Month: " + d.getMonth());
		System.out.println("Date: " + d.getDate());
		System.out.println("Year: " + d.getYear());

		System.out.println(d.getHours());
		System.out.println(d.getMinutes());
		System.out.println(d.getSeconds());

		System.out.println("GMT: " + d.toGMTString());
		System.out.println("Locale: " + d.toLocaleString());
	}
}