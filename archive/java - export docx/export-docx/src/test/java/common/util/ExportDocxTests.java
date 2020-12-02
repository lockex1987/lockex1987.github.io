package common.util;

import static org.junit.Assert.assertEquals;

import java.io.File;

import org.junit.Ignore;
import org.junit.Test;

import common.bean.DocTable;

public class ExportDocxTests {

	public static String TEMPLATE_PATH = "template.docx";
	
	@Test
	public void testExportDocx() {
		String templatePath = TEMPLATE_PATH;
		String outputPath = "unzip.docx";

		ExportDocx exportDocx = new ExportDocx(templatePath);
		exportDocx.setData("[MY_NAME]", "Nguyễn Văn Huyên");
		//exportDocx.setTableData(getTable());
		exportDocx.export(outputPath);

		File file = new File(outputPath);
		// System.out.println(file.getAbsolutePath());
		assertEquals(true, file.exists());
	}

	@Ignore
	@Test
	public void testExportPdf() {
		String outputPath = "converted-2.pdf";
		String templatePath = TEMPLATE_PATH;

		exportToPdf(templatePath, outputPath);
		exportToPdf(templatePath, outputPath);
		exportToPdf(templatePath, outputPath);

		File file = new File(outputPath);
		assertEquals(true, file.exists());
	}

	private void exportToPdf(String templatePath, String outputPath) {
		long start = System.currentTimeMillis();

		ExportDocx exportDocx = new ExportDocx(templatePath);
		exportDocx.setData("[MY_NAME]", "Nguyễn Văn Huyên");
		exportDocx.setTableData(getTable());
		exportDocx.exportPdf(outputPath);

		System.out.println("Generate pdf with " + (System.currentTimeMillis() - start) + "ms");
	}

	private DocTable getTable() {
		int rowNum = 3;
		int colNum = 2;
		DocTable table = new DocTable(rowNum, colNum);
		table.setHeaders(
				"[PUPIL]",
				"[POINT]");
		for (int row = 0; row < rowNum; row++) {
			table.setRowValues(row,
					"Nguyễn Văn A" + row,
					"Mark " + row);
		}
		return table;
	}
}
