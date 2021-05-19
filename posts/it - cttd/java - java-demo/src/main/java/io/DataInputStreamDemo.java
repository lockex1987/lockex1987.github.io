package io;

import java.io.*;

public class DataInputStreamDemo {

	public static void main(String[] args) throws Exception {
		String path = "_data/DataStream.txt";
		try (DataInputStream inStream = new DataInputStream(new FileInputStream(path))) {
			System.out.println("Available: " + inStream.available());
			System.out.println(inStream.read());
			System.out.println(inStream.readBoolean());
			System.out.println(inStream.readByte());
			System.out.println(inStream.readChar());
			System.out.println(inStream.readDouble());
			System.out.println(inStream.readFloat());
			System.out.println(inStream.readInt());
			System.out.println(inStream.readLong());
			System.out.println(inStream.readShort());
			System.out.println(inStream.readUTF());
			System.out.println("Available: " + inStream.available());
		}
	}
}
