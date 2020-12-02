package common.rtf;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

/**
 * Use WordPad to create the template
 * 
 * @author locke
 */
public class RtfFile {

	private String fileContent;

	/**
	 * Read template file
	 * 
	 * @param templatePath
	 *          Template path
	 * @return RTF content
	 */
	public String readFile(String templatePath) {
		try (BufferedReader input = new BufferedReader(new FileReader(new File(templatePath)))) {
			StringBuffer sb = new StringBuffer();
			String line;
			while ((line = input.readLine()) != null) {
				sb.append(line).append("\n");
			}
			fileContent = sb.toString();
			return fileContent;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	/**
	 * Write to output file
	 * 
	 * @param outputPath
	 */
	public void writeFile(String outputPath) {
		try (BufferedWriter output = new BufferedWriter(new FileWriter(new File(outputPath)))) {
			output.write(fileContent, 0, fileContent.length());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * Replace a parameter
	 * 
	 * @param paramKey
	 *          paraKey must start with "[" and end with "]"
	 * @param paramValue
	 */
	public void setParam(String paramKey, String paramValue) {
		if ((paramKey.startsWith("[")) && (paramKey.endsWith("]"))) {
			char[] a = paramValue.toCharArray();
			StringBuffer sb = new StringBuffer();
			// Can than nham giua Character va Integer
			for (int i = 0; i < a.length; i++) {
				if (a[i] > '¿') {
					int c = a[i];
					sb.append("\\u" + c + "\\'3f");
				} else if ((a[i] == '\\') || (a[i] == '{') || (a[i] == '}')) {
					sb.append("\\" + a[i]);
				} else {
					sb.append(a[i]);
				}
			}
			fileContent = fileContent.replace(paramKey, sb.toString());
		} else {
			System.out.println("Invalid paramKey: " + paramKey);
		}
	}

	/**
	 * Khong co du lieu thi phai xoa placeholder
	 * 
	 * @param table
	 */
	public void setAdvancedTableData(RtfTable table) {
		if (table.getRowNum() > 0) {
			if (table.getColNum() > 0) {
				setRowForAdvancedTable(table.getTableName(), table.getRowNum(), table.getColNum());

				for (int row = 0; row < table.getRowNum(); row++) {
					for (int col = 0; col < table.getColNum(); col++) {
						setFirstParam(table.getColName(col), table.getValue(row, col));
					}
				}
			}
		}
	}

	private void setRowForAdvancedTable(String fieldName, int rowNum, int colNum) {
		int fieldIndex = fileContent.indexOf(fieldName);
		String subString = fileContent.substring(0, fieldIndex);
		int startPoint = subString.lastIndexOf("\\cltxlrtb");

		for (int i = 0; i < colNum; i++) {
			subString = subString.substring(0, startPoint);
			startPoint = subString.lastIndexOf("\\cltxlrtb");
		}

		int endPoint = fieldIndex;
		for (int i = 0; i < colNum; i++) {
			endPoint++;
			endPoint = this.fileContent.indexOf("\\cltxlrtb", endPoint);
		}

		subString = this.fileContent.substring(startPoint, endPoint);

		StringBuffer strBuffer = new StringBuffer();
		for (int i = 0; i < rowNum; i++) {
			strBuffer.append(subString);
		}

		this.fileContent = this.fileContent.replace(subString, strBuffer.toString());
	}

	private void setFirstParam(String paramKey, String paramValue) {
		char[] a = paramValue.toCharArray();
		StringBuffer sb = new StringBuffer();
		paramKey = paramKey.replace("[", "\\[");
		paramKey = paramKey.replace("]", "\\]");

		for (int i = 0; i < a.length; i++) {
			if (a[i] > '¿') {
				int ch = a[i];
				sb.append("\\\\u" + ch + "\\\\'3f");
			} else if ((a[i] == '\\') || (a[i] == '{') || (a[i] == '}')) {
				sb.append("\\\\\\" + a[i]);
			} else {
				sb.append(a[i]);
			}
		}
		fileContent = fileContent.replaceFirst(paramKey, sb.toString());
	}
}