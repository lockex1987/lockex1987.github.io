package common.doc.demo;

import common.rtf.RtfFile;
import common.rtf.RtfTable;

public class ViettelRtfDemo {

	private RtfFile docFile;

	public ViettelRtfDemo() throws Exception {
		readTemplate();
		writeForm();
		//writeTable();
		writeOutput();
	}

	private void readTemplate() {
		docFile = new RtfFile();
		String path = "input/so-yeu-ly-lich.rtf";
		docFile.readFile(path);
	}

	private void writeForm() throws Exception {
		docFile.setParam("[MANAGE_ORGANIZATION_NAME]", "Trung tâm phần mềm Viettel");
		docFile.setParam("[FULL_NAME]", "Nguyễn Văn Huyên");
		docFile.setParam("[EMPLOYEE_CODE]", "079263");
		docFile.setParam("[DATE_OF_BIRTH]", "11/05/1987");
		docFile.setParam("[GENDER]", "Nam");
		docFile.setParam("[PLACE_OF_BIRTH]", "Hưng Yên");
		docFile.setParam("[PERMANENT_ADDRESS]", "Cửu Cao, Văn Giang, Hưng Yên");
		docFile.setParam("[CURRENT_ADDRESS]", "Cửu Cao, Văn Giang, Hưng Yên");
		docFile.setParam("[CURRENT_EDUCATION_GRADE]", "Đại học");
		docFile.setParam("[CURRENT_EDUCATION_SUBJECT]", "CNTT");
		docFile.setParam("[CURRENT_PLACE_OF_ISSUE]", "Đại học công nghệ - Đại học Quốc gia Hà Nội");
		docFile.setParam("[LANGUAGE]", "Tiếng Anh");
		docFile.setParam("[LANGUAGE_DEGREE]", "Bằng A");
	}

	private void writeTable() throws Exception {
		int educationRow = 2;
		RtfTable table = new RtfTable(educationRow, 6);
		table.setColName(0, "[STUDY_START_DATE]");
		table.setColName(1, "[STUDY_END_DATE]");
		table.setColName(2, "[EDUCATION_GRADE]");
		table.setColName(3, "[EDUCATION_SUBJECT]");
		table.setColName(4, "[PLACE_OF_ISSUE]");
		table.setColName(5, "[EDUCATION_TYPE]");

		for (int row = 0; row < educationRow; row++) {
			table.setValue(row, 0, "Edu 0");
			table.setValue(row, 1, "Edu 1");
			table.setValue(row, 2, "Edu 2");
			table.setValue(row, 3, "Edu 3");
			table.setValue(row, 4, "Edu 4");
			table.setValue(row, 5, "Edu 5");
		}
		docFile.setAdvancedTableData(table);
	}

	private void writeOutput() {
		docFile.writeFile("output/edu.doc");
		System.out.println("Finish");
	}

	public static void main(String[] args) throws Exception {
		new ViettelRtfDemo();
	}
}
