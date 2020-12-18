package common.bean;

public class DocTable {

	private String[] headers;
	private String[][] cells;
	private int rowNum;
	private int colNum;

	/**
	 * Create new table
	 * 
	 * @param rowNum
	 *          Number of rows
	 * @param colNum
	 *          Number of columns
	 */
	public DocTable(int rowNum, int colNum) {
		this.rowNum = rowNum;
		this.colNum = colNum;
		this.cells = new String[rowNum][colNum];
		this.headers = new String[colNum];
	}

	public void setHeaders(String... colNames) {
		for (int i = 0; i < colNum; i++) {
			headers[i] = colNames[i];
		}
	}

	public void setRowValues(int rowIdx, String... values) {
		for (int i = 0; i < colNum; i++) {
			cells[rowIdx][i] = values[i];
		}
	}

	public String getColName(int colIdx) {
		return headers[colIdx];
	}

	public String getValue(int rowIdx, int colIdx) {
		return cells[rowIdx][colIdx];
	}

	public int getRowNum() {
		return rowNum;
	}

	public int getColNum() {
		return colNum;
	}

	public String getLastHeader() {
		return headers[headers.length - 1];
	}
}