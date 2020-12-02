package cttd.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class PrepareStatementExample {

	public static void main(String[] args) throws Exception {
		// Lấy ra kết nối tới cơ sở dữ liệu.
		Connection connection = ConnectionUtils.getMyConnection();

		// Tạo một câu SQL có 2 tham số (?)
		String sql = " SELECT employee_id, code, name, department_id "
				+ " FROM Employee "
				+ " WHERE name LIKE ? "
				+ " AND department_id = ? ";

		// Tạo một đối tượng PreparedStatement.
		PreparedStatement pstm = connection.prepareStatement(sql);

		// Sét đặt giá trị tham số thứ nhất (Dấu ? thứ nhất)
		pstm.setString(1, "%S");
		// Sét đặt giá trị tham số thứ hai (Dấu ? thứ hai)
		pstm.setInt(2, 20);

		ResultSet rs = pstm.executeQuery();
		while (rs.next()) {
			System.out.println(" ---- ");
			System.out.println("EmpId: " + rs.getInt("employee_id"));
			System.out.println("EmpNo: " + rs.getString(2));
			System.out.println("EmpName: " + rs.getString("name"));
		}

		System.out.println();
		System.out.println("Set other parameters ..");

		// Tái sử dụng PreparedStatement.
		// Sét đặt các tham số khác.
		pstm.setString(1, "KI%");
		pstm.setInt(2, 10);

		// Thực thi câu lệnh truy vấn.
		rs = pstm.executeQuery();

		while (rs.next()) {
			System.out.println(" ---- ");
			System.out.println("EmpId: " + rs.getInt("employee_id"));
			System.out.println("EmpNo: " + rs.getString(2));
			System.out.println("EmpName: " + rs.getString("name"));
		}
	}
}
