package util;

import java.util.TimeZone;

public class TimeZoneDemo {

	public static void main(String[] args) {
		String[] a = TimeZone.getAvailableIDs();
		System.out.println("Here are all list of timezones for your reference:");
		for (String s : a) {
			System.out.println(s);
		}
	}
}
