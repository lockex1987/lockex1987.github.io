package io;

import java.io.Console;

public class ConsoleDemo {

	public static void main(String[] args) {
		Console console = System.console();
		char[] password = console.readPassword("Password: ");
		System.out.println(new String(password));
	}
}
