/*
 * NVH.
 */
package common.bean;

/**
 * Import error information.
 *
 * @author locke
 */
public class ImportError {

	private final int ALPHABET_NUMBER = 26; // number of alphabet

	public final int row;
	public final int column;
	public final String columnLabel; // label of colum (A, B, C,..., X, Y, Z, AA, AB, AC,...)
	public final String description;
	public final String content;

	public ImportError(int row, int col, String description, String content) {
		this.row = row + 1;
		this.column = col + 1;
		this.description = description;
		this.content = content;

		if (col < ALPHABET_NUMBER) {
			this.columnLabel = String.valueOf((char) ('A' + col));
		} else {
			int temp = col / ALPHABET_NUMBER;
			col -= ALPHABET_NUMBER * temp;
			this.columnLabel = String.valueOf((char) ('A' + temp - 1)) + String.valueOf((char) ('A' + col));
		}
	}
}
