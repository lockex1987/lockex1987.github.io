package io;

import java.io.*;

public class DataOutputStreamDemo {

	public static void main(String[] args) throws Exception {
		String path = "_data/DataStream.txt";
		try (DataOutputStream outStream = new DataOutputStream(new FileOutputStream(path))) {
			outStream.write(1);
			outStream.writeBoolean(true);
			outStream.writeByte(11);
			//dos.writeBytes("I love U");
			outStream.writeChar(65);
			//dos.writeChar('L');
			//dos.writeChars("NVH");
			outStream.writeDouble(12.34);
			outStream.writeFloat(4.5f);
			outStream.writeInt(123);
			outStream.writeLong(567);
			outStream.writeShort(89);
			outStream.writeUTF("\u0110");
		}
	}
}
