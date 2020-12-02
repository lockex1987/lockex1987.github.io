package io;

import java.util.Scanner;

public class ScannerDemo {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.print("What is your name? ");
		String name = scanner.nextLine();
		System.out.print("How old are you? ");
		int age = scanner.nextInt();

		System.out.println("Hello, " + name + ". Next year, you'll be " + (age + 1));
		System.out.printf("Hello, %s. Next year, you'll be %d\n", name, age + 1);
		System.out.println(String.format("Hello, %s. Next year, you'll be %d", name, age + 1));
		scanner.close();
	}
}
