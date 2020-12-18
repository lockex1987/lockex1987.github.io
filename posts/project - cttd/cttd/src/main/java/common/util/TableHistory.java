/*
 * Copyright (C) 2010 Viettel Telecom. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package common.util;

import java.util.List;
import java.util.Map;
import org.hibernate.Query;

/**
 * Luu lich su thay doi.
 * 
 * @author HuyenNV
 * @since 1.0
 * @version 1.0
 */
public class TableHistory extends DBUtil {

	private final String table;
	private final Long employeeId;
	private final Long sysUserId;
	private Map<String, String> oldMap;
	private Map<String, String> newMap;

	public TableHistory(String table, Long employeeId, Long sysUserId, Object oldObject, Object newObject)
			throws Exception {
		this.table = null; // CommonUtils.getApplicationResource(table);
		this.employeeId = employeeId;
		this.sysUserId = sysUserId;

		if ((oldObject != null) && (newObject != null)) {
			// ViettelBeanUtil beanUtilsBean = new ViettelBeanUtil();
			this.oldMap = null;// beanUtilsBean.describe(oldObject);
			this.newMap = null;// beanUtilsBean.describe(newObject);
		}
	}

	public void addPlainField(String field, String name) {
		String oldValue = this.nvl(oldMap.get(field));
		String newValue = this.nvl(newMap.get(field));
		if (!newValue.equals(oldValue)) {
			saveDifferent(name, this.getPlainValue(oldValue), this.getPlainValue(newValue));
		}
	}

	public void addPlainField(String name, String oldValue, String newValue) {
		oldValue = this.nvl(oldValue);
		newValue = this.nvl(newValue);
		if (!newValue.equals(oldValue)) {
			saveDifferent(name, this.getPlainValue(oldValue), this.getPlainValue(newValue));
		}
	}

	public void addCheckboxField(String field, String name) {
		String oldValue = oldMap.get(field);
		String newValue = newMap.get(field);
		if ((newValue == null && oldValue != null) || (newValue != null && !newValue.equals(oldValue))) {
			saveDifferent(name, this.getCheckboxValue(oldValue), this.getCheckboxValue(newValue));
		}
	}

	public void addComboboxField(String field, String name, String[] values) {
		String oldValue = oldMap.get(field);
		String newValue = newMap.get(field);

		boolean different = false;
		if (newValue == null) {
			if (oldValue != null) {
				different = true;
			}
		} else {
			if (newValue.equals("0")) {
				if (oldValue != null) {
					different = true;
				}
			} else {
				if (!newValue.equals(oldValue)) {
					different = true;
				}
			}
		}

		if (different) {
			saveDifferent(name, this.getComboboxValue(oldValue, values), this.getComboboxValue(newValue, values));
		}
	}

	public void addReferenceField(String field, String name, String refTable, String refField, String refName) {
		String oldValue = oldMap.get(field);
		String newValue = newMap.get(field);

		boolean different = false;
		if (newValue == null) {
			if (oldValue != null) {
				different = true;
			}
		} else {
			if (newValue.equals("0")) {
				if (oldValue != null) {
					different = true;
				}
			} else {
				if (!newValue.equals(oldValue)) {
					different = true;
				}
			}
		}

		if (different) {
			saveDifferent(name, this.getReferenceFieldValue(oldValue, refTable, refField, refName),
					this.getReferenceFieldValue(newValue, refTable, refField, refName));
		}
	}

	public void addReferenceTable(String name, String refTable, String refField, String refName,
			List<Long> oldList, List<Long> newList) {
		if (this.haveDifferent(oldList, newList)) {
			saveDifferent(name,
					this.getReferenceTableValue(oldList, refTable, refField, refName),
					this.getReferenceTableValue(newList, refTable, refField, refName));
		}
	}

	private void saveDifferent(String column, String oldValue, String newValue) {
		// InfoChangeBO bo = new InfoChangeBO();
		// bo.setChangedFields(CommonUtils.getApplicationResource(column));
		// bo.setDataBeforeChange(oldValue);
		// bo.setDataAfterChange(newValue);
		// bo.setChangeTime(new Date());
		// bo.setChangeType(table);
		// bo.setEmployeeId(employeeId);
		// bo.setSysUserId(sysUserId);
		// save(bo);
	}

	private String getPlainValue(String obj) {
		return (obj == null) ? "" : obj;
	}

	private String getCheckboxValue(String obj) {
		return ("1".equals(obj)) ? "Có" : "Không";
	}

	private String getComboboxValue(String obj, String[] values) {
		if (obj == null) {
			return "";
		} else {
			int temp = Integer.parseInt(obj.toString());
			return (temp == 0) ? "" : values[temp];
		}
	}

	public String getReferenceFieldValue(String id, String refTable, String refField, String refName) {
		if (id == null) {
			return "";
		} else {
			String hql = " SELECT " + refName + " FROM " + refTable + " WHERE " + refField + " = " + id;
			Query query = new DBUtil().createQuery(hql);
			query.setMaxResults(1);
			return (String) query.uniqueResult();
		}
	}

	private String getReferenceTableValue(List<Long> idList, String refTable, String refField, String refName) {
		if (idList == null || idList.isEmpty()) {
			return "";
		} else {
			String hql = " SELECT " + refName + " FROM " + refTable + " WHERE " + refField + " IN (:arrId) ";
			Query query = new DBUtil().createQuery(hql);
			query.setParameterList("arrId", idList);
			List<String> list = query.list();
			StringBuilder stringBuilder = new StringBuilder();
			for (String s : list) {
				stringBuilder.append(", ").append(s);
			}
			return stringBuilder.toString().substring(2);
		}
	}

	/**
	 * Ham so sanh 2 danh sach Long.
	 * 
	 * @param oldList
	 *          Danh sach ID 1
	 * @param newList
	 *          Danh sach ID 2
	 * @return boolean true neu khac, false neu ko
	 */
	private boolean haveDifferent(List<Long> oldList, List<Long> newList) {
		for (Long n1 : oldList) {
			boolean found = false;
			for (Long n2 : newList) {
				if (n2.equals(n1)) {
					found = true;
					break;
				}
			}
			if (!found) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Neu s null thi tra ve xau rong, neu khong thi tra ve gia tri cua s.
	 * 
	 * @param s
	 *          Xau truyen vao
	 * @return Neu s null thi tra ve xau rong, neu khong thi tra ve gia tri cua s
	 */
	private String nvl(String s) {
		return s == null ? "" : s;
	}
}
