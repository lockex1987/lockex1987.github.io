package lang;

public class InnerClassDemo {
	
	public static void main(String[] args) {
		OuterClass outerClass = new OuterClass();
		System.out.println(outerClass.getOuterField());
		System.out.println(outerClass.getInnerClass());
		
		// Look strange, but legal
		OuterClass.InnerClass innerClass = outerClass.new InnerClass();
		innerClass.publicInnerMethod();
	}
}

class OuterClass {
	
	private String outerField;
	private InnerClass innerClass;
	
	public OuterClass() {
		System.out.println("The same as Android? " + (this == OuterClass.this));
	}

	public String getOuterField() {
		return outerField;
	}

	public InnerClass getInnerClass() {
		return innerClass;
	}
	
	class InnerClass {
	
		private void privateInnerMethod() {
			System.out.println("private inner method" + outerField);
		}
		
		public void publicInnerMethod() {
			System.out.println("public inner method");
		}
	}
}