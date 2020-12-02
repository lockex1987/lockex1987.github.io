package io2;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.Date;
import testmodel.Pupil;
import testmodel.Student;

public class ObjectInputStreamDemo {

	public static void main(String[] args) throws IOException, ClassNotFoundException {
		// Tạo một luồng đọc file
		FileInputStream fis = new FileInputStream("_data/object_stream.txt");

		// Tạo đối tượng ObjectInputStream bao lấy 'fis'.
		ObjectInputStream ois = new ObjectInputStream(fis);

		// Đọc ra đối tượng String
		String s = ois.readUTF();

		// Đọc ra đối tượng Date.
		Date date = (Date) ois.readObject();
		
		Student student1 = (Student) ois.readObject();
		Pupil pupil = (Pupil) ois.readObject();
		Student student2 = (Student) ois.readObject();

		System.out.println(s);
		System.out.println("Date = " + date);
		System.out.println("Student " + student1.getFirstName());
		System.out.println("Pupil " + pupil.getFullName());
		System.out.println("Student " + student2.getFirstName());

		ois.close();
	}
}
