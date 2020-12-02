package lang;

import java.util.*;

public class ComparableDemo {

	private final LinkedList<MyClass> list = new LinkedList();

	public ComparableDemo() {
		list.add(new MyClass(0));
		list.add(new MyClass(9));
		list.add(new MyClass(7));
		list.add(new MyClass(3));
		list.add(new MyClass(6));
	}

	public void display() {
		list.stream().forEach(System.out::println);
	}

	public void sort() {
		Collections.sort(list);
	}

	public static void main(String[] args) {
		ComparableDemo cd = new ComparableDemo();
		System.out.println("Before sort");
		cd.display();
		System.out.println("After sort");
		cd.sort();
		cd.display();
	}

	class MyClass implements Comparable<MyClass> {

		public final int n;

		public MyClass(int n) {
			this.n = n;
		}

		@Override
		public int compareTo(MyClass c) {
			return this.n - c.n;
		}

		@Override
		public String toString() {
			return String.valueOf(n);
		}
	}
}
