package excel;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ReadAndUpdateExcel {

    public static void main(String[] args) throws Exception {
        String path = "test.xlsx";
        FileInputStream input = new FileInputStream(path);
        XSSFWorkbook workbook = new XSSFWorkbook(input);
        XSSFSheet sheet = workbook.getSheetAt(0);

        int totalRow = sheet.getLastRowNum();
        for (int r = 1; r <= totalRow; r++) {
            XSSFRow row = sheet.getRow(r);

            // Lấy giá trị một cell
            int c = 1;
            XSSFCell cell = row.getCell(c);
            String code = cell.getStringCellValue();

            // Cập nhật giá trị một cell
            c = 2;
            cell = row.getCell(c);
            if (cell == null) {
                cell = row.createCell(c);
            }
            cell.setCellValue(code + " - Done");
        }

        input.close();
        FileOutputStream output = new FileOutputStream(path);
        workbook.write(output);
        output.close();
    }
}
