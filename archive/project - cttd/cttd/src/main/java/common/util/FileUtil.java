package common.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public class FileUtil {

	/**
	 * Lay ten file, bo cac ky tu dac biet.
	 * 
	 * @param fileName
	 * @return
	 */
	public static String getSafeFileName(String fileName) {
		char c = 0;
		// Dùng hàm replace thế này liệu có sai, vì đây là biểu thức chính quy?
		String safeName = fileName.replace("../", "").replace("..\\", "").replace(String.valueOf(c), "");
		return safeName;
	}
	
	/**
	 * Java 8 has function Files.readAllLines.
	 * 
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public static String[] getFile(String path) throws Exception {
		List<String> list = new ArrayList<>();
		// BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(new File(path)), "UTF8"));
		BufferedReader br = new BufferedReader(new FileReader(path));
		String s;
		while ((s = br.readLine()) != null) {
			list.add(s);
		}
		br.close();
		String[] a = new String[list.size()];
		for (int i = 0; i < a.length; i++) {
			a[i] = list.get(i);
		}
		return a;
	}
}
