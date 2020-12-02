package io2;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;

public class PrintWriterDemo {

	public static void main(String[] args) throws IOException {
		// Tạo luồng ghi vào file.
		Writer w = new FileWriter("_data/text_file.txt");

		// Tạo đối tượng PrintWriter bao lấy Writer w
		// Như vậy dữ liệu ghi vào PrintWriter sẽ ghi vào FileWriter w.
		PrintWriter pw = new PrintWriter(w);

		// Ghi thông tin lỗi vào luồng 'pw'
		pw.println("Cao Thị Thùy Dương");
		pw.println("Nguyễn Văn Huyên");
		pw.close();
		
		System.out.println("Finish !");
	}
}
