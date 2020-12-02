package cttd.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySQLConnUtils {

	// Kết nối vào MySQL.
	public static Connection getMySQLConnection()
			throws SQLException, ClassNotFoundException {
		String hostName = "localhost";
		String dbName = "simple_hr";
		String userName = "root";
		String password = "abc123";
		return getMySQLConnection(hostName, dbName, userName, password);
	}

	public static Connection getMySQLConnection(String hostName, String dbName, String username, String password)
			throws SQLException, ClassNotFoundException {
		// Khai báo class Driver cho DB MySQL
		// Việc này cần thiết với Java 5
		// Java6 tự động tìm kiếm Driver thích hợp.
		// Nếu bạn dùng Java6, thì ko cần dòng này cũng được.
		// Class.forName("com.mysql.jdbc.Driver");

		// Cấu trúc URL Connection dành cho Oracle
		// Ví dụ: jdbc:mysql://localhost:3306/simplehr
		String url = "jdbc:mysql://" + hostName + ":3306/" + dbName
				+ "?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";

		Connection conn = DriverManager.getConnection(url, username, password);
		return conn;
	}
}
