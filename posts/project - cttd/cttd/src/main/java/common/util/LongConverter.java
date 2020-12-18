package common.util;

import org.apache.commons.beanutils.Converter;

public class LongConverter implements Converter {

	@Override
	public Object convert(Class type, Object value) {
		if (value == null) {
			return null;
		} else if (value instanceof Long) {
			// Cac truong hop Combobox, khi -chon tat ca-, -chon-,
			// khong co gia tri gi nhung submit ve bang 0.
			return (value.equals(0L)) ? null : value;
		} else if (value instanceof String) {
			if (value.toString().length() == 0) {
				return null;
			} else {
				return Long.parseLong(value.toString());
			}
		} else {
			return value;
		}
	}
}