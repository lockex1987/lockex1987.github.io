package cttd.database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class QueryDataExample {

	public static void main(String[] args) throws Exception {
		// Lấy ra đối tượng Connection kết nối vào DB.
		Connection connection = ConnectionUtils.getMyConnection();

		// Tạo đối tượng Statement.
		Statement statement = connection.createStatement();

		String sql = " SELECT employee_id, code, name FROM Employee ";

		// Thực thi câu lệnh SQL trả về đối tượng ResultSet.
		ResultSet rs = statement.executeQuery(sql);

		// Duyệt trên kết quả trả về.
		// Di chuyển con trỏ xuống bản ghi kế tiếp.
		while (rs.next()) {
			int empId = rs.getInt(1);
			String empNo = rs.getString(2);
			String empName = rs.getString("name");
			System.out.println("--------------------");
			System.out.println("EmpId: " + empId);
			System.out.println("EmpNo: " + empNo);
			System.out.println("EmpName: " + empName);
		}
		
		// Đóng kết nối
		connection.close();
	}
}
