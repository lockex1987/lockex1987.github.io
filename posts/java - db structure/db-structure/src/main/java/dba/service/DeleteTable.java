package dba.service;

import app.util.Utils;
import common.util.Jdbc;
import java.io.File;
import java.io.FileReader;
import java.util.Properties;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;

/**
 * Sinh file BO, hbm, hibernate.
 * @author gpdn_huyennv1
 */
public class DeleteTable {

    private PreparedStatement statement;
    private int level = 0;
    private List<String> tableList = new LinkedList<String>();

    public DeleteTable() throws Exception {
        Properties prop = new Properties();
        prop.load(new FileReader(new File(Utils.CONFIG_FILE)));
        String singleTable = prop.getProperty("singleTable");

        Connection con = Jdbc.openDatabase(Utils.CONFIG_FILE);
        statement = con.prepareStatement(" SELECT uc1.table_name "
                + " FROM user_constraints uc1, User_Constraints uc2 "
                + " WHERE uc2.table_name = ? "
                + " AND uc1.constraint_type = 'R' "
                + " AND uc2.constraint_name = uc1.r_constraint_name ");

        process(singleTable);

        statement.close();
        con.close();
    }

    private void process(String tableName) throws Exception {
        statement.setString(1, tableName);
        ResultSet result = statement.executeQuery();
        List<String> list = new LinkedList<String>();
        while (result.next()) {
            String s = result.getString("table_name");
            if (!s.equals(tableName)
                    && !s.startsWith("V_")
                    && !s.startsWith("BIN")
                    && !tableList.contains(s)) {
                list.add(s);
                tableList.add(s);
            }
        }
        result.close();

        level++;
        for (String s : list) {
            process(s);
        }
        level--;

        for (int i = 0; i < level; i++) {
            System.out.print("  ");
        }
        String sql = "DELETE FROM " + tableName + ";";
        System.out.println(sql);
    }
}
