package dba.service;

import app.util.Utils;
import common.util.Jdbc;
import java.sql.Connection;
import java.sql.Statement;

public class ExecuteCommand {

	public ExecuteCommand() throws Exception {
		Connection con = Jdbc.openDatabase(Utils.CONFIG_FILE);
		Statement stm = con.createStatement();
		String[] a = {
			" INSERT INTO Sys_User(sys_user_id, login_name, full_name, password, is_active) "
			+ "VALUES(3, 'phucna', 'Nguyen Anh Phuc', 'aJF6lxnzxxbMKhugSTEMw6WNKV8=' , 1) "
		};
		for (String s : a) {
			try {
				System.out.println("Executing: <" + s + ">");
				stm.executeUpdate(s);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		stm.close();
		con.close();
	}
}
