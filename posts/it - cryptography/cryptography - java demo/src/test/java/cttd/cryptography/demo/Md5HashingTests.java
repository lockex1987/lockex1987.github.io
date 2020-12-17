package cttd.cryptography.demo;

import org.junit.Test;

import lombok.extern.slf4j.Slf4j;


@Slf4j
public class Md5HashingTests {

	@Test
	public void hashTest() {
		log.debug(Md5Hashing.hash("stackjava.com"));
		// Kết quả mong muốn: 29c4fdeeb3e62a969f69ad4601589fac
		// Kết quả thực tế:   29c4fdeeb3e62a969f69ad4601589fac
	}
}
