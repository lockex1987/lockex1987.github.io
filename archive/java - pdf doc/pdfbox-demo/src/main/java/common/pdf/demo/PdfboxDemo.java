package common.pdf.demo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;

import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.text.PDFTextStripper;

import be.quodlibet.boxable.BaseTable;
import be.quodlibet.boxable.datatable.DataTable;

/**
 * Đọc template và ghi ra file DOC, PDF
 */
public class PdfboxDemo {

	public static void main(String[] args) {
		testExtractText();

		// createDocument(filePath, "PDF is cool");

		// Optional<Integer> noOfPages = getNumberOfPages(filePath);
		// if (noOfPages.isPresent()) {
		// System.out.println("Total number of pages: " + noOfPages.get());
		// }

		// ------------

		// String csvData = "1,Hari Krishna,Gurram\n" + "2,Kiran Kumar,Darsi\n"
		// + "3,Rama Krishna,Gurram\n"
		// + "4,Gopi,Battu\n" + "5,Sudheer,Ganji";
		// createPdfFromCsv(csvData, false, ',', filePath);

		// List<List> data = new ArrayList<>();
		// data.add(Arrays.asList("Employee Id", "First Name", "LastName"));
		// for (int i = 1; i <= 100; i++) {
		// data.add(Arrays.asList(i, "First Name " + i, "Last Name " + i));
		// }
		// createPdfFromList(data, true, filePath);

		System.out.println("Finish");
	}

	private static void testExtractText() {
		String filePath = CommonUtils.getAbsolutePathByClassLoader("unicode.pdf");
		String text = extractText(filePath);
		System.out.println(text);
	}

	private static boolean createDocument(String filePath, String message) throws Exception {
		try (PDDocument document = new PDDocument()) {
			PDPage page = new PDPage();
			document.addPage(page);

			try (PDPageContentStream contentStream = new PDPageContentStream(document, page);) {
				contentStream.beginText();
				contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
				// contentStream.newLineAtOffset(200, 700);
				// contentStream.showText(message);
				// contentStream.endText();
			}

			document.save(filePath);
			return true;
		} catch (IOException ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public static Optional<Integer> getNumberOfPages(String filePath) {
		try (final PDDocument document = PDDocument.load(new File(filePath))) {
			return Optional.of(document.getNumberOfPages());
		} catch (IOException ex) {
			ex.printStackTrace();
			return Optional.empty();
		}
	}

	private static String extractText(String filePath) {
		try (final PDDocument document = PDDocument.load(new File(filePath))) {
			//System.out.println("Number of pages: " + document.getNumberOfPages());

			// "CP-1252"
			// cp1252
			// "UTF-8"
			// "windows-1252"
			PDFTextStripper stripper = new PDFTextStripper();
			stripper.setLineSeparator("\n");
			stripper.setAddMoreFormatting(true);
			stripper.setStartPage(2);
			stripper.setEndPage(5);

			String encode = stripper.getText(document);
//			byte[] bytes = encode.getBytes(); //"cp1252"
//			String decode = new String(bytes, "UTF-8");
			
			return encode;
			
		} catch (IOException ex) {
			ex.printStackTrace();
			return null;
		}
	}

	/**
	 * Here is a simple program to extract phone numbers from a PDF file. We
	 * assume here that the phone numbers are 10 digits long.
	 */
	private static void extractPhoneNumber(String filePath) {
		try (PDDocument document = PDDocument.load(new File(filePath))) {
			PDFTextStripper stripper = new PDFTextStripper();
			String sb = stripper.getText(document);

			// Regex. For those who do not know. The Pattern refers to the
			// format you are looking for.
			// In our example, we are looking for numbers with 10 digits with
			// atleast one surrounding whitespaces
			// on both ends.
			Pattern p = Pattern.compile("\\s\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\s");
			// Matcher refers to the actual text where the pattern will be found
			Matcher m = p.matcher(sb);
			while (m.find()) {
				// group() method refers to the next number that follows the
				// pattern we have specified.
				System.out.println(m.group());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static boolean createPdfFromCsv(String csvData, boolean hasHeader, char separator, String filePath)
			throws Exception {
		try (PDDocument document = new PDDocument()) {
			PDPage page = new PDPage();
			// page.setMediaBox(new PDRectangle(PDRectangle.A4.getHeight(),
			// PDRectangle.A4.getWidth()));
			document.addPage(page);

			// Initialize DataTable
			float margin = 10;
			float tableWidth = page.getMediaBox().getWidth() - (2 * margin);
			float yStartNewPage = page.getMediaBox().getHeight() - (2 * margin);
			float yStart = yStartNewPage;
			float bottomMargin = 20;

			BaseTable baseTable = new BaseTable(yStart, yStartNewPage, bottomMargin, tableWidth, margin, document, page,
					true, true);
			DataTable dataTable = new DataTable(baseTable, page);

			// Add CSV data to table
			dataTable.addCsvToTable(csvData, hasHeader, separator);
			baseTable.draw();

			document.save(filePath);
			return true;
		} catch (IOException ex) {
			ex.printStackTrace();
			return false;
		}
	}

	private static boolean createPdfFromList(List<List> data, boolean hasHeader, String filePath)
			throws Exception {
		try (PDDocument document = new PDDocument()) {
			PDPage page = new PDPage();
			// page.setMediaBox(new PDRectangle(PDRectangle.A4.getHeight(),
			// PDRectangle.A4.getWidth()));
			document.addPage(page);

			// Initialize DataTable
			float margin = 10;
			float tableWidth = page.getMediaBox().getWidth() - (2 * margin);
			float yStartNewPage = page.getMediaBox().getHeight() - (2 * margin);
			float yStart = yStartNewPage;
			float bottomMargin = 0;

			BaseTable baseTable = new BaseTable(yStart, yStartNewPage, bottomMargin, tableWidth, margin, document, page,
					true, true);
			DataTable dataTable = new DataTable(baseTable, page);

			// Add list to table
			dataTable.addListToTable(data, hasHeader);
			baseTable.draw();

			document.save(filePath);
			return true;
		} catch (IOException ex) {
			ex.printStackTrace();
			return false;
		}
	}
}
