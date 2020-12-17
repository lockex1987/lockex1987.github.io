package dba.service;

import java.io.File;
import java.io.FileReader;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import app.util.Utils;
import common.util.Jdbc;

public class BaseBoGenerator {

	protected Connection con;
	protected String pack;
	protected List<String> tables;

	public void generate() throws Exception {
		con = Jdbc.openDatabase(Utils.CONFIG_FILE);
		init();
		List<String> tableList = getTableList();
		for (String tab : tableList) {
			processTable(tab);
		}
		con.close();
	}

	private void init() throws Exception {
		Properties prop = new Properties();
		prop.load(new FileReader(new File(Utils.CONFIG_FILE)));
		pack = prop.getProperty("boPackage");
		String[] a = prop.getProperty("singleTable").trim().split(",");
		tables = new ArrayList<>();
		for (String table : a) {
			table = table.trim();
			if (!table.isEmpty()) {				
				tables.add(table);
			}
		}
	}

	protected List<String> getTableList() throws Exception {
		return null;
	}

	protected void processTable(String tab) throws Exception {

	}
}
