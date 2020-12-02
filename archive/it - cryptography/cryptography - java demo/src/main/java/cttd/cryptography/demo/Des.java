package cttd.cryptography.demo;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import cttd.cryptography.util.CommonUtils;

public class Des {
	
	public static String encrypt(String plaintext) {
		try {
			Cipher cipher = initCipher(true);
			byte[] byteEncrypted = cipher.doFinal(plaintext.getBytes());
			String ciphertext = CommonUtils.convertBytesToBase64Text(byteEncrypted);
			return ciphertext;
		} catch (IllegalBlockSizeException | BadPaddingException ex) {
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
		} catch (IllegalBlockSizeException | BadPaddingException ex) {
			return null;
		}
	}

	private static Cipher initCipher(boolean isEcnrypt) {
		try {
			SecretKeySpec skeySpec = getSecretKey();
			Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5PADDING");
			cipher.init(isEcnrypt ? Cipher.ENCRYPT_MODE : Cipher.DECRYPT_MODE, skeySpec);
			return cipher;
		} catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException ex) {
			return null;
		}
	}
	
	private static SecretKeySpec getSecretKey() {
		String SECRET_KEY = "12345678";
		SecretKeySpec skeySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "DES");
		return skeySpec;
	}
}