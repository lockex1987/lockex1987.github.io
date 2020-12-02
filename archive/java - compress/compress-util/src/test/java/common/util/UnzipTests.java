package common.util;

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

import org.junit.Ignore;
import org.junit.Test;

public class UnzipTests {

	@Test
	public void testReadingDocx() {
		String archive = "template.docx";
		UnzipOperator op = (ze, is) -> {
			System.out.println("Read " + ze.getName());
			System.out.println("----------------------------------------------");
			if (ze.getSize() > 0) {
				try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
					String line;
					while ((line = br.readLine()) != null) {
						System.out.println(line);
					}
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
		};
		Unzip.unzip(archive, op);
	}

	@Test
	public void testExtract() {
		String archive = "template.docx";
		String destination = "target/";

		Unzip.extract(archive, destination);

		File file = new File("target/word/document.xml");
		assertEquals(true, file.exists());
	}
}
