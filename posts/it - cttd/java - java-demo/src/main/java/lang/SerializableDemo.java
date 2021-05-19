package lang;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/**
 * https://www.tutorialspoint.com/java/java_serialization.htm
 */
public class SerializableDemo {

	private static final String FILE_PATH = "_output/serializable.ser";

	private static void serialize() {
		try {
			IsSerializable e = new IsSerializable();
			e.name = "Reyan Ali";
			e.address = "Phokka Kuan, Ambehta Peer";
			e.SSN = 11122333;
			e.number = 101;

			FileOutputStream out = new FileOutputStream(FILE_PATH);
			ObjectOutputStream oos = new ObjectOutputStream(out);
			oos.writeObject(e);
			oos.close();
			out.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void deserialize() {
		IsSerializable e = null;
		try {
			FileInputStream fileIn = new FileInputStream(FILE_PATH);
			ObjectInputStream in = new ObjectInputStream(fileIn);
			e = (IsSerializable) in.readObject();
			in.close();
			fileIn.close();
		} catch (Exception ex) {
			ex.printStackTrace();
			return;
		}

		System.out.println("Deserialized Employee...");
		e.printInfo();
	}
	
	private static void notSerializable() {
		try {
			NotSerializable obj = new NotSerializable();
			FileOutputStream out = new FileOutputStream("_output/serializable-exception.ser");
			ObjectOutputStream oos = new ObjectOutputStream(out);
			oos.writeObject(obj);
			oos.close();
			out.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void main(String[] args) { 
		serialize();
		deserialize();
		//notSerializable();
	}

	static class NotSerializable {

		private String s = "Oh, bother!";
	}

	static class IsSerializable implements Serializable {
		
		private String s = "Hehe";

		public String name;
		public String address;
		public transient int SSN;
		public int number;
		
		public void printInfo() {
			System.out.println("s: " + s);
			System.out.println("Name: " + name);
			System.out.println("Address: " + address);
			System.out.println("SSN: " + SSN);
			System.out.println("Number: " + number);			
		}
	}
}
