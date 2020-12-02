package lang;

import java.util.StringTokenizer;

public class StringTokenizerDemo {
	public static void main(String args[]) {
		StringTokenizer s = new StringTokenizer("  This  	 is  	StringTokenizer 	 ");
		System.out.println(s.countTokens());
		while (s.hasMoreTokens()) {
			System.out.println("<" + s.nextToken() + ">");
		}
		System.out.println(s.countTokens());

		StringTokenizer r = new StringTokenizer ("abc, 123, def, 467", ",");
		while (r.hasMoreTokens()) {
			System.out.println("<" + r.nextToken () + ">");
		}
	}
}