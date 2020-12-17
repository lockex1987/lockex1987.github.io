package cttd.cryptography.demo;

import org.junit.Ignore;
import org.junit.Test;

import cttd.cryptography.util.CommonUtils;
import lombok.extern.slf4j.Slf4j;

import static org.junit.Assert.*;

import java.io.File;
import java.security.PrivateKey;
import java.security.PublicKey;

@Slf4j
public class RsaTests {

	private String publicKeyFile = "data/publicKey";
	private String privateKeyFile = "data/privateKey";
	private String signedDataFile = "data/signedData.txt";
	private byte[] originalData = CommonUtils.convertStringToBytes("lockex1987");

	//@Ignore
	@Test
	public void generateTest() {
		int keylength = 2048;
		Rsa.generate(keylength, publicKeyFile, privateKeyFile);
	}

	//@Ignore
	@Test
	public void encryptAndDecryptTest() {
		String plaintext = "stackjava.com";

		PublicKey publicKey = Rsa.getPublicKey(publicKeyFile);

//		String ciphertext = RsaCipher.encrypt(plaintext, publicKey);
//		log.debug(ciphertext);

		// String ciphertext =
		// "ZXnjc4HRg306gLAzp9YFM0ZUNeN4O7dSG1NU7JMSbqhXJOI9mRB8t0XS+P9uoTZxlvTcwKUHey23F/oIVUdUIw5LrGHJ5IwYP5kY6aES4UDbmqbKcrE2R8eiuyaaWBcY4aSC5g6irbSU/iT0zGHjKaeaFSzRpPNjIUh3M6k+KJwr3lrqe80VudnVB1or2UaMUFwNr/OeRGQfbcrmkjkTq8V+mDkEUrgDtvXEeZGjreUh9FxX6B1W+dfCfVEKNu6m4cBYED8Crrejm/C7bjFsU8191cJ200PieTeFQ4+qhFsmaXhGF6p4da8xNjf7DKPmwoLFvX2tgAQEMqGYgrvHqw==";
		String ciphertext = "ab6JNCvheKRKnTK4oTZ1PFJaqOeU2j2AvGAXYf7axOD6UyQB7V6LOkkm9JmlRtWVPIlbXuYaNJq30APx8R5qU/iWSmmPL6Wyxwa8tVelQnqfbFoyJScmDOR7Y2Dw74vhOukxN8Vs5ZJEX6CvEo6NJLn3InfoEI/hhLqLjVdy5JN847+0ZgZHjtE/IrBURkBv0KpdDLC3sV0hKYaq2fGlGyHzDWogce2XIPvGiQsv6QoWjoEGT7qIOQP7WeL6H2lprYY0D5RJlWJ+lNSLBG3OZCjpHObeWEO7HekkqBRUBB5kWjHzfVACvmjfECYkozn5f/rUAYO2Ht8xj0C2EpeEzg==";

		// assertEquals(ciphertext, RsaCipher.encrypt(plaintext, publicKey));

		PrivateKey privateKey = Rsa.getPrivateKey(privateKeyFile);
		assertEquals(plaintext, Rsa.decrypt(ciphertext, privateKey));
	}

	//@Ignore
	@Test
	public void signTest() {
		PrivateKey privateKey = Rsa.getPrivateKey(privateKeyFile);
		byte[] signature = Rsa.sign(originalData, privateKey);
		CommonUtils.writeToFile(signedDataFile, signature);
	}

	@Test
	public void verifyTest() {
		try {
			PublicKey publicKey = Rsa.getPublicKey(publicKeyFile);
			byte[] signature = CommonUtils.convertFileToBytes(new File(signedDataFile));
			log.debug("Verify: " + Rsa.verify(originalData, signature, publicKey));
		} catch (Exception ex) {
			log.error("Error when verify", ex);
		}
	}
}
