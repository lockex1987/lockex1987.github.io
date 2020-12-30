package io;

import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

public class FileReaderDemo {

	public static void main(String[] args) throws IOException {
		// readFile1();
		// readFile2();
		readFile3();
	}

	private static void readFile1() throws IOException {
		// Luồng ký tự, đọc một file.
		// FileReader đọc ký tự theo mã hóa mặc định của Java trên máy chạy code này.
		Reader r = new FileReader("_data/file_reader_writer.txt");
		int i = -1;

		// Đọc lần lượt từng ký tự trong luồng.
		while ((i = r.read()) != -1) {
			// Ép về kiểu ký tự
			System.out.println((char) i);
		}
		r.close();
	}

	private static void readFile2() throws IOException {
		// Tạo một đối tượng Reader đọc một file.
		// Đọc theo mã hóa mặc định của hệ thống Java.
		// Bạn có thể chủ động sét đặt mã hóa mặc định cho hệ thống.
		Reader r = new FileReader("_data/file_reader_writer.txt");

		// Tạo một mảng để mỗi lần đọc từ luồng, chúng được gán lên trên đó.
		char[] temp = new char[10];
		int i = -1;

		// Method read(char[]):
		// Đọc nhiều ký tự một lần, và gán lên các phần tử cho mảng.
		// Trả về số ký tự đọc được.
		// Khi không còn phần tử trên luồng, trả về -1
		while ((i = r.read(temp)) != -1) {
			String s = new String(temp, 0, i);
			System.out.println(s);
		}
		r.close();
	}

	private static void readFile3() throws IOException {
		// Tạo một luồng nhị phân, đọc file.
		InputStream in = new FileInputStream("_data/test_utf8.txt");

		// Tạo một luồng ký tự từ luồng nhị phân.
		// Mã hóa đọc UTF-8
		Reader reader = new InputStreamReader(in, "UTF-8");

		int i = 0;
		// Đọc lần lượt từng ký tự
		while ((i = reader.read()) != -1) {
			// Ép kiểu về ký tự và in ra màn hình
			System.out.println((char) i + " " + i);
		}
		reader.close();
	}
}
