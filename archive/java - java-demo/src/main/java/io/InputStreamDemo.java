package io;

import java.io.FileInputStream;
import java.io.InputStream;

public class InputStreamDemo {

	public static void main(String[] args) {
		readFile2();
	}

	private static void readFile1() {
		try {
			// Tạo một đối tượng InputStream theo class con của nó.
			// Đây là luồng đọc một file.
			InputStream is = new FileInputStream("_data/input_stream.txt");
			int i = -1;

			// Đọc lần lượt các byte trong luồng.
			// Mỗi lần đọc ra 8bit, chuyển nó thành số int.
			// Khi đọc ra giá trị -1 nghĩa là kết thúc luồng.
			while ((i = is.read()) != -1) {
				System.out.println(i + "  " + (char) i);
			}
			is.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void readFile2() {
		try {
			// Tạo một luồng đầu vào bằng cách đọc một file
			InputStream in = new FileInputStream("_data/input_stream.txt");

			// Mảng để mỗi lần đọc các byte từ luồng thì tạm thời để lên đó
			// Ta dùng mảng 10 byte
			byte[] temp = new byte[10];
			int i = -1;

			// Đọc các byte trong luồng và gán lên các phần tử của mảng.
			// Giá trị i là số đọc được của 1 lần. (i sẽ <= 10).
			// Khi không còn phần tử trong luồng i sẽ = -1
			while ((i = in.read(temp)) != -1) {
				// Tạo String từ các byte đọc được
				String s = new String(temp, 0, i);
				System.out.println(s);
			}
			in.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
