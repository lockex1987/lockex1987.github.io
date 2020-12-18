package cttd.drm;

import java.util.ResourceBundle;

public class CommonUtils {

	private static ResourceBundle resourceBundle;

	public static String getString(String key) {
		if (resourceBundle == null) {
			resourceBundle = ResourceBundle.getBundle("application");
		}
		return resourceBundle.getString(key);
	}
}
