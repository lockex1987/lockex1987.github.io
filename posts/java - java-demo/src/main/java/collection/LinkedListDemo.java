package collection;

import java.util.LinkedList;

public class LinkedListDemo {

	private static final String[] EX_CLASS = {
		"Dung",
		"Thu A",
		"Thu B",
		"H. Thu",
		"Truong",
		"Hung",
		"Tho",
		"Anh",
		"Hue",
		"Huyen",
		"NVH",
		"Vu",
		"Ngoc",
		"T. Thuy",
		"Tam",
		"Giang",
		"Mai",
		"Quyen",
		"Son",
		"V.Tuan",
		"A.Tuan",
		"T. Anh",
		"Thanh",
		"D. Anh",
		"T. Tan",
		"D. Tan",
		"M. Thuy",
		"V. Thuan",
		"B. Thuan",
		"Trung",
		"Huong",
		"Long",
		"Bach"
	};

	public static void main(String[] args) {
		LinkedList<String> list = new LinkedList();
		for (String s : EX_CLASS) {
			list.addLast(s);
		}
		System.out.println(list.size());
	}
}
