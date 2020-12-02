package common.util;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Locale;

import common.bean.ImportConfig;
import common.bean.ImportError;

public class ExcelValidator {

	/**
	 * Bieu thuc chinh quy
	 */
	// so thuc
	private static final String DOUBLE_REGEX = "(-)?(\\d+|(\\d|\\d\\d|\\d\\d\\d)(,\\d\\d\\d)*)(\\.\\d+)?";
	// so nguyen
	private static final String LONG_REGEX = "(-)?(\\d+|(\\d|\\d\\d|\\d\\d\\d)(,\\d\\d\\d)*)(\\.0+)?";
	/**
	 * Cac loai du lieu
	 */
	private static final String[] TYPE_NAMES = new String[] {
			"import.integerType",
			"import.floatType",
			"import.stringType",
			"import.dateType",
			"import.boolean",
			"import.mmyyyyType"
	};

	/**
	 * Format so
	 */
	private static DecimalFormat decimalFormat = new DecimalFormat("###,###.###");

	/**
	 * Check kieu du lieu.
	 *
	 * @param columnConfig
	 *          Cau hinh cot Excel
	 * @param content
	 *          Noi dung
	 * @param row
	 *          Hang
	 * @param col
	 *          Cot
	 * @return Gia tri
	 */
	public static Object checkDataType(ImportConfig columnConfig, String content,
			int row, int col, Locale locale, List<ImportError> errorList) {
		Object temp = null;
		String error = null;
		try {
			if (columnConfig.getType().equals(ImportConfig.LONG)) {
				if (!content.matches(LONG_REGEX)) {
					throw new Exception();
				}
				int index = content.indexOf(".");
				if (index >= 0) {
					content = content.substring(0, index);
				}
				temp = Long.parseLong(content.replace(",", ""));
				if ((columnConfig.getMaxValue() != null) && (columnConfig.getMinValue() != null)) {
					throw new NumberFormatException();
				}
			} else if (columnConfig.getType().equals(ImportConfig.DOUBLE)) {
				if (!content.matches(DOUBLE_REGEX)) {
					throw new Exception();
				}
				temp = Double.parseDouble(content.replace(",", ""));
				if ((columnConfig.getMaxValue() != null) && (columnConfig.getMinValue() != null)) {
					throw new NumberFormatException();
				}
			} else if (columnConfig.getType().equals(ImportConfig.DATE)) {
				temp = DateTimeUtil.convertStringToDate(content);
				if ((content != null) && !content.isEmpty() && (temp == null)) {
					throw new Exception();
				}
			} else if (columnConfig.getType().equals(ImportConfig.STRING)) {
				temp = content;
			} else if (columnConfig.getType().equals(ImportConfig.MMYYYY_DATE)) {
				String regex = "^\\d{2}/\\d{4}$";
				if (!content.matches(regex)) {
					throw new Exception();
				} else {
					temp = DateTimeUtil.convertStringToDate(content, "MM/yyyy");
					if ((content != null) && !content.isEmpty() && (temp == null)) {
						throw new Exception();
					}
				}

			}
		} catch (NumberFormatException ex) {
			Double val;
			if ((temp instanceof Long)) {
				val = Double.valueOf(((Long) temp).longValue() * 1.0D);
			} else {
				val = (Double) temp;
			}
			if (val != null) {
				if ((!columnConfig.getContainsMaxValue() && val >= columnConfig.getMaxValue())) {
					error = "<b>" + columnConfig.getExcelColumn() + "</b> "
							+ MessageUtil.getMessage("import.must", locale) + " &lt; "
							+ decimalFormat.format(columnConfig.getMaxValue());
					
				} else if ((columnConfig.getContainsMaxValue() && val > columnConfig.getMaxValue())) {
					error = "<b>" + columnConfig.getExcelColumn() + "</b> "
							+ MessageUtil.getMessage("import.must", locale) + " &le; "
							+ decimalFormat.format(columnConfig.getMaxValue());
				} else if ((!columnConfig.getContainsMinValue() && val <= columnConfig.getMinValue())) {
					error = "<b>" + columnConfig.getExcelColumn() + "</b> "
							+ MessageUtil.getMessage("import.must", locale) + " &gt; "
							+ decimalFormat.format(columnConfig.getMinValue());
				} else if ((columnConfig.getContainsMinValue() && val < columnConfig.getMinValue())) {
					error = "<b>" + columnConfig.getExcelColumn() + "</b> "
							+ MessageUtil.getMessage("import.must", locale) + " &ge; "
							+ decimalFormat.format(columnConfig.getMinValue());
				}
			}
		} catch (Exception ex) {
			error = "<b>" + columnConfig.getExcelColumn() + "</b> "
					+ MessageUtil.getMessage("import.invalidType", locale) + " ("
					+ MessageUtil.getMessage(TYPE_NAMES[columnConfig.getType().intValue()], locale) + ")";
		}
		if (error != null) {
			if (errorList.size() < ImportExcel.MAX_ERROR_NUM) {
				errorList.add(new ImportError(row, col, error, content));
			}
		}
		return temp;
	}

	public static void newValidate(Long dataValidationType, String content, ImportConfig[] columnConfig,
			int row, int col, List<ImportError> errorList, Object[] a) {
		if (dataValidationType.equals(1L)) {
			// Neu la 1 thi validate List
			content = content.toUpperCase();
			List<String> textValueList = columnConfig[col].getTextValueList();
			if (!textValueList.contains(content)) {
				errorList.add(new ImportError(row, col, "<b>" + columnConfig[col].getExcelColumn()
						+ "</b> chỉ được nhập " + textValueList.toString(), content));
			} else {
				a[col] = content;
			}
		} else if (dataValidationType.equals(2L)) {
			// Neu la 2 thi validate theo regex
			String regularExpression = columnConfig[col].getRegularExpression();
			if (!content.toLowerCase().matches(regularExpression)) {
				errorList.add(new ImportError(row, col, "<b>" + columnConfig[col].getExcelColumn()
						+ "</b> không đúng định dạng " + regularExpression, content));
			}
		} else if (dataValidationType.equals(3L)) {
			// Neu la 3 la toUpperCase hoac toLowerCase
			String actionType = columnConfig[col].getActionType();
			if ("uppercase".equalsIgnoreCase(actionType)) {
				content = content.toUpperCase();
			} else if ("lowercase".equalsIgnoreCase(actionType)) {
				content = content.toLowerCase();
			}
			a[col] = content;
		}
	}
}
