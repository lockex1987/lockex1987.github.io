package common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.poi.xwpf.converter.pdf.PdfConverter;
import org.apache.poi.xwpf.converter.pdf.PdfOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

public class Docx2PdfConverter {

	public static void convertDocxToPdf(String templatePath, String outputPath) {
		try {
			InputStream is = new FileInputStream(new File(templatePath));
			OutputStream os = new FileOutputStream(new File(outputPath));
			convertDocxToPdf(is, os);
		} catch (FileNotFoundException ex) {
			ex.printStackTrace();
		}
	}

	public static void convertDocxToPdf(InputStream is, OutputStream os) {
		try {
			// Load DOCX into XWPFDocument
			XWPFDocument document = new XWPFDocument(is);

			// Prepare PDF options
			// Dang khong giu duoc font
			PdfOptions options = PdfOptions.create();

			// Convert XWPFDocument to PDF
			PdfConverter.getInstance().convert(document, os, options);
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}
