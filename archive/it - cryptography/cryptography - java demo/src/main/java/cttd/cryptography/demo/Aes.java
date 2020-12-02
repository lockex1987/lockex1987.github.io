package cttd.cryptography.demo;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import cttd.cryptography.util.CommonUtils;

// https://docs.oracle.com/javase/7/docs/technotes/guides/security/SunProviders.html
public class Aes {

	public static String encrypt(String plaintext) {
		try {
			Cipher cipher = initCipher(true);
			byte[] byteEncrypted = cipher.doFinal(plaintext.getBytes());
			String ciphertext = CommonUtils.convertBytesToBase64Text(byteEncrypted);
			return ciphertext;
		} catch (IllegalBlockSizeException | BadPaddingException ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public static String decrypt(String ciphertext) {
		try {
			Cipher cipher = initCipher(false);
			byte[] byteEncrypted = CommonUtils.convertBase64TextToBytes(ciphertext);
			byte[] byteDecrypted = cipher.doFinal(byteEncrypted);
			String decrypted = CommonUtils.convertBytesToString(byteDecrypted);
			return decrypted;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	private static Cipher initCipher(boolean isEcnrypt) {
		try {
			// Key, iv phải 16 ký tự
			String secretKey = "stackjava.com.if";
			String secretIv = "12345678ttek35()";

			SecretKeySpec skeySpec = new SecretKeySpec(secretKey.getBytes(), "AES");
			IvParameterSpec ivSpec = new IvParameterSpec(secretIv.getBytes());

			/*
			 * AES/ECB/NoPadding
			 * AES/ECB/PKCS5Padding
			 * RSA/ECB/PKCS1Padding
			 * RSA/ECB/NoPadding
			 * 
			 * AES/CBC/NoPadding
			 * AES/CBC/PKCS5Padding
			 * AES/CTR/NoPadding
			 * AES/GCM/NoPadding
			 * 
			 * AES/CFB128/NoPadding
			 * AES/CFB128/PKCS5Padding
			 * 
			 */
			String algo = "AES/CFB128/NoPadding";
			Cipher cipher = Cipher.getInstance(algo);
			cipher.init(isEcnrypt ? Cipher.ENCRYPT_MODE : Cipher.DECRYPT_MODE, skeySpec, ivSpec);
			return cipher;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
}