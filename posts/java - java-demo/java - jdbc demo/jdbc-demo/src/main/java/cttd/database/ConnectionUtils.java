package cttd.database;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionUtils {

	public static Connection getMyConnection()
			throws SQLException, ClassNotFoundException {
		// Sử dụng MySQL.
		// Bạn có thể thay thế bởi Database nào đó.
		return MySQLConnUtils.getMySQLConnection();
	}

	public static void main(String[] args) throws Exception {
		System.out.println("Get connection ... ");

		// Lấy ra đối tượng Connection kết nối vào database.
		Connection conn = getMyConnection();

		System.out.println("Get connection " + conn);
		System.out.println("Done!");
	}
}
