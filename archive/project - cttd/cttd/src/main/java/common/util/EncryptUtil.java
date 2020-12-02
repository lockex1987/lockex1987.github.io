package common.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.xml.bind.DatatypeConverter;

public class EncryptUtil {

	/**
	 * Ma hoa du lieu nhay cam (password).
	 *
	 * @param plainPassword
	 *            Xau thuong
	 * @param salt
	 *            Xau duoc cong them vao xau thuong cho phuc tap
	 * @return Xau ma hoa
	 */
	public static String encryptPassword(String plainPassword, String salt) {
		String inputText = plainPassword + salt;
		byte[] inputBytes = inputText.getBytes(); // .getBytes("UTF-8")
		MessageDigest md = getMessageDigest();
		md.update(inputBytes);
		byte[] outputBytes = md.digest();
		String outputText = bytesToHex(outputBytes);
		return outputText.toUpperCase();
	}

	private static MessageDigest getMessageDigest() {
		try {
			// String algorithm = "SHA-1";
			String algorithm = "MD5";
			MessageDigest md = MessageDigest.getInstance(algorithm);
			return md;
		} catch (NoSuchAlgorithmException ex) {
			ex.printStackTrace();
			return null;
		}
	}

	private static String bytesToHex(byte[] bytes) {
		String hex = bytesToHex1(bytes);
		return hex;
	}

	private static String bytesToHex1(byte[] bytes) {
		StringBuilder sb = new StringBuilder();
		for (byte b : bytes) {
			sb.append(String.format("%02X", b));
		}
		return sb.toString();
	}

	private static String bytesToHex2(byte[] bytes) {
		String hex = new BigInteger(1, bytes).toString(16);
		return hex;
	}

	private static String bytesToHex3(byte[] bytes) {
		final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
		StringBuilder sb = new StringBuilder(bytes.length * 2);
		for (int j = 0; j < bytes.length; j++) {
			sb.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
			sb.append(HEX_DIGITS[bytes[j] & 0x0f]);
		}
		return sb.toString();
	}

	private static String bytesToHex4(byte[] bytes) {
		String hex = DatatypeConverter.printHexBinary(bytes);
		return hex;
	}
}
