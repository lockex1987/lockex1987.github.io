package cttd.database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class ScrollableResultSetExample {

	public static void main(String[] args) throws Exception {
		// Lấy ra đối tượng Connection kết nối tới DB.
		Connection connection = ConnectionUtils.getMyConnection();

		// Tạo một đối tượng Statement
		// Có thể cuộn dữ liệu, nhưng không nhậy với các thay đổi dưới DB.
		// Con trỏ chỉ có khả năng đọc, không có khả năng update dữ liệu trong quá trình duyệt.
		Statement statement = connection.createStatement(
				ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

		String sql = " SELECT employee_id, code, name FROM Employee ";

		// Thực thi câu lệnh SQL trả về đối tượng ResultSet.
		ResultSet rs = statement.executeQuery(sql);

		// Nhẩy con trỏ tới cuối
		boolean last = rs.last();

		System.out.println("last : " + last);
		if (last) {
			// Ghi ra thông tin bản ghi cuối.
			System.out.println("EmpId: " + rs.getInt(1));
			System.out.println("EmpNo: " + rs.getString(2));
			System.out.println("EmpName: " + rs.getString(3));
		}

		System.out.println("--------------------");

		// Nhẩy con trỏ lùi lại lần 1
		boolean previous = rs.previous();
		System.out.println("Previous 1: " + previous);

		// Nhẩy lùi con trỏ lần 2
		previous = rs.previous();
		System.out.println("Previous 2: " + previous);

		// Duyệt trên kết quả trả về.
		while (rs.next()) {
			// Lấy dữ liệu cột 2
			String empNo = rs.getString(2);
			// Rồi mới lấy dữ liệu cột 1.
			int empId = rs.getInt(1);

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
