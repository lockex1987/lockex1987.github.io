package collection;

import java.util.*;

class CollectionDemo {

	public static void main(String[] args) {
		Collection c = new MyClass();
		c.add("Huyen");
		c.add("College of Technology");
		c.add("Male");
		c.add("Age 19");

		Collection x1 = new MyClass();
		Collection x2 = new MyClass();
		x1.addAll(c);
		x2.addAll(c);

		System.out.println(" c> " + c);
		c.remove("Age 19");
		c.add("Huyen");
		System.out.println(" c> " + c);
		x2.retainAll(c);

		System.out.println("x1> " + x1);
		System.out.println("\tx1 contains \"Female\"? " + x1.contains("Female"));
		System.out.println("x2> " + x2);
		System.out.println("\tx2 contains c? " + x1.containsAll(c) + " NOTE!");

		System.out.println("    Elements of c:");
		Iterator i = c.iterator();
		String s;
		while (i.hasNext()) {
			s = (i.next()).toString();
			System.out.println("\t-" + s);
		}

		String[] a = (String[]) c.toArray(new String[c.size()]);
		for (int j = 0; j < a.length; j++) {
			System.out.println("\t+" + a[j]);
		}

		c.clear();
		System.out.println(" c> " + c);
		System.out.println("    c is empty? " + c.isEmpty());

	}
}

class MyClass extends LinkedList {
}

// java.util.Collection is abstract; cannot be instantiated
