package common.util;

import java.text.DecimalFormat;

public class Formater {

	// Format number.
	public static String formatNumber(Long d) {
		if (d == null) {
			return "";
		} else {
			DecimalFormat format = new DecimalFormat("######");
			return format.format(d);
		}
	}

	public static String formatNumber(Double d) {
		if (d == null) {
			return "";
		} else {
			DecimalFormat format = new DecimalFormat("######.#########");
			return format.format(d);
		}
	}
}
