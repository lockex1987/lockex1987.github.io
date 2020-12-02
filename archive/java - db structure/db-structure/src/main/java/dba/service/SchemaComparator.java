package dba.service;

import java.sql.Statement;
import java.sql.ResultSet;
import java.io.File;
import java.io.FileReader;
import java.sql.DriverManager;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * So sanh hai schema xem su khac nhau.
 * Khac nhau ve bang va cau truc bang.
 * @author HuyenNV1
 */
public class SchemaComparator {

    public SchemaComparator() throws Exception {
        List<Object[]> list1 = getColumnList(1);
        List<Object[]> list2 = getColumnList(2);
        int i1 = 0;
        int i2 = 0;
        while (i1 < list1.size() && i2 < list2.size()) {
            Object[] a1 = (i1 < list1.size()) ? list1.get(i1) : null;
            Object[] a2 = (i2 < list2.size()) ? list2.get(i2) : null;

            if (a2 == null) {
                System.out.println("Schema 1 thua: " + a1[0] + "." + a1[1] + ": " + a1[2] + "(" + a1[3] + "," + a1[4] + ")");
                i1++;
            } else if (a1 == null) {
                System.out.println("Schema 2 thua: " + a2[0] + "." + a2[1] + ": " + a2[2] + "(" + a2[3] + "," + a2[4] + ")");
                i2++;
            } else {
                if (a2[0].equals(a1[0])
                        && a2[1].equals(a1[1])
                        && a2[2].equals(a1[2])
                        && a2[3].equals(a1[3])
                        && a2[4].equals(a1[4])) {
                    i1++;
                    i2++;
                } else if (a2[0].equals(a1[0]) && a2[1].equals(a1[1])) {
                    System.out.println("Khac nhau du lieu:");
                    System.out.println("    Schema 1: " + a1[0] + "." + a1[1] + ": " + a1[2] + "(" + a1[3] + "," + a1[4] + ")");
                    System.out.println("    Schema 2: " + a2[0] + "." + a2[1] + ": " + a2[2] + "(" + a2[3] + "," + a2[4] + ")");
                    i1++;
                    i2++;
                } else {
                    String s1 = a1[0] + "." + a1[1];
                    String s2 = a2[0] + "." + a2[1];
                    if (s2.compareTo(s1) > 0) {
                        System.out.println("Schema 1 thua: " + a1[0] + "." + a1[1] + ": " + a1[2] + "(" + a1[3] + "," + a1[4] + ")");
                        i1++;
                    } else {
                        System.out.println("Schema 2 thua: " + a2[0] + "." + a2[1] + ": " + a2[2] + "(" + a2[3] + "," + a2[4] + ")");
                        i2++;
                    }
                }
            }
        }
    }

    private List<Object[]> getColumnList(int schema) throws Exception {
        Properties prop = new Properties();
        prop.load(new FileReader(new File("./_etc/schemaComparator.properties")));
        String url = prop.getProperty("url" + schema);
        String username = prop.getProperty("username" + schema);
        String password = prop.getProperty("password" + schema);
        Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
        Connection connection = DriverManager.getConnection(url, username, password);
        Statement statement = connection.createStatement();

        String sql = " SELECT "
                + "     utc.table_name, "
                + "     utc.column_name, "
                + "     utc.data_type, "
                + "     utc.data_length, "
                + "     NVL(utc.data_scale, 0) AS data_scale, "
                + "     utc.char_length "
                + " FROM User_Tab_Columns utc "
                + " ORDER BY utc.table_name, utc.column_name ";
        ResultSet resultSet = statement.executeQuery(sql);
        List<Object[]> list = new ArrayList<Object[]>();
        while (resultSet.next()) {
            Object[] a = new Object[5];
            a[0] = resultSet.getString("table_name");
            a[1] = resultSet.getString("column_name");
            a[2] = resultSet.getString("data_type");
            if (a[2].equals("NVARCHAR2")) {
                a[3] = resultSet.getString("char_length");
                a[4] = "0";
            } else {
                a[3] = resultSet.getString("data_length");
                a[4] = resultSet.getString("data_scale");
            }
            list.add(a);
            //System.out.println(a[0] + "." + a[1] + ": " + a[2] + "(" + a[3] + "," + a[4] + ")");
        }

        resultSet.close();
        statement.close();
        connection.close();
        return list;
    }
}
