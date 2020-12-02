package util;

import java.lang.Double;
import java.text.DecimalFormat;

public class DecimalFormatDemo {
	public static void main(String[] args) {
		/*
		String electricPrice = "9.999999999E9";
		Double number = Double.parseDouble(electricPrice);
		DecimalFormat decimalFormat = new DecimalFormat("############.###");
		System.out.println(number);
		System.out.println(decimalFormat.format(number));
		*/
		double n = 123456789.123456;
		System.out.println(formatNumber(n));
	}
	
	public static String formatNumber(Double d) {
        if (d == null) {
            return "";
        } else {
            DecimalFormat format = new DecimalFormat("######.#####");
            return format.format(d);
        }
    }
}