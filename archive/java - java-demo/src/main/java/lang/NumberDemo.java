package lang;

public class NumberDemo {

	public static void main(String[] args) {
		Number n = new Integer(13);
		System.out.println(n.byteValue());
		System.out.println(n.doubleValue());
		System.out.println(n.floatValue());
		System.out.println(n.intValue());
		System.out.println(n.longValue());
		System.out.println(n.shortValue());
	}
}
