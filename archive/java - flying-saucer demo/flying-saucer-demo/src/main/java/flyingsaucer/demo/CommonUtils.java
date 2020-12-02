package flyingsaucer.demo;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

public class CommonUtils {

	public static String getAbsolutePathByClassLoader(String path) {
		URL url = ClassLoader.getSystemResource(path);
		URI uri;
		try {
			uri = url.toURI();
		} catch (URISyntaxException ex) {
			ex.printStackTrace();
			return null;
		}
		File file = new File(uri);
		String absolutePath = file.getAbsolutePath();
		return absolutePath;
	}
}
