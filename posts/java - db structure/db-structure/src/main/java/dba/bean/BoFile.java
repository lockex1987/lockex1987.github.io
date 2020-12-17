package dba.bean;

import java.io.File;
import java.io.PrintWriter;

import app.util.Utils;

public class BoFile {

	public static final int MY_SQL = 1;
	public static final int ORACLE = 1;

	private final String pack;
	private final String tab0;
	private final String tab1;
	private final String tab2;
	private final String tab3;
	private final StringBuilder declare;
	private final StringBuilder getset;

	public BoFile(String tab0, String pack, int type) {
		this.pack = pack;

		this.tab0 = tab0; // BO_BEAN or Bo_Bean
		this.tab1 = tab0.toLowerCase(); // bo_bean
		this.tab2 = Utils.columnName(tab1); // boBean
		this.tab3 = Utils.tableName(tab1); // BoBean

		declare = new StringBuilder();
		declare.append("    private Long " + tab2 + "Id;\r\n");

		getset = new StringBuilder();
		getset.append("    @Id\r\n");
		if (type == MY_SQL) {
			getset.append("    @GeneratedValue(strategy=GenerationType.IDENTITY)\r\n");
		} else if (type == ORACLE) {
			getset.append("    @SequenceGenerator(name = \"" + tab1 + "_generator\", sequenceName = \"" + tab1
					+ "_seq\", allocationSize = 1)\r\n");
			getset.append(
					"    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = \"" + tab1 + "_generator\")\r\n");
		}
		getset.append("    @Column(name = \"" + tab1 + "_id\")\r\n");
		getset.append("    public Long get" + tab3 + "Id() {\r\n");
		getset.append("        return " + tab2 + "Id;\r\n");
		getset.append("    }\r\n");
		getset.append("\r\n");
		getset.append("    public void set" + tab3 + "Id(Long " + tab2 + "Id) {\r\n");
		getset.append("        this." + tab2 + "Id = " + tab2 + "Id;\r\n");
		getset.append("    }\r\n");
	}

	public void writeFile() throws Exception {
		PrintWriter w = new PrintWriter(new File(Utils.OUTPUT_FOLDER + tab3 + "Bo.java"));
		w.println("package " + pack + ";");
		w.println();
		w.println("import javax.persistence.Entity;");
		w.println("import javax.persistence.Table;");
		w.println("import javax.persistence.Id;");
		w.println("import javax.persistence.Column;");
		w.println("import javax.persistence.SequenceGenerator;");
		w.println("import javax.persistence.GeneratedValue;");
		w.println("import javax.persistence.GenerationType;");
		w.println("import javax.persistence.Temporal;");
		w.println("import javax.persistence.TemporalType;");
		w.println("import java.util.Date;");
		w.println();
		w.println("@Entity");
		w.println("@Table(name = \"" + tab0 + "\")");
		w.println("public class " + tab3 + "Bo {");
		w.println();
		w.println(declare);
		w.println("    public " + tab3 + "Bo() {");
		w.println("    }");
		w.println();
		w.println(getset + "}");
		w.close();

	}

	public void addColumn(String c0, String t) {
		// c0: BO_BEAN_ID or bo_bean_id
		String c1 = c0.toLowerCase(); // bo_bean_id
		String c2 = Utils.columnName(c1); // boBeanId
		String c3 = Utils.tableName(c1); // BoBeanId

		declare.append("    private " + t + " " + c2 + ";\r\n");

		getset.append("\r\n");
		getset.append("    @Column(name = \"" + c1 + "\")\r\n");
		if (t.equals("Date")) {
			getset.append("    @Temporal(TemporalType.TIMESTAMP)\r\n");
		}
		getset.append("    public " + t + " get" + c3 + "() {\r\n");
		getset.append("        return " + c2 + ";\r\n");
		getset.append("    }\r\n");
		getset.append("\r\n");
		getset.append("    public void set" + c3 + "(" + t + " " + c2 + ") {\r\n");
		getset.append("        this." + c2 + " = " + c2 + ";\r\n");
		getset.append("    }\r\n");
	}
}
