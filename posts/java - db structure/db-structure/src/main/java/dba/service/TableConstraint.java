package dba.service;

import app.util.Utils;
import common.util.Jdbc;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

public class TableConstraint {

    private PreparedStatement listTableStatment;
    private Statement stmt;
    private int level = 0;

    public TableConstraint(String tableName, String idList) throws Exception {
        Connection con = Jdbc.openDatabase(Utils.CONFIG_FILE);
        listTableStatment = con.prepareStatement(" SELECT utc.table_name FROM user_tab_columns utc WHERE utc.column_name = ? ");
        stmt = con.createStatement();

        process(tableName, idList, tableName + "_ID");

        listTableStatment.close();
        stmt.close();
        con.close();
    }

    private void process(String tableName, String idList, String parentId) {
        try {
            //System.out.println(tableName);
            String idName = tableName + "_ID";
            String sql = " SELECT wm_concat(" + idName + ") AS id_list "
                    + " FROM " + tableName
                    + " WHERE " + parentId + " IN (" + idList + ") ";
            ResultSet idResult = stmt.executeQuery(sql);
            if (idResult.next()) {
                String temp = idResult.getString("id_list");
                if (temp != null) {
                    level++;
                    listTableStatment.setString(1, idName);
                    ResultSet result = listTableStatment.executeQuery();
                    List<String> list = new LinkedList<String>();
                    while (result.next()) {
                        String s = result.getString("table_name");
                        if (!s.equals(tableName) && !s.startsWith("V_") && !s.startsWith("BIN")) {
                            list.add(s);
                        }
                    }
                    for (String s : list) {
                        process(s, temp, tableName + "_ID");
                    }

                    result.close();
                    level--;

                    for (int i = 0; i < level; i++) {
                        System.out.print("  ");
                    }
                    sql = "DELETE FROM " + tableName + " WHERE " + idName + " IN (" + temp + "); ";
                    System.out.println(sql);
                    //stmt.executeUpdate(sql);
                }
            }
            idResult.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
