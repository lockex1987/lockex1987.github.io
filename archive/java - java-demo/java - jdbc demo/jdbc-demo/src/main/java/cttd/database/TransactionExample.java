package cttd.database;

import java.sql.Connection;
import java.sql.SQLException;

public class TransactionExample {

	private static void doJob1(Connection conn) {
		// Làm gì đó tại đây.
		// Insert update dữ liêu.
	}

	private static void doJob2(Connection conn) {
		// Làm gì đó tại đây.
		// Insert update dữ liêu.
	}

	public static void main(String[] args) throws ClassNotFoundException,
			SQLException {
		// Lấy ra kết nối tới cơ sở dữ liệu.
		Connection connection = ConnectionUtils.getMyConnection();

		// Sét đặt chế độ tự động Commit thành false
		// Để tự quản lý việc commit trên chương trình.
		connection.setAutoCommit(false);

		try {
			// Làm một việc gì đó liên quan tới DB.
			doJob1(connection);
			// Lamf nhiệm vụ thứ 2
			doJob2(connection);

			// Gọi method commit dữ liệu xuống DB.
			connection.commit();
		} catch (Exception e) {
			// Có vấn đề gì đó lỗi xẩy ra.
			e.printStackTrace();
			// Rollback dữ liệu
			connection.rollback();
		}

		// Đóng Connection.
		connection.close();
	}
}
