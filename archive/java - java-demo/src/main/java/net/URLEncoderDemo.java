package net;

import java.net.URLEncoder;
import java.net.URLDecoder;
import java.io.UnsupportedEncodingException;

public class URLEncoderDemo {
	public static void main(String args[]) {
		try {
			String s1 = "Tra cứu IN;Hà Nội 1";
			String s2 = URLEncoder.encode(s1, "UTF-8");
			String s3 = URLDecoder.decode(s2, "UTF-8");
			System.out.println(s1);
			System.out.println(s3);
		} catch (UnsupportedEncodingException ex) {
			ex.printStackTrace();
			return;
		}
	}
}