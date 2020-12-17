package cttd.cryptography.demo;

import org.junit.Test;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class BcryptHashingTests {

	@Test
	public void hashTest() {
		log.debug(BcryptHashing.hash("123456a@"));
	}
	
	@Test
	public void checkTest() {
		String candidate = "123456a@";
		String hashed = "$2y$10$bTvm6wAADzfptlHuufxbDuF9QJMtX0W9ly.kb.FpottRB0tp5xeDu";
		log.debug("Check: " + BcryptHashing.check(candidate, hashed));
	}
}
