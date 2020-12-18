package io;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public class ByteArrayInputStreamDemo {

	public static void main(String args[]) throws IOException {

		// Một mảng byte.
		byte[] bytes = new byte[] { 'H', 'e', 'l', 'l', 'o', ' ', 'I', 'O' };

		// Sử dụng ByteArrayInputStream để đọc dữ liệu mảng trên.
		ByteArrayInputStream bInput = new ByteArrayInputStream(bytes);

		System.out.println("Converting characters to Upper case ");
		int c = 0;

		// Đọc lần lượt các byte trong luồng.
		// Con trỏ sẽ di chuyển từ đầu mảng tới cuối mảng.
		// Mỗi lần đọc một byte con trỏ sẽ tiến 1 bước về cuối.
		while ((c = bInput.read()) != -1) {
			char ch = (char) c;
			ch = Character.toUpperCase(ch);
			System.out.println(ch);
		}

		// Kiểm tra xem stream này có hỗ trợ đánh dấu (mark) không.
		boolean markSupport = bInput.markSupported();

		System.out.println("Mark Support? " + markSupport);

		// Đưa con trỏ về vị trí mặc định
		// Trong ví dụ này nó sẽ đưa về vị trí 0.
		bInput.reset();

		char ch = (char) bInput.read();
		System.out.println(ch);

		// Đọc byte kế tiếp
		ch = (char) bInput.read();
		System.out.println(ch);

		System.out.println("Skip 4");
		// Nhẩy qua 4 vị trí
		bInput.skip(4);
		ch = (char) bInput.read();
		System.out.println(ch);
	}
}
