package common.util;

import static org.junit.Assert.*;

import java.util.List;
import java.util.Locale;

import org.junit.Ignore;
import org.junit.Test;

import common.bean.ImportResult;

public class ImportExcelTests {

	private static final Locale locale = new Locale("vi", "VN");

	@Ignore
	@Test
	public void testFileNotFound() {
		String filePath = "/data/abc";
		ImportExcel importExcel = new ImportExcel(locale, 0, 2);
		ImportResult importResult = importExcel.validateCommon(filePath);
		assertEquals(ImportResult.FILE_NOT_FOUND_ERROR, importResult.getReturnCode());
		System.out.println(importResult.getMessage());
	}

	@Ignore
	@Test
	public void testInvalidFormat() {
		String filePath = CommonUtils.getAbsolutePathByClassLoader("log4j.xml");
		ImportExcel importExcel = new ImportExcel(locale, 0, 2);
		ImportResult importResult = importExcel.validateCommon(filePath);
		assertEquals(ImportResult.FORMAT_ERROR, importResult.getReturnCode());
		System.out.println(importResult.getMessage());
	}

	@Ignore
	@Test
	public void testInvalidFirstDataRow() {
		String filePath = CommonUtils.getAbsolutePathByClassLoader("input.xls");
		ImportExcel importExcel = new ImportExcel(locale, 100, 2);
		ImportResult importResult = importExcel.validateCommon(filePath);
		assertEquals(ImportResult.FIRST_DATA_ROW_ERROR, importResult.getReturnCode());
		System.out.println(importResult.getMessage());
	}

	@Test
	public void testReadData() {
		String filePath = CommonUtils.getAbsolutePathByClassLoader("input.xls");
		ImportExcel importExcel = new ImportExcel(locale, 1, 2);
		ImportResult importResult = importExcel.validateCommon(filePath);
		assertEquals(ImportResult.NO_ERROR, importResult.getReturnCode());
		List<Object[]> dataList = importResult.getDataList();
		for (Object[] a : dataList) {
			for (Object obj : a) {
				System.out.println(obj);
			}
			System.out.println("------------------");
		}
	}
}
