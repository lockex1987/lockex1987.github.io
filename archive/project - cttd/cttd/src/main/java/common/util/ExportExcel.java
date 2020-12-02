/*
 * NVH.
 */
package common.util;

import java.awt.Color;
import java.util.Date;

import com.jxcell.CellException;
import com.jxcell.CellFormat;
import com.jxcell.View;

/**
 * Export Excel.
 *
 * @author lockex1987
 */
public class ExportExcel {

	/**
	 * Cac dinh dang format
	 */
	public static final int BORDER_FORMAT = 1; // Format tao border

	public static final int GROUP_LEVEL1_FORMAT = 3; // Format group cap 1
	public static final int GROUP_LEVEL2_FORMAT = 4; // Format group cap 2
	public static final int GROUP_LEVEL3_FORMAT = 5; // Format group cap 3
	public static final int GROUP_LEVEL4_FORMAT = 6; // Format group cap 4
	public static final int GROUP_LEVEL5_FORMAT = 7; // Format group cap 5

	public static final int BOLD_FORMAT = 9; // Format Bold

	public static final int DATE_FORMAT = 10; // Format cho du lieu dang ngay thang
	public static final int LONG_FORMAT = 11; // Format cho du lieu dang so nguyen
	public static final int DOUBLE_FORMAT = 12; // Format cho du lieu dang so thuc
	public static final int STRING_FORMAT = 13; // Format cho du lieu dang xau
	public static final int REQUIRED_FORMAT = 14; // Cot bat buoc thi boi mau
	public static final int IGNORE_FORMAT = 15; // Cot bo qua thi boi mau

	/**
	 * Doi tuong de tuong tac voi file Excel
	 */
	protected final View view;

	/**
	 * Khoi tao.
	 *
	 * @param templateFile
	 *          Duong dan den file template
	 */
	public ExportExcel(String templateFile) throws Exception {
		view = new View();
		view.read(templateFile);
	}

	/**
	 * Ghi ra file Excel.
	 *
	 * @param exportFile
	 *          File Excel xuat ra, duong dan tuyet doi, co the lay qua HttpServletRequest.getRealPath
	 */
	public void writeFile(String exportFile) throws Exception {
		view.write(exportFile);
	}

	public void mergeCell(int r1, int c1, int r2, int c2) throws CellException {
		view.setSelection(r1, c1, r2, c2);
		CellFormat cfmt = view.getCellFormat();
		cfmt.setMergeCells(true);
		view.setCellFormat(cfmt);
	}

	public void alignLeft(int r1, int c1, int r2, int c2, int type) throws CellException {
		horizontalAlignment(r1, c1, r2, c2, CellFormat.HorizontalAlignmentLeft);
	}

	public void alignRight(int r1, int c1, int r2, int c2, int type) throws CellException {
		horizontalAlignment(r1, c1, r2, c2, CellFormat.HorizontalAlignmentRight);
	}

	public void alignCenter(int r1, int c1, int r2, int c2, int type) throws CellException {
		horizontalAlignment(r1, c1, r2, c2, CellFormat.HorizontalAlignmentCenter);
	}

	/**
	 * Set cell alignment
	 *
	 * @param r1
	 *          start row
	 * @param c1
	 *          start column
	 * @param r2
	 *          end row
	 * @param c2
	 *          end column
	 * @param type
	 *          {left alignment, center alignment, right alignment}
	 * @throws CellException
	 */
	private void horizontalAlignment(int r1, int c1, int r2, int c2, int type) throws CellException {
		view.setSelection(r1, c1, r2, c2);
		CellFormat cfmt = view.getCellFormat();
		switch (type) {
		case 1:
			cfmt.setHorizontalAlignment(CellFormat.HorizontalAlignmentLeft);
			break;
		case 2:
			cfmt.setHorizontalAlignment(CellFormat.HorizontalAlignmentCenter);
			break;
		case 3:
			cfmt.setHorizontalAlignment(CellFormat.HorizontalAlignmentRight);
			break;
		}
		view.setCellFormat(cfmt);
	}

	public void setEntry(int row, int column, String text) throws CellException {
		if (!CommonUtils.isNullOrEmpty(text)) {
			view.setTextAsValue(row, column, text);
		}
	}

	public void setEntry(int row, int column, Double value) throws CellException {
		setEntry(row, column, Formater.formatNumber(value));
	}

	public void setEntry(int row, int column, Long value) throws CellException {
		setEntry(row, column, Formater.formatNumber(value));
	}

	public void setEntry(int row, int column, Integer value) throws CellException {
		setEntry(row, column, String.valueOf(value));
	}

	public void setEntry(int row, int column, Date value) throws CellException {
		setEntry(row, column, DateTimeUtil.convertDateToString(value));
	}

	public void setRowEntries(int row, Object... args) throws CellException {
		int column = 0;
		for (Object value : args) {
			if (value != null) {
				if (value instanceof String) {
					setEntry(row, column, (String) value);
				} else if (value instanceof Double) {
					setEntry(row, column, (Double) value);
				} else if (value instanceof Long) {
					setEntry(row, column, (Long) value);
				} else if (value instanceof Integer) {
					setEntry(row, column, (Integer) value);
				} else if (value instanceof Date) {
					setEntry(row, column, (Date) value);
				}
			}
			column++;
		}
	}

	/**
	 * Thiet lap cong thuc cho cell.
	 *
	 * @param text
	 *          Gia tri
	 * @param column
	 *          Cot
	 * @param row
	 *          Dong
	 * @throws com.jxcell.CellException
	 */
	public void setFormula(int row, int column, String text) throws CellException {
		view.setFormula(row, column, text);
	}

	public void setActiveSheet(int sheetIndex) throws Exception {
		view.setSheet(sheetIndex);
		view.setSheetSelected(sheetIndex, true);
	}

	public void setInactiveSheet(int sheetIndex) throws Exception {
		view.setSheet(sheetIndex);
		view.setSheetSelected(sheetIndex, false);
	}

	public void showColumn(int col1, int col2) throws CellException {
		view.setColHidden(col1, col2, false);
	}

	public void hideColumn(int col1, int col2) throws CellException {
		view.setColHidden(col1, col2, true);
	}

	public void setColWidth(int col, Long width) throws Exception {
		view.setColWidth(col, width.intValue() * 256);
	}

	/**
	 * Format cell
	 *
	 * @param r1
	 *          Top
	 * @param c1
	 *          Left
	 * @param r2
	 *          Bottom
	 * @param c2
	 *          Right
	 * @param formatType
	 *          Loai cell
	 * @throws com.jxcell.CellException
	 */
	public void setCellFormat(int r1, int c1, int r2, int c2, int formatType) throws CellException {
		if (r2 < r1) {
			return;
		}
		CellFormat format = view.getCellFormat(r1, c1, r2, c2);
		if (formatType == BORDER_FORMAT) {
			// <editor-fold defaultstate="collapsed" desc="Border cho du lieu binh thuong">
			short border = CellFormat.BorderThin;

			format.setLeftBorder(border);
			format.setRightBorder(border);
			format.setTopBorder(border);
			format.setBottomBorder(border);
			format.setHorizontalInsideBorder(border);
			format.setVerticalInsideBorder(border);

			Color borderColor = Color.BLACK.darker();
			format.setLeftBorderColor(borderColor);
			format.setRightBorderColor(borderColor);
			format.setTopBorderColor(borderColor);
			format.setBottomBorderColor(borderColor);

			format.setWordWrap(true);
			// </editor-fold>
		} else if (formatType == GROUP_LEVEL1_FORMAT) {
			format.setFontBold(true);
			format.setPattern((short) 1);
			format.setPatternFG(Color.ORANGE);
		} else if (formatType == GROUP_LEVEL2_FORMAT) {
			format.setFontBold(true);
			format.setFontItalic(true);
			format.setPattern((short) 1);
			format.setPatternFG(new Color(135, 206, 250));
		} else if (formatType == GROUP_LEVEL3_FORMAT) {
			format.setFontBold(true);
			format.setFontItalic(true);
			format.setPattern((short) 1);
			format.setPatternFG(new Color(10, 175, 255));
		} else if (formatType == GROUP_LEVEL4_FORMAT) {
			format.setFontBold(true);
			format.setFontItalic(true);
			format.setPattern((short) 1);
			format.setPatternFG(new Color(209, 232, 170));
		} else if (formatType == GROUP_LEVEL5_FORMAT) {
			format.setFontBold(true);
			format.setFontItalic(true);
			format.setPattern((short) 1);
			format.setPatternFG(new Color(250, 250, 210));
		} else if (formatType == BOLD_FORMAT) {
			format.setFontBold(true);
		} else if (formatType == DATE_FORMAT) {
			format.setHorizontalAlignment(CellFormat.HorizontalAlignmentCenter);
		} else if (formatType == LONG_FORMAT) {
			format.setHorizontalAlignment(CellFormat.HorizontalAlignmentRight);
			format.setCustomFormat("#,##0");
		} else if (formatType == DOUBLE_FORMAT) {
			format.setHorizontalAlignment(CellFormat.HorizontalAlignmentRight);
		} else if (formatType == REQUIRED_FORMAT) {
			format.setPattern((short) 1);
			format.setPatternFG(new Color(0, 176, 240));
		} else if (formatType == IGNORE_FORMAT) {
			format.setPattern((short) 1);
			format.setPatternFG(new Color(217, 217, 217));
		}
		view.setCellFormat(format, r1, c1, r2, c2);
	}
}
