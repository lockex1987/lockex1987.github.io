package text;

import java.text.DateFormatSymbols;
import java.util.Locale;

public class DateFormatSymbolsDemo {

	public static void main(String[] args) {
		DateFormatSymbols dateFormatSymbols = new DateFormatSymbols(Locale.FRENCH);
		String[] weekdays = dateFormatSymbols.getWeekdays();
		String[] months = dateFormatSymbols.getMonths();
		print(weekdays, "Weekdays:");
		print(months, "Months:");
	}

	private static void print(String[] a, String text) {
		System.out.println(text);
		for (String s : a) {
			System.out.println("\"" + s + "\",");
		}
		System.out.println("------------------");
	}
}
