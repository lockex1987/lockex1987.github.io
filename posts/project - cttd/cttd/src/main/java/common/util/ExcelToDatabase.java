package common.util;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;

import common.bean.ImportConfig;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ExcelToDatabase {

	/**
	 * Ten bang day vao CSDL
	 */
	private String tableName;

	/**
	 * Doi tuong day vao CSDL.
	 */
	private SQLQuery sqlQuery;

	/**
	 * Cau hinh
	 */
	private ImportConfig[] columnConfig;

	/**
	 * Thanh lap cau lenh INSERT. Dung di dung lai, co the tang hieu nang? Can dong dung cho ca MySQL
	 * va cac CSDL khac nua.
	 */
	public void initInsertQuery() {
		StringBuilder strHead = new StringBuilder(" INSERT INTO " + tableName + "(" + tableName + "_id");
		StringBuffer strTail = new StringBuffer(") VALUES (" + tableName + "_SEQ.nextval");
		for (ImportConfig cc : columnConfig) {
			if (!CommonUtils.isNullOrEmpty(cc.getDatabaseColumn())) {
				strHead.append(", ").append(cc.getDatabaseColumn());
				strTail.append(", ?");
			}
		}
		strHead.append(strTail).append(") ");
		sqlQuery = DBUtil.createSQLQuery(strHead.toString());
	}

	/**
	 * Thanh lap cau lenh INSERT. Dung di dung lai, co the tang hieu nang? Can dong dung cho ca MySQL
	 * va cac CSDL khac nua.
	 *
	 * @param sequenceName
	 */
	public void initInsertQuery(String sequenceName) {
		StringBuilder strHead = new StringBuilder(" INSERT INTO " + tableName + "(" + tableName + "_id");
		StringBuffer strTail = new StringBuffer(") VALUES (" + sequenceName + ".nextval");
		for (ImportConfig cc : columnConfig) {
			if (!cc.getDatabaseColumn().isEmpty()) {
				strHead.append(", ").append(cc.getDatabaseColumn());
				strTail.append(", ?");
			}
		}
		strHead.append(strTail).append(") ");
		sqlQuery = DBUtil.createSQLQuery(strHead.toString());
	}

	/**
	 * Thanh lap cau lenh INSERT. ID khong phai fix.
	 */
	public void initInsertQueryWithoutSequence() {
		StringBuilder strHead = new StringBuilder(" INSERT INTO " + tableName + "(");
		StringBuffer strTail = new StringBuffer(") VALUES ( ");
		for (ImportConfig cc : columnConfig) {
			if (!cc.getDatabaseColumn().isEmpty()) {
				strHead.append(cc.getDatabaseColumn()).append(", ");
				strTail.append("?, ");
			}
		}
		strHead.delete(strHead.length() - 2, strHead.length());
		strTail.delete(strTail.length() - 2, strTail.length());
		strHead.append(strTail).append(") ");
		sqlQuery = DBUtil.createSQLQuery(strHead.toString());
	}

	/**
	 * Tao cau lenh update
	 */
	public void initUpdateQuery() {
		StringBuilder sqlStr = new StringBuilder(" UPDATE " + tableName + " SET ");
		for (int col = 1; col < columnConfig.length - 1; col++) {
			if (!columnConfig[col].getDatabaseColumn().isEmpty()) {
				sqlStr.append(columnConfig[col].getDatabaseColumn());
				sqlStr.append(" = ? ,");
			}
		}
		sqlStr.replace(sqlStr.length() - 1, sqlStr.length(), " ");
		sqlStr.append(" WHERE ").append(tableName).append("_ID = ? ");
		sqlQuery = DBUtil.createSQLQuery(sqlStr.toString());
	}

	/**
	 * Chen vao CSDL.
	 *
	 * @param dataList
	 */
	public void executeUpdateDatabase(List<Object[]> dataList) throws Exception {
		// Nhung dong dau se duoc insert sau, ID SEQUENCE lon hon
		for (int i = dataList.size() - 1; i >= 0; i--) {
			Object[] a = dataList.get(i);
			this.executeUpdateDatabase(a);
		}
	}

	/**
	 * Chen vao CSDL.
	 *
	 * @param a
	 *          Mang doi tuong du lieu
	 */
	public void executeUpdateDatabase(Object[] a) throws Exception {
		try {
			int count = 0;
			for (int col = 0; col < columnConfig.length; col++) {
				if (!CommonUtils.isNullOrEmpty(columnConfig[col].getDatabaseColumn())) {
					if ((a[col] != null)) {
						sqlQuery.setParameter(count, a[col]);
					} else {
						Type type;
						if (columnConfig[col].getType().equals(ImportConfig.LONG)) {
							type = StandardBasicTypes.LONG;
						} else if (columnConfig[col].getType().equals(ImportConfig.DOUBLE)) {
							type = StandardBasicTypes.DOUBLE;
						} else if (columnConfig[col].getType().equals(ImportConfig.DATE)) {
							type = StandardBasicTypes.DATE;
						} else if (columnConfig[col].getType().equals(ImportConfig.BOOLEAN)) {
							type = StandardBasicTypes.BOOLEAN;
						} else if (columnConfig[col].getType().equals(ImportConfig.MMYYYY_DATE)) {
							type = StandardBasicTypes.DATE;
						} else {
							type = StandardBasicTypes.STRING;
						}
						sqlQuery.setParameter(count, null, type);
					}
					count++;
				}
			}
			sqlQuery.executeUpdate();
		} catch (Exception ex) {
			this.printErrorData(a);
			log.error("Loi khi cap nhat CSDL", ex);
			throw ex;
		}
	}

	/**
	 * Hien thi du lieu dong loi.
	 *
	 * @param a
	 *          Mang du lieu
	 */
	private void printErrorData(Object[] a) {
		for (int col = 0; col < columnConfig.length; col++) {
			if (columnConfig[col].getDatabaseColumn() != null && !columnConfig[col].getDatabaseColumn().isEmpty()
					&& (a[col] != null)) {
				log.error(columnConfig[col].getDatabaseColumn() + ": " + a[col]);
			}
		}
	}
}
