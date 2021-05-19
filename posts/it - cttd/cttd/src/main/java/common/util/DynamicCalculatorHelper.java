package common.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import common.bean.DynamicExpression;

public class DynamicCalculatorHelper {

	/**
	 * Convert (utility function).
	 *
	 * @param map
	 *            Doi tuong map
	 * @return Danh sach tieu chuan
	 */
	public static List<DynamicExpression> convertMapToCriterionList(Map<String, Object> map) {
		if (map == null) {
			return null;
		}
		List<DynamicExpression> expList = new ArrayList<DynamicExpression>(map.size());
		Set<Entry<String, Object>> entrySet = map.entrySet();
		for (Entry<String, Object> e : entrySet) {
			Object value = e.getValue();
			if (value == null) {
				expList.add(new DynamicExpression(e.getKey(), value));
			} else if (value instanceof BigDecimal) {
				expList.add(new DynamicExpression(e.getKey(), ((BigDecimal) value).doubleValue()));
			} else if (value instanceof String) {
				expList.add(new DynamicExpression(e.getKey(), ((String) value).trim()));
			} else if (value instanceof Character) {
				expList.add(new DynamicExpression(e.getKey(), String.valueOf((Character) value).trim()));
			} else {
				expList.add(new DynamicExpression(e.getKey(), value));
			}
		}
		return expList;
	}

	/**
	 * Convert (utility function).
	 *
	 * @param pairList
	 *            Danh sach cap (truong - gia tri).
	 * @return Danh sach tieu chuan
	 */
	public static List<DynamicExpression> convertPairListToCriterionList(List<Object[]> pairList) {
		if (pairList == null) {
			return null;
		}
		List<DynamicExpression> expList = new ArrayList<DynamicExpression>(pairList.size());
		for (Object[] e : pairList) {
			String key = (String) e[0];
			Object value = e[1];
			if (value instanceof BigDecimal) {
				expList.add(new DynamicExpression(key, ((BigDecimal) value).doubleValue()));
			} else if (value instanceof String) {
				expList.add(new DynamicExpression(key, ((String) value).trim()));
			} else {
				expList.add(new DynamicExpression(key, value));
			}
		}
		return expList;
	}
}
