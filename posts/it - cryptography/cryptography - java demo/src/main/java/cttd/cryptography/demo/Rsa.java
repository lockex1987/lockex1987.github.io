package cttd.cryptography.demo;

import java.io.File;
import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;

import cttd.cryptography.util.CommonUtils;

public class Rsa {

	public static void generate(int keylength, String publicKeyFile, String privateKeyFile) {
		try {
			KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
			keyGen.initialize(keylength);

			KeyPair pair = keyGen.generateKeyPair();
			PrivateKey privateKey = pair.getPrivate();
			PublicKey publicKey = pair.getPublic();

			CommonUtils.writeToFile(publicKeyFile, publicKey.getEncoded());
			CommonUtils.writeToFile(privateKeyFile, privateKey.getEncoded());
		} catch (NoSuchAlgorithmException ex) {
			ex.printStackTrace();
		}
	}

	public static PrivateKey getPrivateKey(String privateKeyFile) {
		try {
			byte[] keyBytes = Files.readAllBytes(new File(privateKeyFile).toPath());
			PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
			KeyFactory kf = KeyFactory.getInstance("RSA");
			return kf.generatePrivate(spec);
		} catch (Exception ex) {
			return null;
		}
	}

	public static PublicKey getPublicKey(String privateKeyFile) {
		try {
			byte[] keyBytes = Files.readAllBytes(new File(privateKeyFile).toPath());
			X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
			KeyFactory kf = KeyFactory.getInstance("RSA");
			return kf.generatePublic(spec);
		} catch (Exception ex) {
			return null;
		}
	}

	public static String encrypt(String plaintext, PublicKey publicKey) {
		try {
			byte[] byteOriginal = CommonUtils.convertStringToBytes(plaintext);

			Cipher cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			byte[] byteEncrypted = cipher.doFinal(byteOriginal);
			
			String ciphertext = CommonUtils.convertBytesToBase64Text(byteEncrypted);
			return ciphertext;
		} catch (Exception ex) {
			return null;
		}
	}

	public static String decrypt(String ciphertext, PrivateKey privateKey) {
		try {
			byte[] byteEncrypted = CommonUtils.convertBase64TextToBytes(ciphertext);
			
			Cipher cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			byte[] byteDecrypted = cipher.doFinal(byteEncrypted);

			String decrypted = CommonUtils.convertBytesToString(byteDecrypted);
			return decrypted;
		} catch (Exception ex) {
			return null;
		}
	}

	public static byte[] sign(byte[] originalData, PrivateKey privateKey) {
		try {
			Signature rsa = Signature.getInstance("SHA1withRSA");
			rsa.initSign(privateKey);
			rsa.update(originalData);
			return rsa.sign();
		} catch (Exception ex) {
			return null;
		}
	}

	public static boolean verify(byte[] originalData, byte[] signature, PublicKey publicKey) throws Exception {
		Signature rsa = Signature.getInstance("SHA1withRSA");
		rsa.initVerify(publicKey);
		rsa.update(originalData);
		return rsa.verify(signature);
	}
}
