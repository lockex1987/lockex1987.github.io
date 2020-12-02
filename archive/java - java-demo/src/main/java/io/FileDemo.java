package io;

import java.io.*;
import java.net.MalformedURLException;

public class FileDemo {

	public static void main(String[] args) {
//		System.out.println(File.pathSeparator);
//		System.out.println(File.pathSeparatorChar);
//		System.out.println(File.separator);
//		System.out.println(File.separatorChar);
		File file = new File("/data/FileDemo");
		try {
			file.createNewFile();
//			file.mkdir();
		} catch (IOException e) {
			System.out.println("Cannot create new file");
		}

		// Day la kich thuoc cua partition chua file
		System.out.println(file.getTotalSpace());
		System.out.println(file.getUsableSpace());
		System.out.println(file.getFreeSpace());
		System.out.println(file.length());

		System.out.println("exists           " + file.exists());
		System.out.println("canRead          " + file.canRead());
		System.out.println("canWrite         " + file.canWrite());
		System.out.println("getAbsolutePath  " + file.getAbsolutePath());
		System.out.println("getName          " + file.getName());
		System.out.println("getParent        " + file.getParent());
		System.out.println("getParentFile    " + file.getParentFile());
		System.out.println("getPath          " + file.getPath());
		System.out.println("isFile           " + file.isFile());
		System.out.println("isDirectory      " + file.isDirectory());
		System.out.println("isHidden         " + file.isHidden());
		System.out.println("lastModified     " + file.lastModified());
		System.out.println("length           " + file.length());

		try {
			System.out.println("getCanonicalPath " + file.getCanonicalPath());
		} catch (Exception ex) {
			System.out.println("Cannot get canonical path");
		}
		try {
			System.out.println("toURL            " + file.toURL());
		} catch (MalformedURLException e) {
			System.out.println("Cannot convert to URL");
		}

		//file.deleteOnExit();
		if (file.delete()) {
			System.out.println("File is deleted");
		} else {
			System.out.println("Cannot delete file");
		}
	}
}
