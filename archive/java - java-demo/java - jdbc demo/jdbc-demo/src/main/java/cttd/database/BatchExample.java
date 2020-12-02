package cttd.database;

import java.sql.Connection;
import java.sql.Statement;

public class BatchExample {

	public static void main(String[] args) throws Exception {
		Connection conn = ConnectionUtils.getMyConnection();
		try {
			// Create statement object
			Statement stmt = conn.createStatement();

			// Set auto-commit to false
			conn.setAutoCommit(false);

			// Create SQL statement
			// Tạo câu lệnh Insert dữ liệu vào bảng Employee
			String sql1 = " UPDATE Employee "
					+ " SET salary = salary + 100 "
					+ " WHERE department_id = 10 ";

			// Add above SQL statement in the batch.
			// Thêm câu lệnh SQL trên vào lô
			stmt.addBatch(sql1);

			// Create one more SQL statement
			String sql2 = " UPDATE Employee "
					+ " SET salary = salary + 20 "
					+ " WHERE department_id = 20 ";

			// Add above SQL statement in the batch.
			// Thêm vào lô
			stmt.addBatch(sql2);

			// Create one more SQL statement
			String sql3 = " UPDATE Employee "
					+ " SET salary = salary + 30 "
					+ " WHERE department_id = 30 ";

			// Add above SQL statement in the batch.
			// Thêm vào lô
			stmt.addBatch(sql3);

			// Create an int[] to hold returned values
			int[] counts = stmt.executeBatch();

			System.out.println("Sql1 count = " + counts[0]);
			System.out.println("Sql2 count = " + counts[1]);
			System.out.println("Sql3 count = " + counts[2]);

			// Explicitly commit statements to apply changes
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
			conn.rollback();
		}
	}
}
