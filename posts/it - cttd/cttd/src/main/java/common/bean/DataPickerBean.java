/*
 * NVH.
 */
package common.bean;

/**
 * Lop luu du lieu cua cac dong Data picker.
 *
 * @author lockex1987
 */
public class DataPickerBean {

	private Long id; // Id
	private String firstColumn; // Truong thu nhat
	private String secondColumn; // Truong thu hai

	public DataPickerBean(Long id, String firstColumn) {
		this.id = id;
		this.firstColumn = firstColumn;
	}

	public DataPickerBean(Long id, String firstColumn, String secondColumn) {
		this.id = id;
		this.firstColumn = firstColumn;
		this.secondColumn = secondColumn;
	}

	public String getFirstColumn() {
		return firstColumn;
	}

	public void setFirstColumn(String firstColumn) {
		this.firstColumn = firstColumn;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSecondColumn() {
		return secondColumn;
	}

	public void setSecondColumn(String secondColumn) {
		this.secondColumn = secondColumn;
	}
}
