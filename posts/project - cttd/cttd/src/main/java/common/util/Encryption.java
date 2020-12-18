/*
 * NVH
 */
package common.util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

/**
 * Ma hoa file.
 *
 * @author HuyenNV
 */
public class Encryption {

	private final static byte KEYS[] = { -95, -29, -62, 25, 25, -83, -18, -85 };
	private final static String ALGORITHM = "DES";
	private final static SecretKeySpec SECRET_KEY_SPEC = new SecretKeySpec(KEYS, ALGORITHM);

	private static byte[] encrypt(byte arrByte[]) throws Exception {
		Cipher cipher = Cipher.getInstance(ALGORITHM);
		cipher.init(1, SECRET_KEY_SPEC);
		return cipher.doFinal(arrByte);
	}

	private static byte[] decrypt(byte arrByte[]) throws Exception {
		Cipher cipher = Cipher.getInstance(ALGORITHM);
		cipher.init(2, SECRET_KEY_SPEC);
		return cipher.doFinal(arrByte);
	}

	/**
	 * Ma hoa file.
	 *
	 * @param originalFilePath
	 *          File goc
	 * @param encryptedFilePath
	 *          File da duoc ma hoa
	 * @throws Exception
	 */
	public static void encryptFile(String originalFilePath, String encryptedFilePath) throws Exception {
		FileInputStream stream = new FileInputStream(originalFilePath);
		OutputStream out = new FileOutputStream(encryptedFilePath);
		int bytesRead;
		byte buffer[] = new byte[8192];
		byte cloneBuffer[];
		for (; (bytesRead = stream.read(buffer, 0, 8192)) != -1; out.write(encrypt(cloneBuffer))) {
			cloneBuffer = new byte[bytesRead];
			if (bytesRead >= buffer.length) {
				continue;
			}
			System.arraycopy(buffer, 0, cloneBuffer, 0, bytesRead);
		}
		stream.close();
		out.close();
	}

	/**
	 * Giai ma file.
	 *
	 * @param encryptedFilePath
	 *          File da ma hoa
	 * @return Xau da duoc giai ma
	 * @throws Exception
	 */
	public static String decryptFile(String encryptedFilePath) throws Exception {
		String returnValue = "";
		FileInputStream stream = new FileInputStream(encryptedFilePath);
		int bytesRead;
		byte buffer[] = new byte[8192];
		byte cloneBuffer[];
		for (; (bytesRead = stream.read(buffer, 0, 8192)) != -1; returnValue = (new StringBuilder()).append(returnValue)
				.append(new String(decrypt(cloneBuffer))).toString()) {
			cloneBuffer = new byte[bytesRead];
			if (bytesRead >= buffer.length) {
				continue;
			}
			System.arraycopy(buffer, 0, cloneBuffer, 0, bytesRead);
		}
		stream.close();
		return returnValue;
	}
}
