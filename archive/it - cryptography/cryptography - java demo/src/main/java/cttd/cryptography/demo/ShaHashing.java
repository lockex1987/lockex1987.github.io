package cttd.cryptography.demo;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import cttd.cryptography.util.CommonUtils;

public class ShaHashing {

	public static String hash(String input) {
		byte[] dataInput = CommonUtils.convertStringToBytes(input);
		return hash(dataInput);
	}
	
	public static String hash(byte[] dataInput) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			md.update(dataInput);
			byte[] hashedData = md.digest();
			return CommonUtils.convertByteToHex(hashedData);
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}
}
