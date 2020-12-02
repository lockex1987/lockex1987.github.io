package common.rtf;

public class RtfTable {

	private String[][] cells;

	// De lam gi?
	private String tableName;

	/**
	 * Create new table
	 * 
	 * @param row
	 *          Number of rows
	 * @param column
	 *          Number of columns
	 */
	public RtfTable(int row, int column) {
		if (row > 0 && (column > 0)) {
			// The first row is the headers
			// So add one to the row
			this.cells = new String[row + 1][column];
		} else {
			System.out.println("Row or colum < 1");
		}
	}

	/**
	 * Set column's name
	 * 
	 * @param colIdx
	 *          Column index
	 * @param colName
	 *          Name of column (must start with "[" and end with "]")
	 */
	public void setColName(int colIdx, String colName) {
		if (colName.startsWith("[") && colName.endsWith("]")) {
			cells[0][colIdx] = colName;
			tableName = colName;
		} else {
			System.out.println("Invalid column name: " + colName);
		}
	}

	public void setValue(int rowIdx, int colIdx, String value) {
		cells[rowIdx + 1][colIdx] = value;
	}

	public String getColName(int colIdx) {
		return cells[0][colIdx];
	}

	public String getValue(int rowIdx, int colIdx) {
		return cells[rowIdx + 1][colIdx];
	}

	public int getRowNum() {
		return cells.length - 1;
	}

	public int getColNum() {
		return cells[0].length;
	}

	public String getTableName() {
		return tableName;
	}
}