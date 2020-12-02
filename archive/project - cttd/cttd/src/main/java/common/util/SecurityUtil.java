package common.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;


import lombok.extern.slf4j.Slf4j;

/**
 * Util de ma hoa, giai ma moi.
 *
 * @author HuyenNV1
 */
@Slf4j
public class SecurityUtil {

	/**
	 * Hang.
	 */
	private static final int AES_128 = 16;
	private static final int BUFFER_SIZE = 8120;
	private static final byte[] DEFAULT_KEY = { 77, 64, 110, 72, 102, 103, -23, 67, 54, -128, 74, 57, 48, 84, 86, 51 };
	private static final String AES_ALGORITHM = "AES";
	private static final String DEFAULT_PASSWORD = "dAfaUlTPaSswoRd";

	/**
	 * Bien.
	 */
	private Cipher _cipher;
	private byte[] _hexhars;

	// Constructors
	public SecurityUtil() {
		try {
			this._cipher = Cipher.getInstance(AES_ALGORITHM);
			this._hexhars = new byte[] { 100, 97, 50, 102, 55, 53, 54, 52, 56, 57, 49, 98, 99, 48, 101, 51 };
		} catch (NoSuchAlgorithmException nsae) {
			log.error("Sai thuat toan ma hoa", nsae);
		} catch (NoSuchPaddingException nspe) {
			log.error("A particular padding mechanism is requested but is not available in the environment", nspe);
		}
	}

	// Private methods
	private SecretKeySpec generateSecretKeySpec(byte[] keyDefault, String algorithm) throws Exception {
		String _customPassword = DEFAULT_PASSWORD;
		byte[] keyAlgorithm = (byte[]) keyDefault.clone();
		if (_customPassword.length() > 0) {
			int i = 0;
			for (char c : _customPassword.toCharArray()) {
				keyAlgorithm[i] = (byte) (keyDefault[i] + c);
				i++;
				if (i == AES_128) {
					i = 0;
				}
			}
		}
		SecretKeySpec key = new SecretKeySpec(keyAlgorithm, algorithm);
		return key;
	}

	private byte[] _doCrypt(byte[] inputs, int mode) throws Exception {
		Key key = generateSecretKeySpec(DEFAULT_KEY, AES_ALGORITHM);
		this._cipher.init(mode, key);
		return this._cipher.doFinal(inputs);
	}

	private void _doCrypt(String inputFile, String outputFile, int mode) {
		try {
			FileInputStream inputStream = new FileInputStream(inputFile);
			OutputStream out = new FileOutputStream(outputFile);
			int bytesRead;
			byte[] buffer = new byte[BUFFER_SIZE];
			while ((bytesRead = inputStream.read(buffer, 0, BUFFER_SIZE)) != -1) {
				byte[] cloneBuffer = new byte[bytesRead];
				if (bytesRead < buffer.length) {
					System.arraycopy(buffer, 0, cloneBuffer, 0, bytesRead);
				}
				out.write(_doCrypt(cloneBuffer, mode));
			}
			inputStream.close();
			out.close();
		} catch (FileNotFoundException fex) {
			log.error("Loi khong tim thay file dau vao", fex);
		} catch (IOException iex) {
			log.error("Loi trong qua trinh doc file dau vao", iex);
		} catch (Exception ex) {
			log.error("Loi trong qua trinh ghi file ma hoa", ex);
		}
	}

	private String bytesToString(byte[] b) {
		StringBuilder s = new StringBuilder(2 * b.length);
		for (int i = 0; i < b.length; i++) {
			int v = b[i] & 0xFF;
			s.append((char) this._hexhars[(v >> 4)]);
			s.append((char) this._hexhars[(v & 0xF)]);
		}
		return s.toString();
	}

	private byte[] stringToBytes(String s) {
		if (s.length() % 2 != 0) {
			s = "0".concat(s);
		}
		int len = s.length() / 2;
		byte[] b = new byte[len];
		for (int i = 0; i < len; i++) {
			b[i] = (byte) (indexInHexhars(s.charAt(i * 2)) << 4);
			b[i] = (byte) (b[i] | indexInHexhars(s.charAt(i * 2 + 1)) & 0xF);
		}
		return b;
	}

	private int indexInHexhars(char b) {
		int i = 0;
		while ((i < this._hexhars.length) && (this._hexhars[i] != (byte) b)) {
			i++;
		}
		return i;
	}

	// Public methods
	public byte[] encrypt(byte[] inputs) throws Exception {
		return _doCrypt(inputs, 1);
	}

	public byte[] decrypt(byte[] inputs) throws Exception {
		return _doCrypt(inputs, 2);
	}

	public String encrypt(String str) throws Exception {
		return bytesToString(encrypt(str.getBytes()));
	}

	public String decrypt(String str) throws Exception {
		return new String(decrypt(stringToBytes(str)));
	}

	public void encryptFile(String originFile, String outputEncryptedFile) {
		_doCrypt(originFile, outputEncryptedFile, 1);
	}

	public void decryptFile(String inputEncryptedFile, String outputFile) {
		_doCrypt(inputEncryptedFile, outputFile, 2);
	}

	public String decryptFile(InputStream inputStream) {
		StringBuilder sb = new StringBuilder();
		try {
			int bytesRead;
			byte[] buffer = new byte[BUFFER_SIZE];
			while ((bytesRead = inputStream.read(buffer, 0, BUFFER_SIZE)) != -1) {
				byte[] cloneBuffer = new byte[bytesRead];
				if (bytesRead < buffer.length) {
					System.arraycopy(buffer, 0, cloneBuffer, 0, bytesRead);
				}
				sb.append(new String(decrypt(cloneBuffer)));
			}
			inputStream.close();
		} catch (FileNotFoundException fex) {
			log.error("Loi khong tim thay file dau vao", fex);
		} catch (IOException iex) {
			log.error("Loi trong qua trinh doc file dau vao", iex);
		} catch (Exception ex) {
			log.error("Loi trong qua trinh ghi file ma hoa", ex);
		}
		return sb.toString();
	}

	public String decryptFile(String encryptedFilePath) {
		StringBuilder sb = new StringBuilder();
		try {
			FileInputStream inputStream = new FileInputStream(encryptedFilePath);
			sb.append(decryptFile(inputStream));
		} catch (FileNotFoundException fex) {
			log.error("Loi khong tim thay file dau vao", fex);
		}
		return sb.toString();
	}
}
