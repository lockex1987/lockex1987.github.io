package common.util;

import java.util.ArrayList;
import java.util.List;

//import org.hibernate.SQLQuery;

import common.bean.DynamicExpression;

public class DynamicCalculatorDb {

	/**
	 * Chen vao CSDL (tong quat).
	 *
	 * @param expressionList
	 * @param table
	 */
	public void insertIntoDatabase(List<DynamicExpression> expressionList, String table) {
//		final String NULL_COLUMN = "-1";
//		StringBuilder strHead = new StringBuilder(" INSERT INTO " + table + "(" + table + "_id");
//		StringBuffer strTail = new StringBuffer(") VALUES (" + table + "_SEQ.nextval");
//		List<Object> paramList = new ArrayList<>();
//		for (DynamicExpression e : expressionList) {
//			if (e.getColumn() != null && !e.getColumn().equals(NULL_COLUMN) && e.getValue() != null) {
//				strHead.append(", ").append(e.getColumn());
//				strTail.append(", ?");
//				paramList.add(e.getValue());
//			}
//		}
//		strHead.append(strTail).append(") ");
//		SQLQuery query = DBUtil.createSQLQuery(strHead.toString());
//		for (int i = 0; i < paramList.size(); i++) {
//			query.setParameter(i, paramList.get(i));
//		}
//		query.executeUpdate();
	}

	// TODO: Fixing Oracle database
	public void updateDatabase(List<DynamicExpression> expressionList, String table, Long idValue) {
//		final String NULL_COLUMN = "-1";
//		StringBuilder strHead = new StringBuilder(" UPDATE " + table + " SET " + table + "_id = ? ");
//		List<Object> paramList = new ArrayList<Object>();
//		paramList.add(idValue);
//		for (DynamicExpression e : expressionList) {
//			if (e.getColumn() != null && !e.getColumn().equals(NULL_COLUMN) && e.getValue() != null) {
//				strHead.append(" ,").append(e.getColumn()).append(" = ?");
//				paramList.add(e.getValue());
//			}
//		}
//		strHead.append(" WHERE " + table + "_id = ? ");
//		paramList.add(idValue);
//		SQLQuery query = DBUtil.createSQLQuery(strHead.toString());
//		for (int i = 0; i < paramList.size(); i++) {
//			query.setParameter(i, paramList.get(i));
//		}
//		query.executeUpdate();
	}
}
