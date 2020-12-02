/*
 * NVH.
 */
package common.util;

import java.io.File;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

import common.bean.ImportConfig;
import common.bean.ImportError;
import common.bean.ImportResult;
import jxl.BooleanCell;
import jxl.Cell;
import jxl.CellType;
import jxl.DateCell;
import jxl.DateFormulaCell;
import jxl.LabelCell;
import jxl.NumberCell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.WorkbookSettings;
import lombok.extern.slf4j.Slf4j;

/**
 * Import tu file Excel.
 * Bỏ không sử dụng jxl, sử dụng JXCell.
 *
 * @author lockex1987
 */
@Slf4j
public class ImportExcel {

	// So loi toi da
	public static final int MAX_ERROR_NUM = 1000;

	// So dong toi da, neu khong gioi han thi nho hon 0
	private int maxNumberOfRecord;
	// Dong du lieu dau tien
	private int firstDataRow;
	// So cot
	private int numberOfColumn;
	// Cau hinh
	private ImportConfig[] columnConfig;
	// Ten bang day vao CSDL
	private String tableName;
	// Locale object
	private Locale locale;
	// Danh sach du lieu
	private List<Object[]> dataList = new LinkedList<>();
	// Danh sach dong
	private List<Integer> rowList = new LinkedList<>();
	// Danh sach loi
	private List<ImportError> errorList = new LinkedList<>();

	public ImportExcel(Locale locale, int firstDataRow, int numberOfColumn) {
		this.columnConfig = null;
		this.maxNumberOfRecord = 0;
		this.firstDataRow = firstDataRow;
		this.tableName = null;
		this.locale = locale;
		this.numberOfColumn = numberOfColumn;
	}

	public ImportExcel(ImportConfig[] columnConfig, int maxNumberOfRecord, int firstDataRow, String tableName,
			Locale locale) {
		this.columnConfig = columnConfig;
		this.maxNumberOfRecord = maxNumberOfRecord;
		this.firstDataRow = firstDataRow;
		this.tableName = tableName;
		this.locale = locale;
		numberOfColumn = columnConfig.length;
	}

	public ImportResult validateCommon(String filePath) {
		try {
			// Check if the file exists
			File file = new File(filePath);
			if (!file.exists()) {
				return new ImportResult(ImportResult.FILE_NOT_FOUND_ERROR, filePath);
			}

			// Get the first sheet
			Sheet sheet;
			Workbook workbook;
			try {
				WorkbookSettings ws = new WorkbookSettings();
				ws.setEncoding("Cp1252"); // UTF-8
				ws.setCellValidationDisabled(true);
				workbook = Workbook.getWorkbook(file, ws);
				sheet = workbook.getSheet(0);
			} catch (Exception ex) {
				log.error("Get Excel sheet error", ex);
				workbook = null;
				sheet = null;
			}
			if (sheet == null) {
				return new ImportResult(ImportResult.FORMAT_ERROR,
						MessageUtil.getMessage("import.importError4", locale));
			}

			// Read data of the first sheet
			ImportResult importResult;
			int rowNum = sheet.getRows();
			if (rowNum < firstDataRow) {
				importResult = new ImportResult(ImportResult.FIRST_DATA_ROW_ERROR,
						MessageUtil.getMessage("import.importError1", locale, firstDataRow));
			} else {
				readExcelSheet(sheet);

				if (dataList.isEmpty()) {
					importResult = new ImportResult(ImportResult.NO_DATA_ERROR,
							MessageUtil.getMessage("import.importError2", locale));
				} else if ((maxNumberOfRecord > 0) && (dataList.size() > maxNumberOfRecord)) {
					importResult = new ImportResult(ImportResult.EXCEED_MAX_NUMBER_OF_RECORD_ERROR,
							MessageUtil.getMessage("import.importError8", locale, maxNumberOfRecord, dataList.size()));
				} else if (!errorList.isEmpty()) {
					importResult = new ImportResult(ImportResult.DATA_CONTENT_ERROR, errorList);
				} else {
					importResult = new ImportResult(dataList);
				}
			}

			workbook.close();
			return importResult;
		} catch (Exception ex) {
			log.error("Loi validateCommon", ex);
			return new ImportResult(ImportResult.EXCEPTION_ERROR, ex.getMessage());
		}
	}

	// Doc tung dong du lieu, cho vao danh sach
	private void readExcelSheet(Sheet sheet) {
		int rowNum = sheet.getRows();
		for (int row = firstDataRow; row < rowNum; row++) {
			Cell[] cells = sheet.getRow(row);
			if (notEmptyRow(cells)) {
				Object[] a = new Object[numberOfColumn];
				for (int col = 0; col < numberOfColumn; col++) {
					processCell(cells, row, col, a);
				}
				dataList.add(a);
				rowList.add(row);
			}
		}
	}

	// Check empty row (ignore empty row)
	private boolean notEmptyRow(Cell[] cells) {
		if (cells.length >= 1) {
			for (int col = 0; col < numberOfColumn && col < cells.length; col++) {
				String content = cells[col].getContents().trim();
				if (!content.isEmpty()) {
					return true;
				}
			}
			return false;
		} else {
			return false;
		}
	}

	private String getCellContent(Cell[] cells, int col) {
		if (col < cells.length) {
			if (cells[col].getType() == CellType.LABEL) {
				LabelCell lc = (LabelCell) cells[col];
				return lc.getString().trim();
			} else if (cells[col].getType() == CellType.NUMBER) {
				NumberCell nc = (NumberCell) cells[col];
				return Formater.formatNumber(nc.getValue());
			} else if (cells[col].getType() == CellType.DATE) {
				// Dang bi loi giam di 1 ngay
				DateCell dc = (DateCell) cells[col];
				return DateTimeUtil.convertDateToString(dc.getDate());
			} else if (cells[col].getType() == CellType.DATE_FORMULA) {
				DateFormulaCell dc = (DateFormulaCell) cells[col];
				return DateTimeUtil.convertDateToString(dc.getDate());
			} else if (cells[col].getType() == CellType.BOOLEAN) {
				BooleanCell dc = (BooleanCell) cells[col];
				return String.valueOf(dc.getValue());
			} else {
				return cells[col].getContents().trim();
			}
		} else {
			return "";
		}
	}

	private void normalizeCellContent(String content, int row, int col, Object[] a) {
		// Chuan hoa du lieu
		content = content.trim();

		// Kiem tra do dai du lieu
		if (columnConfig[col].getLength() < content.length()) {
			if (errorList.size() < MAX_ERROR_NUM) {
				errorList.add(new ImportError(row, col,
						"<b>" + columnConfig[col].getExcelColumn() + "</b> "
								+ MessageUtil.getMessage("import.exceedMaxLength", locale,
										columnConfig[col].getLength()),
						content));
			}
		} else {
			// Kiem tra kieu du lieu
			a[col] = ExcelValidator.checkDataType(columnConfig[col], content, row, col, locale, errorList);
		}

		// Kiem tra validation (TungLT17 them)
		Long dataValidationType = columnConfig[col].getDataValidationType();
		if (dataValidationType != null) {
			ExcelValidator.newValidate(dataValidationType, content, columnConfig, row, col, errorList, a);
		}
	}

	private void processCell(Cell[] cells, int row, int col, Object[] a) {
		String content = getCellContent(cells, col);

		if (columnConfig == null) {
			a[col] = content;
		} else {
			if (!columnConfig[col].getIgnore()) {
				if (col < cells.length) {
					if (content.isEmpty()) {
						// Kiem tra NULL
						if (!columnConfig[col].getNullable()) {
							if (errorList.size() < MAX_ERROR_NUM) {
								errorList.add(new ImportError(row, col, "<b>" + columnConfig[col].getExcelColumn()
										+ "</b> " + MessageUtil.getMessage("import.isRequired", locale), null));
							}
						}
					} else {
						normalizeCellContent(content, row, col, a);
					}
				} else if (!columnConfig[col].getNullable()) {
					if (errorList.size() < MAX_ERROR_NUM) {
						errorList.add(new ImportError(row, col, "<b>" + columnConfig[col].getExcelColumn() + "</b> "
								+ MessageUtil.getMessage("import.isRequired", locale), null));
					}
				}
			}
		}
	}

	/**
	 * Them loi (xu ly tiep nghiep vu ngoai).
	 *
	 * @param row
	 * @param col
	 * @param errorMessage
	 * @param content
	 */
	public void addError(int row, int col, String errorMessage, String content) {
		if (errorList.size() < MAX_ERROR_NUM) {
			errorList.add(new ImportError(rowList.get(row), col, errorMessage, content));
		}
	}

	/**
	 * Kiem tra tiep
	 * 
	 * @return
	 */
	public boolean hasError() {
		return !errorList.isEmpty();
	}
}
