package common.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

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
		try {
			String inputText = plainPassword + salt;
			byte[] inputBytes = inputText.getBytes();

			// String algorithm = "SHA-1";
			String algorithm = "MD5";
			MessageDigest md = MessageDigest.getInstance(algorithm);

			md.update(inputBytes);
			byte[] outputBytes = md.digest();
			String outputText = new BigInteger(1, outputBytes).toString(16);
			return outputText.toUpperCase();
		} catch (NoSuchAlgorithmException ex) {
			ex.printStackTrace();
			return null;
		}
	}
}
