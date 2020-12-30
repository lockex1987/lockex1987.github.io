package common.bean;

import java.util.List;

public class ImportResult {

	/**
	 * Ma tra ve
	 */
	// Khong co loi
	public static final int NO_ERROR = 0;

	public static final int DATA_CONTENT_ERROR = 3; // Du lieu co loi

	public static final int FIRST_DATA_ROW_ERROR = 1; // So dong cua file nho hon dong bat dau
	public static final int NO_DATA_ERROR = 2; // Khong co du lieu
	public static final int FORMAT_ERROR = 4; // Khong dung dinh dang Excel

	public static final int EXCEED_MAX_NUMBER_OF_RECORD_ERROR = 8; // Loi so dong vuot qua
	public static final int FILE_NOT_FOUND_ERROR = 9; // File not found
	// Exception
	public static final int EXCEPTION_ERROR = 10;

	private int returnCode;
	private String message;

	private List<ImportError> errorList;
	private List<Object[]> dataList;

	public ImportResult(int returnCode, String message) {
		this.returnCode = returnCode;
		this.message = message;
	}

	public ImportResult(int returnCode, List<ImportError> errorList) {
		this.returnCode = returnCode;
		this.errorList = errorList;
	}

	public ImportResult(List<Object[]> dataList) {
		this.returnCode = NO_ERROR;
		this.dataList = dataList;
	}

	// GETTERS
	public int getReturnCode() {
		return returnCode;
	}

	public String getMessage() {
		return message;
	}

	public List<Object[]> getDataList() {
		return dataList;
	}

	public List<ImportError> getErrorList() {
		return errorList;
	}
}
