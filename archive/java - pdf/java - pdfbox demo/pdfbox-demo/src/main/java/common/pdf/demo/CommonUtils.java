package common.pdf.demo;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

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
}
