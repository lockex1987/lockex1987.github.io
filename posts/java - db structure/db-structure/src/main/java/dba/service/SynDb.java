/*
 * NVH.
 */
package dba.service;

import common.util.Jdbc;
import java.io.File;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

/**
 * Select from one database, then insert data into another database.
 *
 * @author huyennv
 */
public class SynDb {

    private String preScript;
    private List<ProcessBean> processList;

    public SynDb() throws Exception {
        Connection srcCon = Jdbc.openDatabase("./_etc/src.properties");
        Connection destCon = Jdbc.openDatabase("./_etc/dest.properties");
        initBusiness();

        if (preScript != null) {
            CallableStatement cs = destCon.prepareCall(preScript);
            cs.executeUpdate();
            cs.close();
        }

        // Statement vs PreparedStatement vs CallableStatement
        for (ProcessBean e : processList) {
            int n = this.countCharacter(e.storedProcedure);
            Statement stm = srcCon.createStatement();
            ResultSet rs = stm.executeQuery(e.selectStatement);
            PreparedStatement cs = destCon.prepareStatement(e.storedProcedure);
            int count = 1;
            while (rs.next()) {
                System.out.println(count);
                count++;
                for (int i = 0; i < n; i++) {
                    Object obj = rs.getObject(i + 1);
                    if (obj != null) {
                        cs.setObject(i + 1, obj);
                    } else {
                        cs.setNull(i + 1, e.types[i]);
                    }
                }
                cs.executeUpdate();
            }
            rs.close();
            cs.close();
            stm.close();
        }

        srcCon.close();
        destCon.close();
    }

    private void initBusiness() throws Exception {
        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        Document doc = builder.parse(new File("./_etc/config.xml"));
        //doc.getDocumentElement().normalize();

        preScript = null;
        NodeList nodeList = doc.getElementsByTagName("preScript");
        if (nodeList != null && nodeList.getLength() > 0) {
            preScript = nodeList.item(0).getTextContent();
        }
        System.out.println("preScript: " + preScript);

        NodeList list = doc.getElementsByTagName("process");
        processList = new ArrayList<>(list.getLength());
        for (int i = 0; i < list.getLength(); i++) {
            Element e = (Element) list.item(i);
            String stm = e.getElementsByTagName("selectStatement").item(0).getTextContent();
            String proc = e.getElementsByTagName("storedProcedure").item(0).getTextContent();
            String temp = e.getElementsByTagName("types").item(0).getTextContent().trim();
            int[] types = null;
            if (!temp.isEmpty()) {
                String[] a = temp.split(",");
                types = new int[a.length];
                for (int k = 0; k < types.length; k++) {
                    String s = a[k].trim().toLowerCase();
                    switch (s) {
                        case "int":
                            types[k] = Types.INTEGER;
                            break;
                        case "nvarchar":
                            types[k] = Types.NVARCHAR;
                            break;
                        case "date":
                            types[k] = Types.DATE;
                            break;
                        case "double":
                            types[k] = Types.DOUBLE;
                            break;
                        case "varchar":
                            types[k] = Types.VARCHAR;
                            break;
                    }
                }
            }
            System.out.println("selectStatement: " + stm);
            System.out.println("storedProcedure: " + proc);
            System.out.println("------------");
            processList.add(new ProcessBean(stm, proc, types));
        }
    }

    /**
     * Dem so lan xuat hien dau ?
     *
     * @param text
     * @return So lan
     */
    private int countCharacter(String text) {
        int a = text.length();
        int b = text.replace("?", "").length();
        return a - b;
    }

    class ProcessBean {

        public String selectStatement;
        public String storedProcedure;
        public int[] types;

        public ProcessBean(String selectStatement, String storedProcedure, int[] types) {
            this.selectStatement = selectStatement;
            this.storedProcedure = storedProcedure;
            this.types = types;
        }
    }
}
