package download.getlink;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import common.util.Constants;
import common.util.Downloader;

/**
 * Get list of issues from truyentranhvang.
 */
public class GetTruyentranhvang {

	private static final String BASE = "http://truyentranhvang.net/";

	// Cau be rong
	// http://truyentranhvang.com/index.php?option=com_ttv&view=book&layout=latest&catid=17&Itemid=102
	// http://truyentranhvang.com/index.php?option=com_ttv&view=book&layout=latest&catid=17&Itemid=102&limitstart=10
	// http://truyentranhvang.com/index.php?option=com_ttv&view=book&layout=latest&catid=17&Itemid=102&limitstart=20
	// ...
	// http://truyentranhvang.com/index.php?option=com_ttv&view=book&layout=latest&catid=17&Itemid=102&limitstart=70
	// Trang Quynh
	// http://truyentranhvang.com/index.php?option=com_ttv&view=book&layout=latest&catid=29&Itemid=102&limitstart=170 
	// 10 anh em rong
	// http://truyentranhvang.com/index.php?option=com_ttv&view=book&layout=latest&catid=13&Itemid=102
	// http://truyentranhvang.com/index.php?option=com_ttv&view=book&layout=latest&catid=13&Itemid=102&limitstart=10
	// http://truyentranhvang.com/index.php?option=com_ttv&view=book&layout=latest&catid=13&Itemid=102&limitstart=20
	public String getLink(String url, int noOfPages) throws Exception {
		StringBuilder result = new StringBuilder();
		
		ExecutorService executor = Executors.newFixedThreadPool(noOfPages);
		// Maximum 5 threads
		Future<String>[] futureArr = new Future[noOfPages];
		for (int i = 0; i < noOfPages; i++) {
			final int page = i;
			futureArr[i] = executor.submit(() -> {
				return parseOnePage(url, page);
			});
		}
		for (int i = 0; i < noOfPages; i++) {
			String page = futureArr[i].get();
//			String page = parseOnePage(url, i);
			result.append(page);
		}

		return result.toString();
	}

	private String parseOnePage(String url, int page) throws Exception {
		Document doc = Downloader.jsoup(url + "&limitstart=" + (page * 10));
		//System.out.println(doc.html());
		Element div = doc.getElementById("main-content");

		List<String> imageList = new ArrayList<>();
		List<String> linkList = new ArrayList<>();
		List<String> titleList = new ArrayList<>();

		// Images
		Elements images = div.getElementsByTag("img");
		for (Element e : images) {
			imageList.add(e.attr("src"));
		}

		// Links view online
		Elements links = div.getElementsByClass("view_online");
		for (Element e : links) {
			linkList.add(e.getElementsByTag("a").first().attr("href"));
		}

		// Titles (number)
		Elements titles = div.getElementsByTag("h2");
		for (Element e : titles) {
			titleList.add(e.text());
		}

		StringBuilder result = new StringBuilder();
		for (int i = 0; i < imageList.size(); i++) {
			String image = imageList.get(i);
			String link = linkList.get(i);
			String title = titleList.get(i);

			
			int no;
			try {
				int idx = title.lastIndexOf(" ");
				no = Integer.parseInt(title.substring(idx + 1));
			} catch (Exception ex) {
				no = i;
			}

			result.append(no).append(", ").append(link).append("<br />");
			System.out.println(no + ". " + title);
			Downloader.downloadFile(BASE + image, Constants.OUTPUT_FOLDER + "000-"
					+ String.valueOf(no + 1000).substring(1) + ".jpg");
		}

		return result.toString();
	}
}
