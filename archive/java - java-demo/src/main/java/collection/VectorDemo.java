package collection;

import java.util.*;

public class VectorDemo extends Vector {

	public VectorDemo() {
		ensureCapacity(5);
		add("Two");
		add(0, "One");
		addElement("Three");
		addElement("Four");
		insertElementAt("Numbers In Words", 0);
		set(0, "Vector");
		System.out.println("Size: " + size());
		System.out.println("Capacity: " + capacity());
		for (int i = 0; i < size(); i++) {
			System.out.print(elementAt(i) + ", ");
		}

		System.out.println("\n\nContains \"Five\": " + contains("Five"));
		System.out.println("Index of \"Four\": " + indexOf("Four"));

		removeElement("Four");
		System.out.println("\nSize: " + size());
		for (int i = 0; i < size(); i++) {
			System.out.print(elementAt(i) + ", ");
		}
		clear();
		System.out.println("\nis empty: " + isEmpty());
	}

	public static void main(String args[]) {
		new VectorDemo();
	}
}
