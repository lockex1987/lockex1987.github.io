package dba.service;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import dba.bean.BoFile;

// Chap nhan loi trong truong hop nhieu khoa ngoai cho don gian code de bao tri!
//SELECT cols.column_name
//FROM all_constraints cons, all_cons_columns cols
//WHERE cons.constraint_type = 'P'
//AND cons.owner = ?
//AND cols.constraint_name = cons.constraint_name
//AND cols.owner = cons.owner
//AND cols.table_name = ?
//ORDER BY cols.position
/**
 * Sinh file BO, hbm, hibernate.
 *
 * @author gpdn_huyennv1
 */
public class OracleBoGenerator extends BaseBoGenerator {

	@Override
	protected List<String> getTableList() throws Exception {
		StringBuilder sql = new StringBuilder(" SELECT ut.table_name FROM User_Tables ut ");
		if (!tables.isEmpty()) {
			sql.append(" WHERE ut.table_name IN ('LTTD'");
			for (String s : tables) {
				sql.append(", '" + s + "'");
			}
			sql.append(") ");
		}
		sql.append(" ORDER BY ut.table_name ");
		Statement stm1 = con.createStatement();
		ResultSet rs1 = stm1.executeQuery(sql.toString());

		List<String> tableList = new ArrayList<>();
		while (rs1.next()) {
			String tab0 = rs1.getString("table_name");
			tableList.add(tab0);
		}
		rs1.close();
		stm1.close();
		return tableList;
	}

	@Override
	protected void processTable(String tab0) throws Exception {
		BoFile bo = new BoFile(tab0, pack, BoFile.ORACLE);

		CallableStatement stm2 = con.prepareCall(" SELECT utc.column_name, utc.data_type, utc.data_scale "
				+ " FROM User_Tab_Columns utc "
				+ " WHERE utc.table_name = ? ");
		stm2.setString(1, tab0.toUpperCase());
		ResultSet rs2 = stm2.executeQuery();
		// Xu ly tung cot
		while (rs2.next()) {
			String c0 = rs2.getString("column_name");
			if (!c0.equalsIgnoreCase(tab0 + "_id")) {
				String type = rs2.getString("data_type");
				String scale = rs2.getString("data_scale");
				String t = null;
				if (type.equals("DATE")) {
					t = "Date";
				} else if (type.equals("NUMBER")) {
					if (!"0".equals(scale)) {
						t = "Double";
					} else {
						t = "Long";
					}
				} else if (type.equals("NVARCHAR2") || type.equals("VARCHAR2")) {
					t = "String";
					if (type.equals("VARCHAR2")) {
						System.out.println(tab0 + ", " + c0 + ", " + type);
					}
				} else {
					System.out.println(tab0 + ", " + c0 + ", " + type);
				}

				if (t != null) {
					bo.addColumn(c0, t);
				}
			}
		}

		rs2.close();
		stm2.close();

		bo.writeFile();
	}
}
