package flyingsaucer.demo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import org.xhtmlrenderer.pdf.ITextRenderer;

public class ConvertFromFile {
	
	public static void convert(String fileName) throws Exception {
		String output = "output/" + fileName + ".pdf";
		try (OutputStream os = new FileOutputStream(new File(output))) {
			ITextRenderer renderer = new ITextRenderer();
			File file = new File("input/" + fileName + ".html");
			renderer.setDocument(file);
			renderer.layout();
			renderer.createPDF(os);
			renderer.finishPDF();
		}
	}
}
