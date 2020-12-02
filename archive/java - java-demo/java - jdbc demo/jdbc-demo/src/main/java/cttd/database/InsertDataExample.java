package cttd.database;

import java.sql.Connection;
import java.sql.Statement;

public class InsertDataExample {

	public static void main(String[] args) throws Exception {
		// Lấy ra kết nối tới cơ sở dữ liệu.
		Connection connection = ConnectionUtils.getMyConnection();

		Statement statement = connection.createStatement();

		String sql = " INSERT INTO Salary_Grade(salary_grade_id, high_salary, low_salary) "
				+ " VALUES(2, 20000, 10000) ";

		// Thực thi câu lệnh.
		// executeUpdate(String) sử dụng cho các loại lệnh Insert,Update,Delete.
		int rowCount = statement.executeUpdate(sql);

		// In ra số dòng được trèn vào bởi câu lệnh trên.
		System.out.println("Row Count affected = " + rowCount);
	}
}
