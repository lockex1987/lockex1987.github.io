package io;

import java.io.FileOutputStream;
import java.io.OutputStream;

public class OutputStreamDemo {

	public static void main(String[] args) {
		writeFile2();
	}

	private static void writeFile1() {
		try {
			// Tạo một luồng ký tự đầu ra với mục đích ghi thông tin vào file
			OutputStream w = new FileOutputStream("_data/output_stream.txt");

			// Tạo một mảng byte, ta sẽ ghi các byte này vào file nói trên
			byte[] by = { 'H', 'e', 'l', 'l', 'o' };

			// Ghi lần lượt các ký tự vào luồng
			for (int i = 0; i < by.length; i++) {
				// Ghi ký tự vào luồng
				w.write(by[i]);
			}
			// Đóng luồng đầu ra lại việc ghi xuống file hoàn tất.
			w.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void writeFile2() {
		try {
			// Tạo một luồng nhị phân đầu ra với mục đích ghi thông tin vào file
			OutputStream os = new FileOutputStream("_data/output_stream.txt");

			// Tạo hai mảng byte, ta sẽ ghi các byte này vào file nói trên
			byte[] by1 = { 'H', 'e', 'l', 'l', 'o', ' ', 31, 34, 92 };
			byte[] by2 = { 'H', 'e', 'l', 'l', 'o', ' ', 'b', 'o', 'y' };

			// Ghi cả các byte trong mảng byte[] by1 vào luồng
			os.write(by1);

			// Đẩy các byte hiện có trên luồng xuống file .
			os.flush();

			// Tiếp tục ghi các byte trong mảng thứ 2 vào luồng
			os.write(by2);

			// Đóng luồng vào công việc ghi thành công .
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
