package lang;

import java.lang.Double;
import java.math.BigDecimal;

public class DoubleDemo {

	public static void main(String[] args) {

		//System.out.println(Long.MAX_VALUE);
		//System.out.println(Double.MAX_VALUE);
		//System.out.println(Integer.MAX_VALUE);
		//System.out.println(Float.MAX_VALUE);
		/*
		System.out.println(Double.MAX_VALUE);
		System.out.println(Double.MIN_VALUE);
		System.out.println(Double.NaN);
		System.out.println(Double.NEGATIVE_INFINITY);
		System.out.println(Double.POSITIVE_INFINITY);
		System.out.println();
		 */
 /*
		Double a = new Double (1.2);
		Double b = new Double ("3.4");
		Double c = Double.valueOf ("5.6");
		System.out.System.out.println(a);
		System.out.System.out.println(b.toString ());   // System.out.System.out.printlnprint every things
		System.out.println(c.toString ());
		System.out.println();
		System.out.println(b.compareTo (a));
		System.out.println();
		System.out.println(a.isInfinite ());
		System.out.println(Double.isInfinite (123456789.9));
		System.out.println(a.isNaN ());
		System.out.println(Double.isNaN (123456789.9));
		System.out.println();
		System.out.println(Double.toString (12.34));
		
		 */
		//Long a = 20L;
		//Long b = null;
		//Double d = a / b;
		//Long r = (Long) (a / b);
		//Long r = Math.round((double)a / (double)b);
		//System.out.println(a + b);
		//System.out.println(Double.parseDouble("171"));
		/*
		System.out.println(Double.parseDouble(" 1 "));
		
		System.out.println(Long.parseLong("1"));
		System.out.println(Long.parseLong("1 "));
		System.out.println(Long.parseLong(" 1"));
		System.out.println(Long.parseLong(" 1 "));
		 */
 /*
		int n = 00002342;
		Long a = 00002342L;
		System.out.println(n);
		System.out.println(Long.parseLong("000002342"));
		System.out.println(Long.valueOf("000002342"));
		 */
 /*
		Long l = 0L;
		Double d = 1 / l.doubleValue();
		System.out.println(d);
		System.out.println(Double.isNaN(d));
		System.out.println(Double.isInfinite(d));
		 */
 /*
		System.out.println(Long.parseLong("01001"));
		String s = "1001.1+";
		System.out.println(Double.parseDouble(s.substring(0, s.length() - 1)));
		 */
 /*
		Long n = 0L;
		Object[] a = new Object[2];
		a[0] = "ABC";
		a[1] = 0L;
		System.out.println(n == 0L);
		System.out.println(a[1] == 0L);
		 */
 /*
		Double d = 100d;
		BigDecimal a = new BigDecimal(0);
		Double n = d + a.doubleValue();
		d = 99.0000001 + 0.9999999;
		System.out.println(d == 100d);
		System.out.println(d.equals(100d));
		System.out.println(d + 0 == 100d);
		System.out.println(n == 100d);
		 */
		Double d = 18.618 + 4.6545;
		BigDecimal bd1 = new BigDecimal(18.618);
		BigDecimal bd2 = new BigDecimal(4.6545);
		BigDecimal bd = bd1.add(bd2);

		System.out.println(d);
		System.out.println(d.equals(23.2725D));
		System.out.println(d == 23.2725D);
		System.out.println(d == 23.272499999999997);
		System.out.println(bd1);
		System.out.println(bd2);
		System.out.println(bd);
	}
}
