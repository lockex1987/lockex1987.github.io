package io;

import java.io.*;

public class RandomAccessFileDemo {

	public static void main(String[] args) {
		try {
			RandomAccessFile f = new RandomAccessFile("RandomAccessFile.txt", "rw");
			f.skipBytes(5);
			int c = f.read();
			System.out.println((char) c);   // 6th character
			long l = f.length();
			f.seek(l - 1);
			c = f.read();
			System.out.println((char) c);   // last character
			f.seek(0);
			c = f.read();
			System.out.println((char) c);   // first character
			// change size of file, maybe increase, maybe decrease
			//f.setLength (l * 2);
			f.close();
		} catch (Exception e) {
			System.out.println(e.toString());
		}
	}

	public static void main1(String[] args) throws Exception {
		RandomAccessFile f = new RandomAccessFile("RandomAccessFile.txt", "rw");
		f.writeBoolean(true);
		f.writeByte(12);
		f.writeBytes("NVH");
		f.writeChar(65);
		//f.writeChars ("NNL");
		f.writeDouble(1.2);
		f.writeFloat(4);
		f.writeInt(13);
		f.writeUTF("\nNNL");
		System.out.println(f.getFilePointer());
		System.out.println(f.length());
		System.out.println("------");
		f.seek(0);
		byte[] b = new byte[3];
		System.out.println(f.readBoolean());
		System.out.println(f.readByte());
		System.out.println(f.read(b, 0, 3));
		System.out.println(f.readChar());
		//System.out.println (f.readLine ());
		System.out.println(f.readDouble());
		System.out.println(f.readFloat());
		System.out.println(f.readInt());
		System.out.println(f.readUTF());
		f.close();
	}
}
