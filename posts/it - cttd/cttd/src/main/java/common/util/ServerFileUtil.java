package common.util;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.struts.upload.FormFile;

public class ServerFileUtil {

	public static void saveFile(FormFile formFile, String filePath) throws Exception {
		OutputStream os = new FileOutputStream(filePath);
		InputStream is = formFile.getInputStream();
		int read = 0;
		int size = 1024 * 8;
		byte[] buf = new byte[size];
		while ((read = is.read(buf, 0, size)) != -1) {
			os.write(buf, 0, read);
		}
		is.close();
		os.close();
	}
}
