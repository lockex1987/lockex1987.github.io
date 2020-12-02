package cttd.cryptography.demo;

import org.junit.Test;
import static org.junit.Assert.*;

import lombok.extern.slf4j.Slf4j;


@Slf4j
public class ShaHashingTests {

	@Test
	public void hashTest() {
		String hashed = ShaHashing.hash("stackjava.com");
		log.debug(hashed);
		assertEquals("26a4fcc7fd8a79f0a4de18e7881760f39bdc9a9d", hashed);
		
		// Kết quả mong muốn: 26a4fcc7fd8a79f0a4de18e7881760f39bdc9a9d
		// Kết quả thực tế:   26a4fcc7fd8a79f0a4de18e7881760f39bdc9a9d
	}
}
