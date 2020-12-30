package common.util;

import static org.junit.Assert.*;

import java.io.File;


import org.junit.Assert;
import org.junit.Test;

public class CommonUtilsTests {

	@Test
	public void testGetAbsolutePath() {
		String path = "common-utils.txt";
		testGetAbsolutePathByClassLoader(path);
		testGetAbsolutePathByRelativePath(path);
	}
	
	private void testGetAbsolutePathByClassLoader(String path) {
		String absolutePath = CommonUtils.getAbsolutePathByClassLoader(path);
		System.out.println(absolutePath);
		File file = new File(absolutePath);
		assertEquals(true, file.exists());
	}
	
	private void testGetAbsolutePathByRelativePath(String path) {
		File file = new File(path);
		String absolutePath = file.getAbsolutePath();
		System.out.println("By relative path: " + absolutePath);
		assertEquals(false, file.exists());
	}
	
	@Test
	public void trimStringTest() {
		Assert.assertEquals("ctt   d", " ctt   d   ".trim());
		Assert.assertEquals("cttd", "\n\n\n cttd   \n\r".trim());
	}
}
