package lang;

public class NumberLiteral {

	public static void main(String[] args) {
		int decimal = 100; // 100 em decimal.
		int octal = 0144; // decimal 100 represented in octal base.
		int hex = 0x64; // decimal 100 represented in hexadecimal base.
		int bin = 0b1100100; // decimal 100 represented in binary base

		System.out.println(decimal); // Prints '100'
		System.out.println(octal); // Prints '100'
		System.out.println(hex); // Prints '100'
		System.out.println(bin); // Prints '100'

		long l1 = 351698791198l;
		long l2 = 351698791198L;

		float f1 = 3.14f;
		float f2 = 3.14F;

		byte b = (byte) 12;

		double d1 = 3E2;
		double d2 = 1.07E-4;
		double d3 = 3.14;
		double d4 = 3.14d;

		System.out.println(d1);
		System.out.println(d2);
	}
}
