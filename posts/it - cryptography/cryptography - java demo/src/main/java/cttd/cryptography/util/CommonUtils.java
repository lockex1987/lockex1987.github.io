package cttd.cryptography.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.util.Base64;

public class CommonUtils {

	public static String convertByteToHex1(byte[] data) {
		BigInteger number = new BigInteger(1, data);
		String hashtext = number.toString(16);
		// Now we need to zero pad it if you actually want the full 32 chars.
		while (hashtext.length() < 32) {
			hashtext = "0" + hashtext;
		}
		return hashtext.toUpperCase();
	}

	public static String convertByteToHex2(byte[] data) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < data.length; i++) {
			sb.append(Integer.toString((data[i] & 0xff) + 0x100, 16).substring(1));
		}
		return sb.toString();
	}

	public static String convertByteToHex3(byte[] data) {
		StringBuffer hexString = new StringBuffer();
		for (int i = 0; i < data.length; i++) {
			String hex = Integer.toHexString(0xff & data[i]);
			if (hex.length() == 1)
				hexString.append('0');
			hexString.append(hex);
		}
		return hexString.toString();
	}

	public static String convertByteToHex(byte[] data) {
		return convertByteToHex2(data);
	}

	public static byte[] convertStringToBytes(String text) {
		return text.getBytes();
	}

	public static String convertBytesToString(byte[] bytes) {
		return new String(bytes);
	}
	
	public static String convertUtf16BytesToString(byte[] bytes) {
		return new String(bytes, Charset.forName("UTF-16"));
	}

	public static byte[] convertFileToBytes(File file) {
		try {
			return Files.readAllBytes(file.toPath());
		} catch (IOException e) {
			return null;
		}
	}

	public static void writeToFile(String path, byte[] data) {
		try {
			File f = new File(path);
			f.getParentFile().mkdirs();
			FileOutputStream fos = new FileOutputStream(f);
			fos.write(data);
			fos.flush();
			fos.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	public static byte[] convertBase64TextToBytes(String base64Text) {
		return Base64.getDecoder().decode(base64Text);
	}

	public static String convertBytesToBase64Text(byte[] bytes) {
		return Base64.getEncoder().encodeToString(bytes);
	}
}
