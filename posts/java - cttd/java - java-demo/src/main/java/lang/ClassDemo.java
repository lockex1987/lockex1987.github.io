package lang;

interface A {
}

class B implements A {
}

public class ClassDemo {

	public static void main(String args[]) {
		A a = new B();
		B b = new B();
		System.out.println(a.getClass().getName());
		System.out.println(b.getClass().getName());
		System.out.println(a.getClass().getSuperclass().getName());
	}
}
