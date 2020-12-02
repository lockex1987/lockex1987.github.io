package collection;

import java.util.*;

public class ListDemo {

	public static Student[] LIST = {
		new Student("Linh"),
		new Student("Huyen"),
		new Student("Thu"),
		new Student("Duc"),};

	public ListDemo() {
		List<Student> list = new LinkedList<Student>();
		for (Student s : LIST) {
			list.add(s);
		}
		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).getName());
		}
		for (Student s : list) {
			System.out.println(s.getName());
		}
	}

	public static void main(String[] args) {
		//new ListDemo();
		/*
		List<Integer> list = new ArrayList<Integer>();
		list.add(1);
		list.add(2);
		list.add(3);
		String s = list.toString();
		System.out.println(s);
		 */
		List<Long> list = new ArrayList<Long>();

		//list.add(1L);
		//list.add(2L);
		list.add(new Long(3L));
		Long n = new Long(3L);
		System.out.println(list.contains(n));

	}
}

class Student {

	private String name;

	public Student(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
}
