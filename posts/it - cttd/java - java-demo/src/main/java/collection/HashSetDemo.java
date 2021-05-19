package collection;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class HashSetDemo {

	public static void main(String[] args) {
		final int size = 1000;
		final int bound = 100;
		Set<Long> set = new HashSet();
		for (int i = 0; i < size; i++) {
			set.add(Math.round(Math.random() * bound));
		}

		Iterator<Long> iter = set.iterator();
		for (int i = 0; i < 20 && iter.hasNext(); i++) {
			System.out.println(iter.next());
		}
		
		System.out.println("....");
		System.out.println(set.size() + " distinct numbers.");
	}
}
