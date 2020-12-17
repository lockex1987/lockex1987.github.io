package common.util;

import org.junit.Assert;
import org.junit.Test;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class EncryptUtilTests {

	@Test
	public void encryptPasswordTest() {
		String hash = "35454B055CC325EA1AF2126E27707052";
		String plain = "ILoveJava";
		Assert.assertEquals(hash, EncryptUtil.encryptPassword(plain, ""));
	}
	
	@Test
	public void encryptPasswordTest2() {
		String plainPassword = "123456";
		String salt = "xxx";
		String hashPassword = EncryptUtil.encryptPassword(plainPassword, salt);
		log.info(hashPassword);
	}
}
