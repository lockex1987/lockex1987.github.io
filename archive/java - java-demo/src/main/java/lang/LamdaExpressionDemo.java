package lang;

public class LamdaExpressionDemo {

	public static void main(String[] args) {
		repeat1(10, () -> System.out.println("Lamda Expression "));
		repeat2(10, (idx) -> System.out.println("Hacker " + idx));
	}

	private static void repeat1(int n, Runnable action) {
		for (int i = 0; i < n; i++) {
			action.run();
		}
	}

	private static void repeat2(int n, FunctionalInterface action) {
		for (int i = 0; i < n; i++) {
			action.apply(i);
		}
	}
}

interface FunctionalInterface {

	// A interface's method is public automatically
	void apply(int n);
}
