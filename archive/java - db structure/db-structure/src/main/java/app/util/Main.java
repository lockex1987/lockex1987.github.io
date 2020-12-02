/*
 * NVH.
 */
package app.util;

import dba.service.MysqlBoGenerator;

/**
 * Tien ich voi CSDL.
 * 
 * @author lockex1987
 */
public class Main {

	public static void main(String[] args) throws Exception {
		// new OracleResourceGenerator();
		// new RenameConstraint();
		// new OracleHibernateGeneratorAnno();
		new MysqlBoGenerator().generate();
		// new OracleHibernateGenerator();
		// new OracleResourceGenerator();
		// new TableConstraint(args[0], args[1]); // HD_CONTRACT
		// new ChangeConstraint(args[0], args[1], args[2]); // HD_CONTRACT
		// new DeleteTable();
		// new SchemaComparator();
		// new ExecuteCommand();
		// new CharsetConverter();
		// new SynDB();
	}
	
	
}
