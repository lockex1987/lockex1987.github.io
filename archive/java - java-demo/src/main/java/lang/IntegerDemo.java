package lang;

public class IntegerDemo {

	public static void main(String[] args) {
		System.out.println(Integer.MAX_VALUE);
		System.out.println(Integer.MIN_VALUE);
		System.out.println();
		Integer a, b, c, d;
		a = new Integer(1);
		b = new Integer("2");
		c = Integer.decode("3");
		d = Integer.valueOf("4");
		System.out.println(a.toString());
		System.out.println(b.toString());
		System.out.println(c.toString());
		System.out.println(d.toString());
		System.out.println();
		System.out.println(a.compareTo(b));
		System.out.println();
		System.out.println(Integer.toBinaryString(2));
		System.out.println(Integer.toHexString(12));
		System.out.println(Integer.toOctalString(9));
		System.out.println(Integer.toString(123));
		System.out.println();
		System.out.println(Integer.parseInt("5"));
	}
}
