package cttd.database;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;

public class CallableStatementExample {
	
	public static void main(String[] args) throws ClassNotFoundException,
			SQLException {
		// Lấy ra kết nối tới cơ sở dữ liệu.
		Connection connection = ConnectionUtils.getMyConnection();

		// Câu lệnh gọi thủ tục (***)
		String sql = "{ CALL get_employee_info(?, ?, ?, ?, ?) }";

		// Tạo một đối tượng CallableStatement.
		CallableStatement cstm = connection.prepareCall(sql);

		// Truyền tham số vào hàm (p_Emp_ID)
		// (Là dấu chấm hỏi thứ 1 trên câu lệnh sql ***)
		cstm.setInt(1, 10);

		// Đăng ký nhận giá trị trả về tại dấu hỏi thứ 2
		// (v_Emp_No)
		cstm.registerOutParameter(2, java.sql.Types.VARCHAR);

		// Đăng ký nhận giá trị trả về tại dấu hỏi thứ 3
		// (v_First_Name)
		cstm.registerOutParameter(3, java.sql.Types.VARCHAR);

		// Đăng ký nhận giá trị trả về tại dấu hỏi thứ 4
		// (v_Last_Name)
		cstm.registerOutParameter(4, java.sql.Types.VARCHAR);

		// Đăng ký nhận giá trị trả về tại dấu hỏi thứ 5
		// (v_Hire_Date)
		cstm.registerOutParameter(5, java.sql.Types.DATE);

		// Thực thi câu lệnh
		cstm.executeUpdate();

		String empNo = cstm.getString(2);
		String firstName = cstm.getString(3);
		String lastName = cstm.getString(4);
		Date hireDate = cstm.getDate(5);

		System.out.println("Emp No: " + empNo);
		System.out.println("First Name: " + firstName);
		System.out.println("Last Name: " + lastName);
		System.out.println("Hire Date: " + hireDate);
	}
}
