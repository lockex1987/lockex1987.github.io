package io;

import java.io.*;
import java.util.*;

public class ObjectOutputStreamDemo {

	public static void main(String[] args) throws Exception {
		String path = "_data/ObjectStream.txt";
		try (ObjectOutputStream outStream = new ObjectOutputStream(new FileOutputStream(path))) {
			LinkedList<String> list = new LinkedList<>();
			list.add("Huyen");
			list.add("Duc");
			list.add("Linh");
			outStream.writeObject(list);
		}
	}
}
