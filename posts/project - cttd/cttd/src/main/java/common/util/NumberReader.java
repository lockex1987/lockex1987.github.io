package common.util;

public class NumberReader {

	public static String readNumberVietnamese(long n) {
		if (n == 0) {
			return "không";
		} else if (n < 0) {
			return "âm " + readPositiveNumber(-n);
		} else {
			return readPositiveNumber(n);
		}
	}

	private static String readPositiveNumber(long n) {
		StringBuilder s = new StringBuilder();

		long unit = n % 1000;
		n /= 1000;
		long thousand = n % 1000;
		n /= 1000;
		long million = n % 1000;
		n /= 1000;
		long billion = n % 1000;
		long trillion = n / 1000;

		boolean zeroHundred = false;
		if (trillion > 0) {
			s.append(readTriple((int) trillion, zeroHundred)).append(" nghìn tỷ, ");
			zeroHundred = true;
		}
		if (billion > 0) {
			s.append(readTriple((int) billion, zeroHundred)).append(" tỷ, ");
			zeroHundred = true;
		}
		if (million > 0) {
			s.append(readTriple((int) million, zeroHundred)).append(" triệu, ");
			zeroHundred = true;
		}
		if (thousand > 0) {
			s.append(readTriple((int) thousand, zeroHundred)).append(" nghìn, ");
			zeroHundred = true;
		}
		if (unit > 0) {
			s.append(readTriple((int) unit, zeroHundred));
		}

		String text = s.toString().trim();
		if (text.endsWith(",")) {
			text = text.substring(0, text.length() - 1);
		}
		return text;
	}

	private static String readTriple(int n, boolean zeroHundred) {
		StringBuilder s = new StringBuilder();
		String[] DIGITS = new String[] { "", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín" };
		int unit = n % 10;
		n /= 10;
		int ten = n % 10;
		int hundred = n / 10;
		if (hundred > 0) {
			s.append(DIGITS[hundred]).append(" trăm ");
		} else if (zeroHundred) {
			s.append("không trăm ");
		}
		if (ten > 0) {
			if (ten == 1) {
				s.append("muời ");
			} else {
				s.append(DIGITS[ten]).append(" mươi ");
			}
		} else if (unit > 0 && (zeroHundred || hundred > 0)) {
			s.append("linh ");
		}
		if (unit > 0) {
			if (unit == 1) {
				if (ten > 1) {
					s.append("mốt");
				} else {
					s.append("một");
				}
			} else if (unit == 5 && (ten != 0 || hundred != 0)) {
				s.append("lăm");
			} else if (unit == 5 && (ten == 0 || hundred != 0)) {
				s.append("năm");
			} else {
				s.append(DIGITS[unit]);
			}
		}
		return s.toString().trim();
	}
}
