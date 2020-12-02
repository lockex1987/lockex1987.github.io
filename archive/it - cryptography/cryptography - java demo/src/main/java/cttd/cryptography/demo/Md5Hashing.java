package cttd.cryptography.demo;

import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import cttd.cryptography.util.CommonUtils;


public class Md5Hashing {

	public static String hash(String input) {
		byte[] dataInput = CommonUtils.convertStringToBytes(input);
		return hash(dataInput);
	}

	public static String hash(File file) {
		byte[] dataInput = CommonUtils.convertFileToBytes(file);
		return hash(dataInput);
	}

	public static String hash(byte[] dataInput) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(dataInput);
			byte[] hashedData = md.digest();
			return CommonUtils.convertByteToHex(hashedData);
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}
}
