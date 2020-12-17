package common.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.text.Normalizer;
import java.util.Calendar;
import java.util.Random;
import java.util.ResourceBundle;

import org.json.JSONObject;


/**
 * Common functions usually used (ONLY PURE JAVA CORE).
 */
public class CommonUtils {

	public static String getAbsolutePathByClassLoader(String path) {
		URL url = ClassLoader.getSystemResource(path);
		// URL url = ClassLoader.getSystemClassLoader().getResource("so-yeu-ly-lich.rtf");
		// URL url = ViettelRtfDemo.class.getClassLoader().getResource("so-yeu-ly-lich.rtf");
		// URL url = getClass().getResource("so-yeu-ly-lich.rtf");

		URI uri;
		try {
			uri = url.toURI();
		} catch (URISyntaxException ex) {
			ex.printStackTrace();
			return null;
		}

		// System.out.println(url.getFile());
		// System.out.println(url.getPath());
		// System.out.println(url.toString());
		// System.out.println(uri);

		File file = new File(uri);
		String absolutePath = file.getAbsolutePath();
		return absolutePath;
	}

	/**
	 * Get config value from file application.properties.
	 * @param key The key
	 * @return The value
	 */
	public static String getConfig(String key) {
		ResourceBundle rb = ResourceBundle.getBundle("application");
		return rb.getString(key);
	}

	public static String[] getConfigList(String key) {
		String s = getConfig(key);
		return Converter.convertTextToStringArray(s);
	}

	/**
	 * Lam tron so thuc // positive value only.
	 *
	 * @param value
	 *          So can lam tron
	 * @param decimalPlace
	 *          So chu so sau thap phan
	 * @return Gia tri lam tron
	 */
	public static Double round(double value, int decimalPlace) {
		BigDecimal bd = new BigDecimal(Double.toString(value));
		bd = bd.setScale(decimalPlace, BigDecimal.ROUND_HALF_UP);
		return bd.doubleValue();
	}

	public static boolean isNullOrEmpty(String s) {
		return (s == null || s.trim().isEmpty());
	}

	public static Object nvl(Object value, Object defVal) {
		return value == null ? defVal : value;
	}

	public static Double nvl(Double value, Double defVal) {
		return value == null ? defVal : value;
	}

	public static Long nvl(Long value, Long defVal) {
		return value == null ? defVal : value;
	}

	
	
	/**
	 * Sinh ra chuỗi captcha có độ dài từ 6 đến 8 ký tự.
	 * Cần đảm bảo không có các ký tự nhập nhằng.
	 * 
	 * @return Xâu captcha
	 */
	public static String generateCaptcha() {
		char[] source = "adefghrtAEFGHRT2345678".toCharArray();
		Random random = new Random();
		int minCapLen = 6;
		int maxCapLen = 8;
		int offset = maxCapLen - minCapLen + 1;
		int randomLen = (offset <= 1) ? minCapLen : minCapLen + random.nextInt(offset);
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < randomLen; i++) {
			sb.append(source[random.nextInt(source.length)]);
		}
		String captcha = sb.toString();
		return captcha;
	}
}
