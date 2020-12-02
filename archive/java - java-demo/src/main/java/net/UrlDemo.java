package net;

import java.net.*;
import java.io.*;

public class UrlDemo {

	public UrlDemo() {
		try {
			// URL u = new URL("http://java.sun.com/index.html#chapter1");
			URL u = new File("URLDemo.java").toURL();
			System.out.println(u);
			System.out.println(u.getAuthority());
			// System.out.println(u.getContent());
			System.out.println(u.getFile());
			System.out.println(u.getHost());
			System.out.println(u.getPath());
			System.out.println(u.getPort());
			System.out.println(u.getProtocol());
			System.out.println(u.getQuery());
			System.out.println(u.getRef());
			System.out.println(u.getUserInfo());
			// getContent(Class[] classes)
		} catch (MalformedURLException mue) {
			mue.printStackTrace();
		}
	}

	public static void main(String[] args) {
		new UrlDemo();
	}
}