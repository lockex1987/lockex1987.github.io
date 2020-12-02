package collection;

import java.util.*;

public class StackDemo {

	public static void main(String[] args) {
		Stack<String> s = new Stack();
		System.out.println(s.empty());
		s.push("Huyen");
		s.push("Linh");
		s.push("Duc");
		System.out.println(s.search("Trang"));
		System.out.println(s.search("Linh"));   //order, not index
		System.out.println(s.pop());
		System.out.println(s.peek());
		System.out.println(s.pop());
		System.out.println(s.pop());
		//System.out.println(s.pop ());   //catch EmptyStackException
	}
}
