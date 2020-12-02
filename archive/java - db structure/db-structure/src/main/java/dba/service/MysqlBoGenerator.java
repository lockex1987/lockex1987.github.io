package dba.service;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import dba.bean.BoFile;

/**
 * Sinh file BO.
 *
 * @author lockex1987
 */
public class MysqlBoGenerator extends BaseBoGenerator {

	@Override
	protected List<String> getTableList() throws Exception {
		String sql = " SHOW FULL TABLES ";
		Statement stm = con.createStatement();
		ResultSet rs = stm.executeQuery(sql);
		List<String> tableList = new ArrayList<>();

		while (rs.next()) {
			if (rs.getString(2).equals("BASE TABLE")) {
				String tab = rs.getString(1);
				if (tables.isEmpty() || tables.contains(tab)) {
					tableList.add(tab);
				}
			}
		}

		rs.close();
		stm.close();
		return tableList;
	}

	@Override
	protected void processTable(String tab) throws Exception {
		BoFile bo = new BoFile(tab, pack, BoFile.MY_SQL);

		Statement stm = con.createStatement();
		ResultSet rs = stm.executeQuery(" SHOW FULL COLUMNS FROM " + tab);

		// Xu ly tung cot
		while (rs.next()) {
			String col = rs.getString(1);
			String orginalType = rs.getString(2).toLowerCase();

			// Bo qua cac cot la ID
			if (!col.equalsIgnoreCase(tab + "_id")) {
				String type = null;
				if (orginalType.startsWith("int") || orginalType.startsWith("tinyint")
						|| orginalType.startsWith("bigint") || orginalType.startsWith("smallint")) {
					type = "Long";
				} else if (orginalType.startsWith("date") || orginalType.startsWith("timestamp")) {
					type = "Date";
				} else if (orginalType.startsWith("float")) {
					type = "Long";
				} else if (orginalType.startsWith("decimal")) {
					if (orginalType.endsWith(",0)")) {
						type = "Long";
					} else {
						type = "Double";
					}
				} else if (orginalType.startsWith("nvarchar") || orginalType.startsWith("varchar")
						|| orginalType.startsWith("longblob") || orginalType.startsWith("char")) {
					type = "String";
				} else {
					System.out.println(tab + ", " + col + ", " + orginalType);
				}

				if (type != null) {
					bo.addColumn(col, type);
				}
			}
		}

		// Dong tai nguyen
		rs.close();
		stm.close();

		// Ghi file
		bo.writeFile();
	}
}
