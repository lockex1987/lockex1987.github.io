package io;

import java.io.*;

public class BufferedReaderDemo {

	public static void main(String[] args) throws Exception {
		String path = "_data/unicode.txt";
		try (BufferedReader inStream = new BufferedReader(new FileReader(path))) {
			String s;
			while ((s = inStream.readLine()) != null) {
				System.out.println(s);
			}
		}
	}
}
