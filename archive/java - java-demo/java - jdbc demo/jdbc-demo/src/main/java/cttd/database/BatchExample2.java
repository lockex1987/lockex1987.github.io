package cttd.database;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.util.UUID;

public class BatchExample2 {

	public static void main(String[] args) throws Exception {
		Connection conn = ConnectionUtils.getMyConnection();
		try {
			String sql = " INSERT INTO Timekeeping(timekeeping_id, check_time, in_out, employee_id) "
					+ " VALUES(?, ?, ?, ?) ";
			
			// Create statement object
			PreparedStatement stmt = conn.prepareStatement(sql);

			// Set auto-commit to false
			conn.setAutoCommit(false);

			// Sét đặt các tham số.
			stmt.setString(1, UUID.randomUUID().toString());
			stmt.setDate(2, new Date(System.currentTimeMillis()));
			stmt.setString(3, "I");
			stmt.setInt(4, 7839);
			
			// Thêm vào lô.
			stmt.addBatch();

			// Sét đặt các giá trị tham số khác
			stmt.setString(1, UUID.randomUUID().toString());
			stmt.setDate(2, new Date(System.currentTimeMillis()));
			stmt.setString(3, "I");
			stmt.setInt(4, 7566);
			
			// Thêm vào lô.
			stmt.addBatch();

			// Create an int[] to hold returned values
			int[] counts = stmt.executeBatch();

			System.out.println("counts[0] = " + counts[0]);
			System.out.println("counts[1] = " + counts[1]);

			// Explicitly commit statements to apply changes
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
			conn.rollback();
		}
	}
}
