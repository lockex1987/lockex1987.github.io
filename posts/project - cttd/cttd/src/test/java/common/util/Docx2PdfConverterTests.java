package common.util;

import org.junit.Test;

public class Docx2PdfConverterTests {

	@Test
	public void testCreatePdf() {
		test();
		test();
	}

	private static void test() {
		long start = System.currentTimeMillis();
		String templatePath = TestConstants.TEMPLATE_PATH;
		String outputPath = "converted.pdf";
		Docx2PdfConverter.convertDocxToPdf(templatePath, outputPath);
		System.out.println("Generate pdf with " + (System.currentTimeMillis() - start) + "ms");
	}
}
