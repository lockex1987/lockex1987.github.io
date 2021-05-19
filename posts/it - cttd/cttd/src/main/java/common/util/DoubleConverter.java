package common.util;

import org.apache.commons.beanutils.Converter;

public class DoubleConverter implements Converter {

	@Override
	public Object convert(Class type, Object value) {
		if (value == null) {
			return null;
		} else if (value instanceof String) {
			if (value.toString().length() == 0) {
				return null;
			} else {
				return Double.parseDouble(value.toString());
			}
		} else {
			return value;
		}
	}
}
