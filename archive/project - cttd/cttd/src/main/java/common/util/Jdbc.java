/*
 * NVH.
 */
package common.util;

import java.io.File;
import java.io.FileReader;
import java.sql.DriverManager;
import java.sql.Connection;
import java.util.Properties;

/**
 *
 * @author gpdn_huyennv1
 */
public class Jdbc {

	public static Connection openDatabase(String configFile) throws Exception {
		Properties prop = new Properties();
		prop.load(new FileReader(new File(configFile)));
		String driver = prop.getProperty("driver");
		String url = prop.getProperty("url");
		String user = prop.getProperty("username");
		String pass = prop.getProperty("password");
		return openDatabase(driver, url, user, pass);
	}

	/**
	 * 1. Oracle jar = ojdbc<version>.jar driver = oracle.jdbc.driver.OracleDriver url =
	 * jdbc:oracle:thin:@<server>:<port, often 1521>:<sid>
	 * eg: jdbc:oracle:thin:@10.58.71.164:1521:dbmss01 RAC:
	 * url=jdbc:oracle:thin:@(DESCRIPTION=(LOAD_BALANCE=yes)(ADDRESS=(PROTOCOL=TCP)(HOST=10.60.6.177)(PORT=1521))(ADDRESS=
	 * (PROTOCOL=TCP)(HOST=10.60.6.178)(PORT=1521))(CONNECT_DATA=(FAILOVER_MODE=(TYPE=select)(METHOD=basic)(RETRIES=180)(
	 * DELAY=5))(SERVICE_NAME=qlts)))
	 *
	 * 2. MySQL jar = mysql-connector-java-<version>-bin.jar
	 * driver = com.mysql.jdbc.Driver
	 * url: jdbc:mysql://<server>:<port, often 3306>/<database>
	 * eg: jdbc:mysql://127.0.0.1:3306/uw
	 *
	 * 3. PostgreSQL jar = postgresql-9.0-801.jdbc4.jar?
	 *
	 * 4. SQL Server jar = sqlserver.jar? driver = com.microsoft.sqlserver.jdbc.SQLServerDriver ?
	 * url = jdbc:sqlserver://MYSERVER;databaseName=MYDATABASE; ?
	 */
	public static Connection openDatabase(String driver, String url, String user, String pass) throws Exception {
		Class.forName(driver).newInstance();
		Connection con = DriverManager.getConnection(url, user, pass);
		return con;
	}
}
