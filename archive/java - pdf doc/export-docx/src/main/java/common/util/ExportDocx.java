package common.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import common.bean.DocTable;

/**
 * Xuất file DOCX.
 * Đọc file template, export ra file đầu ra.
 */
public class ExportDocx {

	// File chứa nội dung văn bản
	private static final String MAIN_DOCUMENT_PATH = "word/document.xml";

	// Charset encoding of XML files
	private static final String CHARSET = "UTF-8";

	// Danh sách dữ liệu
	private Map<String, String> substData;

	// Đối tượng ZipFile
	// Cần đóng khi kết thúc
	private ZipFile zipFile;

	// Nội dung của fileNoi dung cua file
	private String fileContent;

	/**
	 * Khởi tạo.
	 * @param templatePath Đường dẫn file template
	 */
	public ExportDocx(String templatePath) {
		try {
			zipFile = new ZipFile(templatePath);
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		substData = new HashMap<>();
		fileContent = getFileContent();
	}

	/**
	 * Thiết lập dữ liệu.
	 * @param key Xâu ở file template
	 * @param value Giá trị thay thế
	 */
	public void setData(String key, String value) {
		substData.put(key, value);
	}

	/**
	 * Thiết lập dữ liệu bảng.
	 * Khong co du lieu thi phai xoa placeholder.
	 * 
	 * @param table
	 */
	public void setTableData(DocTable table) {
		// Get anchor
		String lastHeader = table.getLastHeader();
		int anchorIndex = fileContent.indexOf(lastHeader);

		// Get row
		int beginIndex = getBeginIndexOfAnchorRow(anchorIndex);
		int endIndex = getEndIndexOfAnchorRow(anchorIndex);
		String templateRowCode = fileContent.substring(beginIndex, endIndex);

		// Build new file content
		String beginText = fileContent.substring(0, beginIndex);
		String endText = fileContent.substring(endIndex);
		String tableContentInMiddle = buildTableContent(table, beginIndex, endIndex, templateRowCode);
		fileContent = beginText + tableContentInMiddle + endText;
	}

	/**
	 * Xuất file.
	 * @param outputPath Đường dẫn file đầu ra
	 */
	public void export(String outputPath) {
		try {
			FileOutputStream fos = new FileOutputStream(outputPath);
			export(fos);
		} catch (FileNotFoundException e) {
			System.out.println("File not found: " + outputPath);
		}
	}

	/**
	 * Xuất file
	 * @param os Dạng OutputStream để có thể làm các thao tác tiếp (ví dụ export PDF)
	 */
	public void export(OutputStream os) {
		try {
			ZipOutputStream zos = new ZipOutputStream(os);
			unzip(zos);
			zos.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	public void exportPdf(String outputPath) {
		try {
			FileOutputStream pdfOutput = new FileOutputStream(outputPath);
			exportPdf(pdfOutput);
		} catch (FileNotFoundException ex) {
			System.out.println("File not found: " + outputPath);
		}
	}

	public void exportPdf(OutputStream pdfOutput) {
		try {
			// Export the DOCX file to a byte array
			ByteArrayOutputStream docxOutput = new ByteArrayOutputStream();
			export(docxOutput);

			// This byte array is the input of the process that converts to PDF
			byte[] bytes = docxOutput.toByteArray();
			InputStream pdfInput = new ByteArrayInputStream(bytes);

			// Convert to PDF
			// Docx2PdfConverter.convertDocxToPdf(pdfInput, pdfOutput);

			pdfInput.close();
			pdfOutput.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * Đọc nội dung file DOCX.
	 * @return Nội dung file (XML)
	 */
	private String getFileContent() {
		try {
			ZipEntry ze = zipFile.getEntry(MAIN_DOCUMENT_PATH);
			InputStream is = zipFile.getInputStream(ze);
			byte[] bytes = readBytes(is);
			return new String(bytes, CHARSET);
		} catch (IOException ex) {
			ex.printStackTrace();
			return null;
		}
	}

	private void unzip(ZipOutputStream zos) {
		try {
			Enumeration<? extends ZipEntry> entries = zipFile.entries();
			while (entries.hasMoreElements()) {
				ZipEntry ze = (ZipEntry) entries.nextElement();
				InputStream is = zipFile.getInputStream(ze);
				read(ze, is, zos);
			}
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			try {
				zipFile.close();
			} catch (IOException ex) {
				// Do nothing
			}
		}
	}

	private void read(ZipEntry oldEntry, InputStream is, ZipOutputStream zos) {
		try {
			String file = oldEntry.getName();
			// System.out.println(file);
			ZipEntry newEntry = new ZipEntry(file);
			zos.putNextEntry(newEntry);

			if (!MAIN_DOCUMENT_PATH.equals(file)) {
				writeNormalFile(is, zos);
			} else {
				writeMainDocument(is, zos);
			}

			zos.closeEntry();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	private void writeNormalFile(InputStream is, OutputStream os) throws IOException {
		int count;
		byte[] buffer = new byte[1024];
		while ((count = is.read(buffer)) > 0) {
			os.write(buffer, 0, count);
		}
	}

	private void writeMainDocument(InputStream is, OutputStream os) throws IOException {
		Set<String> keySet = substData.keySet();
		for (String key : keySet) {
			fileContent = fileContent.replace(key, substData.get(key));
		}
		byte[] bytes = fileContent.getBytes(CHARSET);
		os.write(bytes);
	}

	private byte[] readBytes(InputStream is) throws IOException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int count;
		byte[] buffer = new byte[1024];
		while ((count = is.read(buffer)) > 0) {
			baos.write(buffer, 0, count);
		}
		return baos.toByteArray();
	}

	// Get start of row
	private int getBeginIndexOfAnchorRow(int anchorIndex) {
		String subString = fileContent.substring(0, anchorIndex);
		return subString.lastIndexOf("<w:tr>");
	}

	// Get end of row
	private int getEndIndexOfAnchorRow(int anchorIndex) {
		String endTag = "</w:tr>";
		return fileContent.indexOf(endTag, anchorIndex)
				+ endTag.length();
	}

	// Build table content
	private String buildTableContent(DocTable table, int beginIndex, int endIndex, String templateRowCode) {
		StringBuilder sb = new StringBuilder();
		int rowNum = table.getRowNum();
		int colNum = table.getColNum();
		for (int row = 0; row < rowNum; row++) {
			String newRowCode = templateRowCode;
			for (int col = 0; col < colNum; col++) {
				newRowCode = newRowCode.replace(table.getColName(col), table.getValue(row, col));
			}
			sb.append(newRowCode);
		}
		return sb.toString();
	}
}
