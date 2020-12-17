package collection;

import java.util.*;

public class HashtableDemo {

	public static void main(String args[]) {
		Hashtable<String, Integer> h = new Hashtable();
		h.put("Pulse", 1995);
		h.put("Dark Side of the Moon", 1973);
		h.put("Wish You Were Here", 1975);
		h.put("Animals", 1997);
		h.put("Ummagumma", 1969);

		System.out.println("Initailly: " + h.toString());
		if (h.contains(1969)) {
			System.out.println("An album from 1969 exists");
		}
		if (h.containsKey("Animals")) {
			System.out.println("Animals was found");
		}
		Integer year = h.get("Wish You Were Here");
		System.out.println("Wish you Were Here was released in" + year);
		System.out.println("Removing Ummagumma\r\n");
		h.remove("Ummagumma");
		System.out.println("Remaining:\r\n");
		for (Enumeration e = h.keys(); e.hasMoreElements();) {
			System.out.println(e.nextElement());
		}
	}
}
