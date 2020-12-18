package flyingsaucer.demo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import org.xhtmlrenderer.pdf.ITextFontResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.itextpdf.text.pdf.BaseFont;

public class Demo04Unicode {

	public static void main(String[] args) throws Exception {
		String fileName = "demo_04_unicode";
		String output = "output/" + fileName + ".pdf";
		try (OutputStream os = new FileOutputStream(new File(output))) {
			ITextRenderer renderer = new ITextRenderer();

			String fontPath = CommonUtils.getAbsolutePathByClassLoader("fonts/times.ttf");
			ITextFontResolver resolver = renderer.getFontResolver();
			resolver.addFont(fontPath, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);

			File file = new File("input/" + fileName + ".html");
			renderer.setDocument(file);

			renderer.layout();
			renderer.createPDF(os);
			renderer.finishPDF();
		}
	}
}
