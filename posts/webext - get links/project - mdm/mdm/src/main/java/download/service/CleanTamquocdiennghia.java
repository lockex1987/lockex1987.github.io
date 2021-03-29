package download.service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import common.util.HtmlCleaner;

public class CleanTamquocdiennghia {

	// Đường dẫn thư mục chứa các file
	private static final String ROOT_PATH = "/media/locke/data/literature/la quan trung - tam quoc dien nghia/part 1/";

	/**
	 * Clean nội dung file
	 * @param filePath Đường dẫn file
	 * @return Xâu nội dung đã được clean
	 */
	private String clean(String filePath) throws Exception {
		String content = getCleanHtmlFromFile(filePath);
		
		// Bỏ các ký tự thừa
		content = cleanCharacters(content);
		
		Document doc = Jsoup.parseBodyFragment(content);
		addCssClass(doc);
		processImages(doc);

		doc.outputSettings().syntax(Document.OutputSettings.Syntax.xml); 
		return doc.body().html();
	}
	
	private String getCleanHtmlFromFile(String filePath) throws Exception {
		File file = new File(filePath);
		Document doc = Jsoup.parse(file, "UTF-8");
		HtmlCleaner htmlCleaner = new HtmlCleaner();
		String content = (htmlCleaner.filterTextImageLink(doc.body()));
		return content;
	}
	
	private String cleanCharacters(String content) {
		content = content.replace("<p>Tam Quốc Diễn Nghĩa</p>", "");
		content = content.replace("<p>Nguyên tác : La Quán Trung</p>", "");
		content = content.replace("<p>Dịch giả : Phan Kế Bính</p>", "");
		content = content.replace("<br><br></p>", "");
		content = content.replace("<br></p>", "");
		content = content.replace("<p><br><br>", "");
		content = content.replace("<p><br>", "");
		return content;
	}
	
	private void addCssClass(Document doc) throws Exception {
		Elements elements = doc.body().children();
		Element chapterNumberNode = null;
		for (Element element : elements) {
			if (element.nodeName().equals("p")) {
				String text = element.text().trim();
				if (isChapterNumberTag(text)) {
					chapterNumberNode = element;
					break;
				}
			}
		}

		if (chapterNumberNode != null) {
			chapterNumberNode.addClass("chapter-number");
			
			// 2 dòng tên tiêu đề tiếp theo
			Element chapterTitle1 = chapterNumberNode.nextElementSibling();
			chapterTitle1.addClass("chapter-title");
			if (chapterTitle1.text().endsWith(".") || chapterTitle1.text().endsWith(";")) {
				chapterTitle1.text(chapterTitle1.text().substring(0, chapterTitle1.text().length() - 1));
			}
			Element chapterTitle2 = chapterTitle1.nextElementSibling();
			chapterTitle2.addClass("chapter-title");
			if (chapterTitle2.text().endsWith(".") || chapterTitle2.text().endsWith(";")) {
				chapterTitle2.text(chapterTitle2.text().substring(0, chapterTitle2.text().length() - 1));
			}
			
			// Comment nếu có ảnh
			Element comment = chapterNumberNode.previousElementSibling();
			if (comment.nodeName().equals("p")) {
				comment.addClass("comment");
			}
		}
	}
	
	private boolean isChapterNumberTag(String textContent) {
		String regex = "^Hồi \\d+$";
		return textContent.matches(regex);
	}

	private void processImages(Document doc) {
		Elements images = doc.getElementsByTag("img");
		
		for (Element e : images) {
			e.wrap("<p></p>");
			String src = e.attr("src");
			//System.out.println(src);
			
			// Copy
			// Tạo ánh xạ
		}
	}

	/**
	 * Xử lý một chương.
	 * @param number Chỉ số chương
	 */
	public void process(int number) throws Exception {
		// Thêm các chữ số 0 ở đầu
		String fileName = String.valueOf(number + 1000).substring(1);
		
		// Tên file đầu vào
		String filePath = ROOT_PATH + fileName + ".html";
		
		// Clean nội dung file đầu vào
		String content = clean(filePath);
		
		// Ghi ra file mới
		writeFile("new-" + fileName, "Hồi " + number, content);
	}

	/**
	 * Ghi file mới.
	 * @param file Tên file
	 * @param title Tiêu đề
	 * @param content Nội dung
	 */
	private void writeFile(String file, String title, String content) throws IOException {
		PrintWriter pw = new PrintWriter(new FileWriter(ROOT_PATH + file + ".html", false));
		pw.append("<!DOCTYPE html>\n"
				+ "<html>\n"
				+ "<head>\n"
				+ "  <title>" + title + "</title>\n"
				+ "  <meta charset='UTF-8'/>\n"
				+ "  <link href='css/style.css' rel='stylesheet'/>\n" + "</head>\n"
				+ "<body>\n"
				+ "  <article>\n"
				+ content
				+ "  </article>\n"
				+ "</body>\n"
				+ "</html>\n");
		pw.close();
	}

	/**
	 * Xử lý chính.
	 */
	@Test
	public void testProcess() throws Exception {
		CleanTamquocdiennghia obj = new CleanTamquocdiennghia();
		int startChapter = 1;
		int endChapter = 20;
		for (int number = startChapter; number <= endChapter; number++) {
			obj.process(number);
		}
		System.out.println("Finish");
	}
}
