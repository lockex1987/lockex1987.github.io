package lang;

class ClassDemo1 {

	public static void main(String[] args) {
		MyClass1 o = new MyClass1();
		Class c = o.getClass();
		System.out.println(c.getName());
		System.out.println(c.isInterface());
		System.out.println(c.isPrimitive());
		System.out.println(c.isInstance(o));
		Class sc = c.getSuperclass();
		System.out.println(sc.getName());
		System.exit(0);
	}

	static class MyClass1 extends java.awt.Frame {
	}
}
