package io;

import java.io.*;

public class BufferedWriterDemo {

	public static void main(String[] args) throws Exception {
		String path = "_data/unicode.txt";
		try (BufferedWriter outStream = new BufferedWriter(new FileWriter(path))) {
			outStream.write("Nguyễn Văn Huyên");
			outStream.newLine();
			outStream.write("Cao Thị Thùy Dương");
		}
	}
}
