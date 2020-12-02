package lang;

import java.util.Scanner;

/**
 * Clothes sizes
 * @author locke
 */
public enum EnumDemo {

	SMALL("S"), MEDIUM("M"), LARGE("L"), EXTRA_LARGE("XL");

	private final String abbreviation;

	private EnumDemo(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		System.out.print("Enter a size: (SMALL, MEDIUM, LARGE, EXTRA_LARGE): ");
		String input = in.next().toUpperCase();
		EnumDemo size = Enum.valueOf(EnumDemo.class, input);
		System.out.println("size = " + size);
		System.out.println("abbreviation = " + size.getAbbreviation());
		if (size == EnumDemo.EXTRA_LARGE) {
			System.out.println("Good job--you paid attention to the _.");
		}
	}
}
