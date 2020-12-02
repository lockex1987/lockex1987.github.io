package com.ifi.boot.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Utils {
	private static final Logger LOGGER = LoggerFactory.getLogger(Utils.class);
	public static String getValueByTabName(String content, String tagName) {
		String ret = null;

		if (content == null) {
			return ret;
		}

		String tagBegin = "<" + tagName + ">";
		String tagEnd = "</" + tagName + ">";

		int posBegin = content.indexOf(tagBegin);
		int posEnd = content.indexOf(tagEnd);

		if (posEnd >= posBegin) {
			ret = content.substring(posBegin + tagBegin.length(), posEnd);
		}

		return ret;
	}

	public static void sleep(int timesleep) {
		try {
			Thread.currentThread();
			Thread.sleep(timesleep);
		} catch (Exception ex) {
			LOGGER.error(ex.getMessage());
		}
	}

}
