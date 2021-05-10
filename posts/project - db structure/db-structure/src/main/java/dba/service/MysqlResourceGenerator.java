package dba.service;

import app.util.Utils;
import java.io.PrintWriter;
import java.sql.Statement;
import java.sql.ResultSet;
import java.io.File;
import java.io.FileReader;
import java.sql.DriverManager;
import java.sql.Connection;
import java.util.Properties;

/**
 * Sinh file BO, hbm, hibernate.
 *
 * @author gpdn_huyennv1
 */
public class MysqlResourceGenerator {

    public MysqlResourceGenerator() throws Exception {
        // <editor-fold defaultstate="collapsed" desc="Doc file cau hinh, ket noi CSDL">
        Properties prop = new Properties();
        prop.load(new FileReader(new File(Utils.CONFIG_FILE)));
        String url = prop.getProperty("url");
        String driver = prop.getProperty("driver");
        String username = prop.getProperty("username");
        String password = prop.getProperty("password");
        Class.forName(driver).newInstance();
        Connection connection = DriverManager.getConnection(url, username, password);
        Statement statement = connection.createStatement();
        // </editor-fold>

        PrintWriter writer = new PrintWriter(new File("ApplicationResources.properties"));
        StringBuilder sql = new StringBuilder(" SHOW FULL TABLES ");
        ResultSet resultSet = statement.executeQuery(sql.toString());
        while (resultSet.next()) {
            if (resultSet.getString(2).equals("BASE TABLE")) {
                String tableName1 = resultSet.getString(1);
                String tableName2 = Utils.columnName(tableName1);
                writer.println("common." + tableName2 + " = ");
                writer.println("# " + tableName2);
                Statement columnStatement = connection.createStatement();
                ResultSet rs = columnStatement.executeQuery(" SHOW FULL COLUMNS FROM " + tableName1);
                while (rs.next()) {
                    String columnName1 = rs.getString(1);
                    String columnName2 = Utils.columnName(columnName1);
                    writer.println(tableName2 + "." + columnName2 + " = ");
                }
                writer.println();
                rs.close();
                columnStatement.close();
            }
        }

        // <editor-fold defaultstate="collapsed" desc="Dong file, ket noi">
        writer.close();

        resultSet.close();
        statement.close();
        connection.close();
        // </editor-fold>
    }
}
