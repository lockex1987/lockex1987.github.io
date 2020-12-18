package common.util;

import java.io.File;
import java.util.Locale;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import common.bean.ImportConfig;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ImportExcelFactory {

	/**
	 * Kieu du lieu (xau)
	 */
	private static final String STR_LONG = "long"; // Kieu so nguyen
	private static final String STR_DOUBLE = "double"; // Kieu so thuc
	private static final String STR_STRING = "string"; // Kieu xau
	private static final String STR_DATE = "date"; // Kieu ngay thang
	private static final String STR_BOOLEAN = "boolean"; // Kieu boolean
	private static final String STR_MMYYYY_DATE = "mmyyyy"; // Kieu ngay thang mmYYYY

	/**
	 * Doc cau hinh tu file XML.
	 *
	 * @param filePath
	 *          Duong dan toi file
	 */
	public static ImportExcel initFromXMLFile(String filePath, Locale locale) {
		try {
			DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			Document doc = builder.parse(new File(filePath));
			String tableName = doc.getElementsByTagName("tableName").item(0).getNodeValue();
			int firstDataRow = Integer.parseInt(doc.getElementsByTagName("firstDataRow").item(0).getNodeValue()) - 1;
			int maxNumberOfRecord = Integer.parseInt(doc.getElementsByTagName("maxNumberOfRecord").item(0).getNodeValue());
			NodeList elementList = doc.getElementsByTagName("col");
			ImportConfig[] columnConfig = new ImportConfig[elementList.getLength()];

			for (int i = 0; i < columnConfig.length; i++) {
				columnConfig[i] = new ImportConfig();
				Element element = (Element) elementList.item(i);
				int numOfChildNodes = element.getAttributes().getLength();
				if (numOfChildNodes < 2) {
					columnConfig[i].setValues();
				} else if (numOfChildNodes == 2) {
					String databaseColumn = element.getAttribute("dbCol");
					columnConfig[i].setValues(databaseColumn);
				} else if (numOfChildNodes == 3) {
					String databaseColumn = element.getAttribute("dbCol");
					String strDataType = element.getAttribute("type");
					Long dataType = null;
					if (strDataType.equals(STR_LONG)) {
						dataType = ImportConfig.LONG;
					} else if (strDataType.equals(STR_DOUBLE)) {
						dataType = ImportConfig.DOUBLE;
					} else if (strDataType.equals(STR_STRING)) {
						dataType = ImportConfig.STRING;
					} else if (strDataType.equals(STR_DATE)) {
						dataType = ImportConfig.DATE;
					} else if (strDataType.equals(STR_BOOLEAN)) {
						dataType = ImportConfig.BOOLEAN;
					} else if (strDataType.equals(STR_MMYYYY_DATE)) {
						dataType = ImportConfig.MMYYYY_DATE;
					}
					columnConfig[i].setValues(databaseColumn, dataType);
				} else {
					String excelColumn;
					try {
						excelColumn = MessageUtil.getMessage(element.getAttribute("title"), locale);
					} catch (Exception e) {
						excelColumn = element.getAttribute("title");
						log.error("##### Chua Da Ngon Ngu ##### " + excelColumn + ":" + filePath);
					}
					String databaseColumn = element.getAttribute("dbCol");
					Long dataType = null;
					String strDataType = element.getAttribute("type");
					if (strDataType.equals(STR_LONG)) {
						dataType = ImportConfig.LONG;
					} else if (strDataType.equals(STR_DOUBLE)) {
						dataType = ImportConfig.DOUBLE;
					} else if (strDataType.equals(STR_STRING)) {
						dataType = ImportConfig.STRING;
					} else if (strDataType.equals(STR_DATE)) {
						dataType = ImportConfig.DATE;
					} else if (strDataType.equals(STR_BOOLEAN)) {
						dataType = ImportConfig.BOOLEAN;
					} else if (strDataType.equals(STR_MMYYYY_DATE)) {
						dataType = ImportConfig.MMYYYY_DATE;
					}
					Long length = Long.parseLong(element.getAttribute("length"));
					Boolean nullable = true;
					String attribute = element.getAttribute("nullable");
					if (!attribute.isEmpty()) {
						nullable = attribute.equals("true");
					}
					

					Double max = null;
					Double min = null;
					Boolean containsMinValue = false;
					Boolean containsMaxValue = false;

					attribute = element.getAttribute("min");
					if (!attribute.isEmpty()) {
						containsMinValue = true;
						min = Double.parseDouble(attribute);
					}
					attribute = element.getAttribute("greater");
					if (!attribute.isEmpty()) {
						containsMinValue = false;
						min = Double.parseDouble(attribute);
					}
					attribute = element.getAttribute("max");
					if (!attribute.isEmpty()) {
						containsMaxValue = true;
						max = Double.parseDouble(attribute);
					}
					attribute = element.getAttribute("less");
					if (!attribute.isEmpty()) {
						containsMaxValue = false;
						max = Double.parseDouble(attribute);
					}

					columnConfig[i].setValues(excelColumn, dataType, nullable, length, min, max, databaseColumn,
							containsMinValue, containsMaxValue);
				}
			}
			return new ImportExcel(columnConfig, maxNumberOfRecord, firstDataRow, tableName, locale);
		} catch (Exception ex) {
			log.error("Loi khoi tao file cau hinh import", ex);
			return null;
		}
	}
}
