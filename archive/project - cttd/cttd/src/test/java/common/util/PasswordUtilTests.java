package common.util;

import org.junit.Ignore;
import org.junit.Test;

import common.util.PasswordUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PasswordUtilTests {

	@Ignore
	@Test
	public void encryptPasswordTest() {
		String plainPassword = "abc123a@";
		String salt = "vfqkce8qvc";
		String hashedPassword = PasswordUtil.encryptPassword(plainPassword, salt);
		log.debug(hashedPassword);
	}
}
