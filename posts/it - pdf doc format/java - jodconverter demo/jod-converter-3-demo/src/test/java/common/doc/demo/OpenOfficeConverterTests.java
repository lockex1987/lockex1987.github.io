package common.doc.demo;

import java.io.File;

import org.junit.Test;

public class OpenOfficeConverterTests {

	@Test
	public void convertTest() throws Exception {
		OpenOfficeConverter.startService();

		testDocToHtmlAndPdf();
		testImageAndUnicode();

		OpenOfficeConverter.stopService();
	}

	/**
	 * Convert từ file nguồn là DOC (hoặc DOCX), sau đó chuyển sang HTML, rồi từ
	 * HTML lại sang PDF.
	 */
	private void testDocToHtmlAndPdf() {
		File doc2003File = new File("input/sample-2003.doc");
		File doc2007File = new File("input/sample-2007.docx");

		File html2003File = new File("output/sample-2003.html");
		File html2007File = new File("output/sample-2007.html");

		File pdf2003File = new File("output/sample-2003.pdf");
		File pdf2007File = new File("output/sample-2007.pdf");

		OpenOfficeConverter.convert(doc2003File, html2003File);
		OpenOfficeConverter.convert(html2003File, pdf2003File);

		OpenOfficeConverter.convert(doc2007File, html2007File);
		OpenOfficeConverter.convert(html2007File, pdf2007File);
	}

	/**
	 * Convert từ DOC hoặc DOCX sang HTML. File nguồn có chứa ký tự tiếng Việt và
	 * chứa ảnh.
	 */
	private void testImageAndUnicode() {
		File doc2003File = new File("input/unicode-and-image-2003.doc");
		File doc2007File = new File("input/unicode-and-image-2007.docx");

		File html2003File = new File("output/unicode-2003.html");
		File html2007File = new File("output/unicode-2007.html");

		OpenOfficeConverter.convert(doc2003File, html2003File);
		OpenOfficeConverter.convert(doc2007File, html2007File);
	}
}
