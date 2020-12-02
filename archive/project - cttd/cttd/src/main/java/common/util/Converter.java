package common.util;

public class Converter {

	/**
	 * Convert mot so sang dang so La Ma.
	 *
	 * @param decimal
	 *          So binh thuong
	 * @return So La Ma
	 */
	public static String convertDecimalToRoman(int decimal) {
		final String[] ROMAN_CODE = { "M", "CM", "D", "CD", "C", "XC", "L",
				"XL", "X", "IX", "V", "IV", "I" };
		final int[] DECIMAL_VALUE = { 1000, 900, 500, 400, 100, 90, 50,
				40, 10, 9, 5, 4, 1 };
		if (decimal <= 0 || decimal >= 4000) {
			throw new NumberFormatException("Value outside roman numeral range.");
		}
		StringBuilder roman = new StringBuilder();
		for (int i = 0; i < ROMAN_CODE.length; i++) {
			while (decimal >= DECIMAL_VALUE[i]) {
				decimal -= DECIMAL_VALUE[i];
				roman.append(ROMAN_CODE[i]);
			}
		}
		return roman.toString();
	}

	// Convert configuration in form of an array (seperate by comma)
	public static Long[] convertStringToLongArray(String text) {
		String[] a = text.split(",");
		Long[] b = new Long[a.length];
		for (int i = 0; i < b.length; i++) {
			b[i] = Long.parseLong(a[i].trim());
		}
		return b;
	}

	public static String[] convertTextToStringArray(String text) {
		if (text == null) {
			return null;
		} else {
			String[] a = text.trim().split(",");
			for (int i = 0; i < a.length; i++) {
				a[i] = a[i].trim();
			}
			return a;
		}
	}

	// Parse number
	public static Long parseLong(String s) {
		if (s != null && !s.isEmpty()) {
			try {
				return Long.parseLong(s);
			} catch (Exception ex) {
				return null;
			}
		} else {
			return null;
		}
	}

	public static Double parseDouble(String s) {
		if (s != null && !s.isEmpty()) {
			try {
				return Double.parseDouble(s);
			} catch (Exception ex) {
				return null;
			}
		} else {
			return null;
		}
	}

	// TODO
	public static String convertColumnIndexToLabelcccc(int column) {
		final int ALPHABET_NUMBER = 26; // so chu cai
		if (column < ALPHABET_NUMBER) {
			return String.valueOf((char) ('A' + column));
		} else {
			int temp = column / ALPHABET_NUMBER;
			column -= ALPHABET_NUMBER * temp;
			return String.valueOf((char) ('A' + temp - 1)) + String.valueOf((char) ('A' + column));
		}
	}
}
