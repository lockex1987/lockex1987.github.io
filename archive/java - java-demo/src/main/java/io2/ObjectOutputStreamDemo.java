package io2;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Date;
import testmodel.Pupil;
import testmodel.Student;

public class ObjectOutputStreamDemo {

	public static void main(String[] args) throws IOException {
		Student student1 = new Student("Thanh", "Phan");
		Student student2 = new Student("Ngan", "Tran");
		Pupil pupil1 = new Pupil("Nguyen Van Ba");

		// Tao mot luong ghi vào file ...
		FileOutputStream fos = new FileOutputStream("_data/object_stream.txt");

		// Tạo đối tượng ObjectOutputStream bao lấy 'fos'.
		// Những gì ghi vào luồng này sẽ được đẩy xuống 'fos'.
		ObjectOutputStream oos = new ObjectOutputStream(fos);

		// Ghi một String vào luồng
		oos.writeUTF("This is student, pupil profiles");

		// Ghi một đối tượng Date vào luồng
		oos.writeObject(new Date());

		// Chú ý: Các đối tượng ghi được vào luồng phải là kiểu Serializable
		oos.writeObject(student1);
		oos.writeObject(pupil1);
		oos.writeObject(student2);

		oos.close();
		System.out.println("Write successful");
	}
}
