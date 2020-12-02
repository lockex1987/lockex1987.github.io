package io2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

public class BufferedReaderDemo {

	public static void main(String[] args) throws IOException {
		InputStream in = new FileInputStream("_data/text_file.txt");
		Reader reader = new InputStreamReader(in, "UTF-8");
		BufferedReader br = new BufferedReader(reader);
		String s;

		// Đọc từng dòng dữ liệu
		// Khi đọc 1 dòng trả về null nghĩa là kết thúc luồng.
		while ((s = br.readLine()) != null) {
			System.out.println(s);
		}
		br.close();
	}
}
