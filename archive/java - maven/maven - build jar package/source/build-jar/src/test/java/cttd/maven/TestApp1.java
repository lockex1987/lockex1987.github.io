package cttd.maven;

import org.junit.Assert;
import org.junit.Test;

public class TestApp1 {

	@Test
	public void testPrintHelloWorld() {
		Assert.assertEquals("Hello World", App.getHelloWorld());
	}
}
