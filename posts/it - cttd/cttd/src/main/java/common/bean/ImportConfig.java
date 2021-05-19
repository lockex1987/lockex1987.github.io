/*
 * NVH.
 */
package common.bean;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author locke
 */
public class ImportConfig {
	
	/**
	 * Kieu du lieu (xau)
	 */
	public static final Long LONG = 0L; // Kieu so nguyen
	public static final Long DOUBLE = 1L; // Kieu so thuc
	public static final Long STRING = 2L; // Kieu xau
	public static final Long DATE = 3L; // Kieu ngay thang
	public static final Long BOOLEAN = 4L; // Kieu true false
	public static final Long MMYYYY_DATE = 5L; // Kieu ngay thang mmYYYY
	

	private String excelColumn; // Ten cot trong file Excel
	private Long type; // 0: NUMBER (long), 1: NUMBER (double), 2: VARCHAR2, 3: DATE
	private Boolean nullable; // Co the null hay khong
	private Long length; // Do dai du lieu
	private Boolean ignore; // Bo qua, khong day vao CSDL
	
	private Double minValue; // Gia tri nho nhat voi truong hop kieu du lieu la so thuc
	private Double maxValue; // Gia tri lon nhat voi truong hop kieu du lieu la so thuc
	private String databaseColumn; // Cot day vao CSDL
	private Boolean containsMinValue; // Co the lay gia tri nho nhat
	private Boolean containsMaxValue; // Co the lay gia tri lon nhat
	private Long dataValidationType; // Loai validate: 1 la trong list, 2 la bieu thuc chinh quy, 3 la upperCase - lowerCase,...
	private List<String> textValueList; // Danh sach list
	private String regularExpression; // Bieu thuc chinh quy
	private String actionType; // Hanh dong

	public ImportConfig() {
	}

	public void setValues() {
		this.ignore = true;
		this.databaseColumn = "";
	}

	public void setValues(String databaseColumn) {
		this.ignore = true;
		this.databaseColumn = databaseColumn;
	}

	public void setValues(String databaseColumn, Long type) {
		this.ignore = true;
		this.databaseColumn = databaseColumn;
		this.type = type;
	}

	public void setValues(String excelColumn, Long type, Boolean nullable, Long length,
					Double minValue, Double maxValue, String databaseColumn,
					Boolean containsMinValue, Boolean containsMaxValue) {
		this.ignore = false;
		this.databaseColumn = databaseColumn;
		this.excelColumn = excelColumn;
		this.type = type;
		this.nullable = nullable;
		this.length = length;
		
		this.minValue = minValue;
		this.maxValue = maxValue;
		this.containsMinValue = containsMinValue;
		this.containsMaxValue = containsMaxValue;
	}

	public void setValues(String excelColumn, Long type, Boolean nullable, Long length,
					Double minValue, Double maxValue, String databaseColumn,
					Boolean containsMinValue, Boolean containsMaxValue, Long dataValidationType,
					String dataValidationText, Boolean ignore) {
		this.ignore = false;
		this.databaseColumn = databaseColumn;
		this.excelColumn = excelColumn;
		this.type = type;
		this.nullable = nullable;
		this.length = length;

		this.minValue = minValue;
		this.maxValue = maxValue;
		this.containsMinValue = containsMinValue;
		this.containsMaxValue = containsMaxValue;
		this.dataValidationType = dataValidationType;
		if (this.dataValidationType != null) {
			if (dataValidationType.equals(1L)) {
				String[] a = dataValidationText.split(",");
				textValueList = new ArrayList<>(a.length);
				for (String s : a) {
					textValueList.add(s.trim());
				}
			} else if (dataValidationType.equals(2L)) {
				this.regularExpression = dataValidationText;
			} else if (dataValidationType.equals(2L)) {
				this.actionType = dataValidationText;
			}
		}
		this.ignore = ignore;
	}

	//<editor-fold defaultstate="collapsed" desc="Getters">
	public String getExcelColumn() {
		return excelColumn;
	}

	public Long getType() {
		return type;
	}

	public Boolean getNullable() {
		return nullable;
	}

	public Long getLength() {
		return length;
	}

	public Boolean getIgnore() {
		return ignore;
	}

	public Double getMinValue() {
		return minValue;
	}

	public Double getMaxValue() {
		return maxValue;
	}

	public String getDatabaseColumn() {
		return databaseColumn;
	}

	public Boolean getContainsMinValue() {
		return containsMinValue;
	}

	public Boolean getContainsMaxValue() {
		return containsMaxValue;
	}

	public Long getDataValidationType() {
		return dataValidationType;
	}

	public List<String> getTextValueList() {
		return textValueList;
	}

	public String getRegularExpression() {
		return regularExpression;
	}

	public String getActionType() {
		return actionType;
	}
	//</editor-fold>
}
