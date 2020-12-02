/*
 * NVH.
 */
package common.util;

import java.util.Locale;
import java.util.ResourceBundle;

/**
 *
 * @author lockex1987
 */
public class MessageUtil {

	private static final String MESSAGE_FILE = "messages";

	public static String getMessage(String key, Locale locale) {
		if (locale == null) {
			return null;
		} else {
			ResourceBundle rb = getResourceBundle(locale);
			return rb.getString(key);
		}
	}

	public static String getMessage(String key, Locale locale, Object... args) {
		if (locale == null) {
			return null;
		} else {
			ResourceBundle rb = getResourceBundle(locale);
			return String.format(rb.getString(key), args);
		}
	}

	private static ResourceBundle getResourceBundle(Locale locale) {
		return ResourceBundle.getBundle(MESSAGE_FILE, locale);
	}
}
