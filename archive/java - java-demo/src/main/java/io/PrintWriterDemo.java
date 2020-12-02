package io;

import java.io.*;

public class PrintWriterDemo {

	public static void main(String[] args) throws Exception {
		String path = "_data/unicode.txt";
		try (PrintWriter outStream = new PrintWriter(path, "UTF-8")) {
			outStream.println("Tôi yêu Cao Thị Thùy Dương");
		}
	}
}
