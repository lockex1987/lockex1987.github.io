package common.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * http://validator.idpf.org/
 */
public class CreateTamquocdiennghiaEpub {

	// Đường dẫn thư mục chứa các file
	private static final String ROOT_PATH = "/media/locke/data/literature/la quan trung - tam quoc dien nghia/part 1/";

	public void process(int number) throws Exception {
		// Thêm các chữ số 0 ở đầu
		String fileName = String.valueOf(number + 1000).substring(1);

		Document doc = getJsoupDocument(fileName);

		// Xóa các file ảnh cũ trong thư mục
		deleteFilesInFolder(ROOT_PATH + "temp/epub-template" + "/OEBPS/images");

		// Xử lý các file ảnh trong nội dung
		Elements images = doc.getElementsByTag("img");
		StringBuilder opfImages = new StringBuilder();
		for (Element e : images) {
			String src = e.attr("src");

			// Copy vào thư mục
			copyImage(src);

			// Tạo ánh xạ trong file content.opf
			String imageName = src.split("/")[1];
			opfImages.append(
					"<item media-type=\"image/jpeg\" href=\"images/" + imageName + "\" id=\"" + imageName + "\"/>\n");
		}

		writeOpfFile(number, opfImages);

		writeCoverFile(doc);

		writeContentFile(doc);

		createEpubFile(fileName);
	}

	private Document getJsoupDocument(String fileName) throws IOException {
		// Tên file đầu vào
		String filePath = ROOT_PATH + "new-" + fileName + ".html";

		// Khởi tạo đối tượng jsoup
		File file = new File(filePath);
		Document doc = Jsoup.parse(file, "UTF-8");
		return doc;
	}

	private void copyImage(String src) throws IOException {
		File source = new File(ROOT_PATH + src);
		File dest = new File(ROOT_PATH + "temp/epub-template" + "/OEBPS/" + src);
		Files.copy(source.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
	}

	private void createEpubFile(String fileName) {
		String sourceDir = ROOT_PATH + "temp/epub-template";
		String archive = ROOT_PATH + fileName + ".epub";
		new Zip(sourceDir, archive);
	}

	private void writeContentFile(Document doc) throws Exception {
		doc.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
		String text = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
				"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\"\n" +
				"  \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n" +
				"\n" +
				"<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\">\n" +
				"<head>\n" +
				"  <title>Content</title>\n" +
				"  <meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/>\n" +
				"  <link rel=\"stylesheet\" href=\"css/styles.css\"/>\n" +
				"</head>\n" +
				"\n" +
				"<body>" +
				"\n" +
				doc.select("article").first().html() +
				"\n" +
				"</body>\n" +
				"</html>";
		String file = ROOT_PATH + "temp/epub-template" + "/OEBPS/content.html";
		writeTextToFile(text, file);
	}

	private void writeCoverFile(Document doc) throws Exception {
		Element chapterNumberNode = doc.select(".chapter-number").first();
		Element chapterTitle1 = chapterNumberNode.nextElementSibling();
		Element chapterTitle2 = chapterTitle1.nextElementSibling();
		Element comment = chapterNumberNode.previousElementSibling();
		Element coverImage = comment.previousElementSibling();

		String template = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
				"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\"\n" +
				"  \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n" +
				"\n" +
				"<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" +
				"<head>\n" +
				"  <title>Cover</title>\n" +
				"  <meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/>\n" +
				"  <link rel=\"stylesheet\" href=\"css/styles.css\"/>\n" +
				"</head>\n" +
				"\n" +
				"<body>\n" +
				"  <div style=\"text-align: center; padding: 0pt; margin: 0pt;\">\n" +
				"    <svg xmlns=\"http://www.w3.org/2000/svg\"\n" +
				"        height=\"100%\"\n" +
				"        preserveAspectRatio=\"xMidYMid meet\"\n" +
				"        version=\"1.1\"\n" +
				"        viewBox=\"0 0 711 1024\"\n" +
				"        width=\"100%\"\n" +
				"        xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
				"      <image width=\"711\" height=\"1024\" xlink:href=\"[IMAGE]\"/>\n" +
				"    </svg>\n" +
				"  </div>\n" +
				"\n" +
				"  \n" +
				"  \n" +
				"  <p class=\"chapter-number\">[NUMBER]</p> \n" +
				"  <p class=\"chapter-title\">[TITLE_1]</p> \n" +
				"  <p class=\"chapter-title\">[TITLE_2]</p>\n" +
				"  <p class=\"comment\">[COMMENT]</p>\n" +
				"</body>\n" +
				"</html>\n" +
				"";
		String text = (template)
				.replace("[IMAGE]", coverImage.select("img").first().attr("src"))
				.replace("[NUMBER]", chapterNumberNode.text())
				.replace("[TITLE_1]", chapterTitle1.text())
				.replace("[TITLE_2]", chapterTitle2.text())
				.replace("[COMMENT]", "(Ảnh: " + comment.text() + ")");
		String file = ROOT_PATH + "temp/epub-template" + "/OEBPS/cover.html";
		writeTextToFile(text, file);

		chapterNumberNode.remove();
		chapterTitle1.remove();
		chapterTitle2.remove();
		comment.remove();
		coverImage.remove();
	}

	private void writeOpfFile(int number, StringBuilder opfImages) throws Exception {
		String title = "Tam quốc diễn nghĩa - Hồi " + number;
		String template = "<?xml version=\"1.0\"  encoding=\"UTF-8\"?>\n" +
				"<package xmlns=\"http://www.idpf.org/2007/opf\" unique-identifier=\"BookId\" version=\"2.0\">\n" +
				"  <metadata xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:opf=\"http://www.idpf.org/2007/opf\">\n"
				+
				"    <dc:title>[TITLE]</dc:title>\n" +
				"    <dc:creator opf:role=\"aut\">La Quán Trung</dc:creator>\n" +
				"    <dc:language>vi-VN</dc:language> \n" +
				"    <dc:publisher>lockex1987.github.io</dc:publisher>\n" +
				"    <dc:description>Ebook miễn phí tại</dc:description>\n" +
				"\n" +
				"    <!--meta name=\"cover\" content=\"chapter005.jpg\"/-->\n" +
				"  </metadata>\n" +
				"\n" +
				"  <manifest>\n" +
				"    <item media-type=\"application/xhtml+xml\" href=\"cover.html\" id=\"cover.html\"/>\n" +
				"    <item media-type=\"application/xhtml+xml\" href=\"content.html\" id=\"content.html\"/>\n" +
				"    \n" +
				"    <item media-type=\"application/x-dtbncx+xml\" href=\"toc.ncx\" id=\"ncx\"/>\n" +
				"\n" +
				"    <item media-type=\"text/css\" href=\"css/styles.css\" id=\"styles.css\"/>\n" +
				"\n" +
				"    [OPF_IMAGES]\n" +
				"  </manifest>\n" +
				"\n" +
				"  <spine toc=\"ncx\">\n" +
				"    <itemref idref=\"cover.html\"/>\n" +
				"    <itemref idref=\"content.html\"/>\n" +
				"  </spine>\n" +
				"\n" +
				"  <guide>\n" +
				"    <reference href=\"cover.html\" title=\"Cover\" type=\"cover\"/>\n" +
				"  </guide>\n" +
				"</package>\n" +
				"";
		String text = template
				.replace("[TITLE]", title)
				.replace("[OPF_IMAGES]", opfImages);
		String file = ROOT_PATH + "temp/epub-template" + "/OEBPS/content.opf";
		writeTextToFile(text, file);
	}

	private void writeTextToFile(String text, String file) throws Exception {
		Path contentFile = Paths.get(file);
		Files.write(contentFile, text.getBytes("UTF-8"));
	}

	private void deleteFilesInFolder(String folderPath) {
		File directory = new File(folderPath);
		File[] files = directory.listFiles();
		for (File file : files) {
			if (!file.delete()) {
				System.out.println("Failed to delete " + file);
			}
		}
	}
}
