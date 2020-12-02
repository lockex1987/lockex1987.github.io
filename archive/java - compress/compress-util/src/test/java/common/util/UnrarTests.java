package common.util;

import static org.junit.Assert.assertEquals;

import java.io.File;

import org.junit.Test;

import common.util.Unrar;

public class UnrarTests {

	@Test
	public void testUnrar() {
		String archive = "output.rar";
		String destination = "target/";
		Unrar.extract(archive, destination);

		File file = new File("target/output/05120704_GS J Curie Temperature Elementaire Irene-2016.xls");
		assertEquals(true, file.exists());
	}
}
