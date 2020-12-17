package lang;

public class ModifiersDemo {

	public static void main(String[] args) {
		ModifiersTest test = new ModifiersTest();

		System.out.println(test.protectedField);
		System.out.println(test.defaultField);
		System.out.println(test.publicField);
		
		// Classes of the same package can access protected fields and methods
		test.protectedMethod();
	}
}

class ModifiersTest {

	public String publicField = "public field";
	protected String protectedField = "protected field";
	String defaultField = "default field";
	private String privateField = "private field";
	
	protected void protectedMethod() {
		System.out.println("protected method");
	}
}
