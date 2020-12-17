package cttd.cryptography.demo;

import org.junit.Test;
import static org.junit.Assert.*;

public class AesTests {

	private String plaintext = "Nguyễn Anh Tuấn";
	private String ciphertext = "YlBfisYuEUlt/JBGQYWaMa7EKg==";

	@Test
	public void encryptTest() {
		assertEquals(ciphertext, Aes.encrypt(plaintext));
	}

	@Test
	public void decryptTest() {
		assertEquals(plaintext, Aes.decrypt(ciphertext));
	}
}