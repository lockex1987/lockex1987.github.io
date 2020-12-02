package io;

import java.io.*;
import java.util.*;

public class ObjectInputStreamDemo {

	public static void main(String[] args) throws Exception {
		String path = "_data/ObjectStream.txt";
		try (ObjectInputStream inStream = new ObjectInputStream(new FileInputStream(path))) {
			LinkedList<String> list = (LinkedList) inStream.readObject();
			for (String s : list) {
				System.out.println(s);
			}
		}
	}
}
