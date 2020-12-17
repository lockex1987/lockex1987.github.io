package lang;

public class PrimitiveTypes {

	enum Size {
		SMALL, MEDIUM, LARGE, EXTRA_LARGE
	};

	public static strictfp void main(String\u005B\u005D args) {
		byte a = 10;
		short b = 4_000; // underscore
		int c = 1;
		long d = 12;

		float e = 1_000_000_000_000.1F; // floats must have a suffix f or F
		double f = 2.3;

		int một_số_rất_to = 0b1111_0100_0010_0100_0000; // binary
		int h = 0xCAFE;
		int i = 010;

		System.out.println(2.0D - 1.1D);

		System.out.println('\u2122'); // trademark symbol
		System.out.println('\u03C0'); // Greek letter pi

		//System.out.println(1 / 0); // Exception
		System.out.println(1.0 / 0); // No exception

		System.out.println(-3 / 2);
		System.out.println(-3 % 2);

		int n = 0;
		int m = (n != 0) ? (1 / n) : 0;
		System.out.println(n != 0 && 1 / n > 0);
		//System.out.println(n != 0 & 1 / n > 0); // Exception

		System.out.println(Size.LARGE);

		String greeting = "Hello";
		System.out.println(greeting == "Hello");
		System.out.println(greeting.substring(0, 3) == "Hel");

		double x = 10000.0 / 3.0;
		System.out.println(x);
		System.out.printf("%8.2f\n", x);
	}
}
