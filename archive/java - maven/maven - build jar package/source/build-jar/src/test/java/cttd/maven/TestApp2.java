package cttd.maven;

import org.junit.Assert;
import org.junit.Test;

public class TestApp2 {

	@Test
	public void testPrintHelloWorld2() {
		Assert.assertEquals("Hello World 2", App.getHelloWorld2());
	}
}
