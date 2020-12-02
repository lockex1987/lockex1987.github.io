package io;

import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;

public class FileWriterDemo {

	public static void main(String[] args) throws IOException {
		//writeFile2();
		writeFile3();
	}

	private static void writeFile1() throws IOException {
		// Tạo một luồng ghi ký tự vào file
		// Mã hóa là mã hóa mặc định của Hệ thống Java
		// Bạn có thể thay đổi mã hóa mặc định của hệ thống
		Writer w = new FileWriter("_data/file_reader_writer.txt");

		// Mảng các ký tự
		char[] chars = { 'H', 'e', 'l', 'l', 'o', ' ', 'w', 'r', 'i', 't', 'e', 'r' };

		// Ghi lần lượt các ký tự vào luồng.
		for (int i = 0; i < chars.length; i++) {
			char ch = chars[i];
			// Ép kiểu về int
			int j = (int) ch;
			// Ghi vào luồng.
			w.write(j);
		}
		// Đóng luồng, việc ghi hoàn thành.
		w.close();
	}

	private static void writeFile2() throws IOException {
		// Tạo một luồng ký tự ghi vào file.
		Writer w = new FileWriter("_data/file_reader_writer.txt");

		// Tao mot mang ky tu, ta se ghi cac ky tu nay vao file
		char[] chars = { 'H', 'e', 'l', 'l', 'o', ' ', 'w', 'r', 'i', 't', 'e', 'r' };

		// Ghi các ký tự trong mảng vào luồng.
		w.write(chars);

		// Thông thường Java sử dụng bộ đệm để lưu dữ liệu
		// khi đầy bộ đệm nó mới đẩy xuống file
		// Bạn có thể chủ động đẩy dữ liệu xuống file.
		w.flush();

		// Ghi ký tự xuống dòng vào luồng.
		w.write('\n');

		String s = "FileWriter";
		// Ghi một chuỗi vào luồng.
		w.write(s);
		// Đóng luồng ký tự.
		// Nó sẽ đẩy các dữ liệu trên bộ đệm xuống.
		// Việc ghi ra file thành công
		w.close();
	}
	
	private static void writeFile3() throws IOException {
    // Tạo một luồng nhị phân ghi ra file.
    OutputStream out = new FileOutputStream("_data/test_utf8.txt");
    
    // Tạo một luồng ghi ký tự.
    // Mã hóa UTF-8
    Writer writer = new OutputStreamWriter(out, "UTF-8");
    String s = "JP日本-八洲";
    writer.write(s);
    writer.close();
}
}
