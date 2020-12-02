package flyingsaucer.demo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import org.xhtmlrenderer.pdf.ITextRenderer;

public class Demo01HelloWorld {

	public static void main(String[] args) throws Exception {
		generate("output/demo_01_from_xhtml_text.pdf", 1);
		generate("output/demo_01_from_file.pdf", 2);
	}

	private static void generate(String output, int type) throws Exception {
		OutputStream os = new FileOutputStream(new File(output));
		ITextRenderer renderer = new ITextRenderer();
		if (type == 1) {
			renderFromXhtmlText(renderer);
		} else if (type == 2) {
			renderFromFile(renderer);
		}
		renderer.layout();
		renderer.createPDF(os);
		renderer.finishPDF();
		os.close();
	}

	private static void renderFromXhtmlText(ITextRenderer renderer) {
		String htmlSource = "<html>"
				+ "<body>"
				+ "<h1>Hello World</h1>"
				+ "<p>The source must be XHTML.</p>"
				+ "<p>Must have a root element (body or html)</p>"
				+ "</body>"
				+ "</html>";
		renderer.setDocumentFromString(htmlSource);
	}

	private static void renderFromFile(ITextRenderer renderer) throws Exception {
		File file = new File("input/demo_01_simple_file.html");
		renderer.setDocument(file);
	}
}
