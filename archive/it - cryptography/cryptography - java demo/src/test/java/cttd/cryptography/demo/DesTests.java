package cttd.cryptography.demo;

import org.junit.Test;
import static org.junit.Assert.*;

public class DesTests {
	
	private String plaintext = "stackjava.com";
	private String ciphertext = "xvHjRlZOjIxmi+R3h4/gUw==";

	@Test
	public void encryptTest() {
		assertEquals(ciphertext, Des.encrypt(plaintext));
	}

	@Test
	public void decryptTest() {
		assertEquals(plaintext, Des.decrypt(ciphertext));
	}
}
