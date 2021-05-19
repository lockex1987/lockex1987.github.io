package lang;

public class ByteDemo {

	public static void main(String[] argv) {
		oldDemo();
		// getStrtingRadix();
		// longToBinaryString(122);
		// longToBinaryString(Long.MAX_VALUE); // 63 digit 1
	}

	private static void oldDemo() {
		String s1 = "This is an example";
		byte[] bytes = s1.getBytes();
		String s2 = new String(bytes);

		System.out.println("Text : " + s1);
		System.out.println("Text [Byte Format] : " + bytes);
		System.out.println("Text [Byte Format] : " + bytes.toString());
		System.out.println("Text Decryted : " + s2);
	}

	private static void testByteToBinaryString() {
		System.out.println(byteToBinaryString((byte) 129)); // 10000001
		System.out.println(byteToBinaryString((byte) 2)); // 00000010
		System.out.println(byteToBinaryString((byte) 0)); // 00000000
		System.out.println(byteToBinaryString((byte) 255)); // 11111111
	}

	private static void longToBinaryString(long n) {
		String s = Long.toBinaryString(n);
		System.out.println(s);
		Long t = Long.parseUnsignedLong(s, 2);
		System.out.println(t);
	}

	private static void getStrtingRadix() {
		/* returns the string representation of the unsigned integer in concern radix */
		System.out.println("Binary eqivalent of 100 = " + Integer.toString(100, 2));
		System.out.println("Octal eqivalent of 100 = " + Integer.toString(100, 8));
		System.out.println("Decimal eqivalent of 100 = " + Integer.toString(100, 10));
		System.out.println("Hexadecimal eqivalent of 100 = " + Integer.toString(100, 16));
	}

	public static String byteToBinaryString(byte n) {
		return String.format("%8s", Integer.toBinaryString(n & 0xFF)).replace(' ', '0');
	}
}
