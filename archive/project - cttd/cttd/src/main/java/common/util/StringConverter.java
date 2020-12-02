package common.util;

import java.util.Date;

import org.apache.commons.beanutils.Converter;

public class StringConverter implements Converter {

	@Override
	public Object convert(Class type, Object value) {
		if (value == null) {
			return null;
		} else if (value instanceof Date) {
			return DateTimeUtil.convertDateToString((Date) value);
		} else if (value instanceof Long) {
			return Formater.formatNumber((Long) value);
		} else if (value instanceof Double) {
			return Formater.formatNumber((Double) value);
		} else {
			return value.toString();
		}
	}
}