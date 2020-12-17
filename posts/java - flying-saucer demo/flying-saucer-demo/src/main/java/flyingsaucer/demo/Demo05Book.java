package flyingsaucer.demo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import org.xhtmlrenderer.pdf.ITextFontResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.itextpdf.text.pdf.BaseFont;

public class Demo05Book {

	public static void main(String[] args) throws Exception {
		String output = "output/demo_05_book.pdf";
		try (OutputStream os = new FileOutputStream(new File(output))) {
			ITextRenderer renderer = new ITextRenderer();

			buildBook(renderer);

			renderer.layout();
			renderer.createPDF(os);
			renderer.finishPDF();
		}
	}

	private static void buildBook(ITextRenderer renderer) throws Exception {
		// Thêm font để không bị lỗi hiển thị ký tự tiếng Việt
		String fontPath = CommonUtils.getAbsolutePathByClassLoader("fonts/times.ttf");
		ITextFontResolver resolver = renderer.getFontResolver();
		resolver.addFont(fontPath, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);

		// Đọc từ file
		// Header, footer, TOC, cover page ở trong file hết
		File file = new File("input/demo_05_book.html");
		renderer.setDocument(file);
	}
}
