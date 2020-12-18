package common.util;

import org.apache.commons.beanutils.Converter;

public class DateConverter implements Converter {

	@Override
	public Object convert(Class type, Object value) {
		if (value == null) {
			return null;
		} else if (value instanceof String) {
			return DateTimeUtil.convertStringToDate(value.toString());
		} else {
			return value;
		}
	}
}