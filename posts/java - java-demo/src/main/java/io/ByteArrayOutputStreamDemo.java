package io;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ByteArrayOutputStreamDemo {

	public static void main(String args[]) throws IOException {
		// Tạo một đối tượng ByteArrayOutputStream.
		// Đối tượng chứa bên trong nó một mảng các byte.
		// Khởi tạo mảng các byte 12 phần tử.
		// Nếu số phẩn tử ghi vào luồng nhiều hơn 12 mảng sẽ được thay thế bằng
		// mảng mới có nhiều phần tử hơn, và copy các phần tử mảng cũ sang.
		ByteArrayOutputStream bOutput = new ByteArrayOutputStream(12);
		String s = "Hello ByteArrayOutputStream";
		for (int i = 0; i < s.length(); i++) {
			char ch = s.charAt(i);
			if (ch != 'a' && ch != 'e') {
				bOutput.write(ch);
			}
		}

		// Kiểm tra độ dài của luồng
		int size = bOutput.size();
		System.out.println("Size = " + size);
		byte[] bytes = bOutput.toByteArray();
		String ss = new String(bytes);
		System.out.println("New String = " + ss);
		bOutput.close();
	}
}
