package dba.service;

import app.util.Utils;
import common.util.Jdbc;
import java.io.PrintWriter;
import java.sql.Statement;
import java.sql.ResultSet;
import java.io.File;
import java.io.FileReader;
import java.sql.Connection;
import java.util.Properties;

/**
 * Sinh file BO, hbm, hibernate.
 * @author gpdn_huyennv1
 */
public class OracleResourceGenerator {

    public OracleResourceGenerator() throws Exception {
        Properties prop = new Properties();
        prop.load(new FileReader(new File(Utils.CONFIG_FILE)));
        String singleTable = prop.getProperty("singleTable");
        
        // <editor-fold defaultstate="collapsed" desc="Khoi tao">
        Connection con = Jdbc.openDatabase(Utils.CONFIG_FILE);
        Statement statement = con.createStatement();
        PrintWriter writer = new PrintWriter(new File("ApplicationResources.properties"));
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Ten cac bang">
        System.out.println("---------- Tables ------------");
        StringBuilder sql = new StringBuilder(" SELECT utc.table_name, utc.comments "
                + " FROM User_Tab_Comments utc "
                + " WHERE utc.table_name NOT LIKE 'V_%' ");
        if (singleTable != null && !singleTable.trim().isEmpty()) {
            sql.append(" AND utc.table_name IN ('LTTD'");
            String[] a = singleTable.trim().split(",");
            for (String s : a) {
                sql.append(", '" + s + "'");
            }
            sql.append(") ");
        }
        sql.append(" ORDER BY utc.table_name ");
        ResultSet resultSet = statement.executeQuery(sql.toString());
        while (resultSet.next()) {
            String tableName = resultSet.getString("table_name");
            String comments = resultSet.getString("comments");
            writer.println("common." + Utils.columnName(tableName) + " = " + comments);
            System.out.println(tableName);
        }
        resultSet.close();
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Ten cac cot">
        System.out.println("---------- Columns ------------");
        String currentTable = null;
        sql = new StringBuilder(" SELECT utc.table_name, utc.column_name, ucc.comments, uts.comments AS table_comment "
                + " FROM User_Tab_Columns utc, User_Col_Comments ucc, User_Tab_Comments uts "
                + " WHERE utc.table_name NOT LIKE 'V_%' "
                + " AND utc.table_name = ucc.table_name "
                + " AND utc.column_name = ucc.column_name "
                + " AND utc.table_name = uts.table_name ");
        if (singleTable != null && !singleTable.trim().isEmpty()) {
            sql.append(" AND utc.table_name IN ('LTTD'");
            String[] a = singleTable.trim().split(",");
            for (String s : a) {
                sql.append(", '" + s + "'");
            }
            sql.append(") ");
        }
        sql.append(" ORDER BY utc.table_name, utc.column_name ");
        resultSet = statement.executeQuery(sql.toString());
        while (resultSet.next()) {
            String tableName = resultSet.getString("table_name");
            String columnName = resultSet.getString("column_name");
            String comments = resultSet.getString("comments");
            String tableComment = resultSet.getString("table_comment");
            if (!tableName.equals(currentTable)) {
                writer.println();
                writer.println("# " + tableComment);
                currentTable = tableName;
            }
            writer.println(Utils.columnName(tableName) + "." + Utils.columnName(columnName) + " = " + comments);
            System.out.println(tableName + "." + columnName);
        }
        resultSet.close();
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Dong ket noi">
        writer.close();
        statement.close();
        con.close();
        // </editor-fold>
    }
}