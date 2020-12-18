package download.service.book;

import org.jsoup.nodes.Document;

import common.util.CommonUtils;
import common.util.Downloader;

/**
 * Download an online book that contains several articles.
 * 
 * @author locke
 */
public class BaseBookDownloader {

	/**
	 * The main method.
	 * 
	 * @param baseUrl
	 *          The base URL
	 * @param urls
	 *          An array of URLs
	 * @param title
	 *          The title of the HTML file
	 * @param offset
	 *          Offset
	 */
	public void download(String baseUrl, String[] urls, String title, int offset) throws Exception {
		// Main content, include articles
		StringBuilder content = new StringBuilder();
		// Navigator
		StringBuilder nav = new StringBuilder("<nav><ul>");

		// Loop through URLs
		for (int i = 0; i < urls.length; i++) {
			String url = urls[i];
			System.out.println(i + ". " + url);
			Document doc = Downloader.jsoup(url);
			String filteredContent = filterContent(doc, baseUrl, url, i + offset);

			// Append main content and navigator
			nav.append("<li><a href='#a").append(i).append("'>").append(doc.title()).append("</a></li>\n");
			content.append("<article id='a").append(i).append("'>\n").append(filteredContent).append("</article>\n");
		}
		nav.append("</ul></nav>");

		// Write file index.html
		CommonUtils.writeFile("index", title, nav.toString() + "\n" + content.toString());
		System.out.println("Finish");
	}

	public void download(String baseUrl, String[] urls, String title) throws Exception {
		download(baseUrl, urls, title, 0);
	}

	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		return null;
	}
}
