/*
 * NVH
 */
package download.service.book;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Download and standardize word-only story.
 */
public class DownloadEnglishThreeKingdom extends BaseBookDownloader {

	public DownloadEnglishThreeKingdom() throws Exception {
		String baseUrl = "http://threekingdoms.com/";
		int chapter = 2;
		String[] urls = new String[chapter];
		for (int i = 0; i < chapter; i++) {
			String order = String.valueOf(i + 1001).substring(1);
			urls[i] = baseUrl + order + ".htm";
		}
		download(baseUrl, urls, "Romance of Three Kingdoms");
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		Element div = doc.getElementById("txt_content").children().first();

		// Remove A tag
		Elements aTags = div.getElementsByTag("a");
		for (Element a : aTags) {
			a.remove();
		}

		StringBuilder content = new StringBuilder();
		Elements trs = div.children();
		for (int i = 1; i < trs.size(); i++) {
			Element tr = trs.get(i);
			Element td = tr.children().first();
			Elements poem = td.getElementsByAttributeValue("class", "3b");
			if (poem.isEmpty()) {
				content.append("<p>" + td.html() + "</p>\n");
			} else {
				content.append("<div class='poem'>" + poem.last().html() + "</div>\n");
			}
		}
		return content.toString();
	}

	public static void main(String[] args) throws Exception {
		new DownloadEnglishThreeKingdom();
	}
}
