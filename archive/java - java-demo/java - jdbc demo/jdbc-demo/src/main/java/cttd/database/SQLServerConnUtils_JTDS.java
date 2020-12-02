package cttd.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLServerConnUtils_JTDS {

	// Kết nối vào SQLServer.
	// (Sử dụng thư viện điều khiển JTDS)
	public static Connection getSQLServerConnection()
			throws SQLException, ClassNotFoundException {
		String hostName = "localhost";
		String sqlInstanceName = "SQLEXPRESS";
		String database = "simplehr";
		String userName = "sa";
		String password = "1234";
		return getSQLServerConnection(hostName, sqlInstanceName, database, userName, password);
	}

	// Trường hợp sử dụng SQLServer.
	// Và thư viện JTDS.
	public static Connection getSQLServerConnection(String hostName,
			String sqlInstanceName, String database, String userName, String password)
			throws ClassNotFoundException, SQLException {
		// Khai báo class Driver cho DB SQLServer
		// Việc này cần thiết với Java 5
		// Java6 tự động tìm kiếm Driver thích hợp.
		// Nếu bạn dùng Java6, thì ko cần dòng này cũng được.
		Class.forName("net.sourceforge.jtds.jdbc.Driver");

		// Cấu trúc URL Connection dành cho SQLServer
		// Ví dụ:
		// jdbc:jtds:sqlserver://localhost:1433/simplehr;instance=SQLEXPRESS
		String connectionURL = "jdbc:jtds:sqlserver://" + hostName + ":1433/"
				+ database + ";instance=" + sqlInstanceName;

		Connection conn = DriverManager.getConnection(connectionURL, userName, password);
		return conn;
	}
}
