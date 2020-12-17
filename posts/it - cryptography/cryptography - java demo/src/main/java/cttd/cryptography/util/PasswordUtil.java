package cttd.cryptography.util;

import java.util.Random;

import cttd.cryptography.demo.Md5Hashing;

public class PasswordUtil {

	public static String generateSalt() {
		char[] source = "abcdefghijklmopqrstuvwxyz0123456789".toCharArray();
		Random random = new Random();
		int len = 10;
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < len; i++) {
			sb.append(source[random.nextInt(source.length)]);
		}
		String salt = sb.toString();
		return salt;
	}

	public static String encryptPassword(String plainPassword, String salt) {
		String text = plainPassword + salt;
		byte[] dataInput = CommonUtils.convertStringToBytes(text);
		return Md5Hashing.hash(dataInput);
	}
}
