package common.util;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.Normalizer;
import java.util.Calendar;
import java.util.List;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;


public class CommonUtils {
	
	

	public static void changeImages(Element div, String prefix, String url, String absUrl) throws Exception {
		changeImages(div, prefix, url, absUrl, "images/");
	}

	/**
	 * Download image to local
	 *
	 * @param div
	 * @param prefix
	 * @param url
	 * @throws Exception
	 */
	public static void changeImages(Element div, String prefix, String url, String absUrl, String imgFolder)
			throws Exception {
		int idx = url.lastIndexOf("/");
		String relUrl = url.substring(0, idx + 1);
		Elements images = div.getElementsByTag("img");
		for (Element e : images) {
			String src = e.attr("src");
			String img = prefix + Downloader.extractFile(src);
			e.attr("src", imgFolder + img);

			Attributes attrs = e.attributes();
			for (Attribute at : attrs) {
				String key = at.getKey();
				if (!key.equalsIgnoreCase("src")) {
					e.removeAttr(key);
				}
			}

			if (src.startsWith("/")) {
				src = absUrl + src;
			} else if (!src.startsWith("http")) {
				src = relUrl + src; // Relative URL
			}
			Downloader.downloadFile(src, Constants.OUTPUT_FOLDER + imgFolder + img);
		}
	}

	public static String removeNonBreakingSpace(String text) {
		return text.replace(Character.toString((char) 160), "");
	}
	
	public static JSONObject queryStringToJson(String queryString) {
		return new JSONObject(
				"{ \"" + queryString.replace("\"", "\\\"").replace("&", "\", \"").replace("=", "\": \"") + "\" }");
	}
	
	public static String getValue(org.w3c.dom.Document xmlDoc, String tag) {
		Calendar c = Calendar.getInstance();
		c.get(Calendar.WEEK_OF_YEAR);
		return xmlDoc.getElementsByTagName(tag).item(0).getTextContent().trim();
	}
	
	public static String stripAccents(String s) {
		s = Normalizer.normalize(s, Normalizer.Form.NFD);
		s = s.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
		return s;
	}
	
	/**
	 * Write to HTML output file
	 *
	 * @param file
	 * @param title
	 * @param content
	 * @throws IOException
	 */
	public static void writeFile(String file, String title, String content) throws IOException {
		PrintWriter pw = new PrintWriter(new FileWriter(Constants.OUTPUT_FOLDER + file + ".html", false));
		pw.append("<!DOCTYPE html>\n" + "<html>\n" + "<head>\n" + "  <title>" + title + "</title>\n"
				+ "  <meta charset='UTF-8'/>\n" + "  <link href='style.css' rel='stylesheet'/>\n" + "</head>\n"
				+ "<body>\n"
				+ content + "</body>\n" + "</html>\n");
		pw.close();
	}
}
