public class ObjectParseParameter {
	public ObjectParseParameter() {
		String s = null;
		Long number = null;
		foo1(s, number);
		System.out.println(s);
		System.out.println(number);
	}

	private void foo(String s, Long number) {
		s = "LTTD";
		number = 1L;
	}

	private void foo1(Object s, Object number) {
		s = "LTTD";
		number = 1L;
	}

	public static void main(String[] args) {
		new ObjectParseParameter();
	}
}