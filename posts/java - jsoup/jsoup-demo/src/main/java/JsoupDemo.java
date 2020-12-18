import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class JsoupDemo {

	private static void getPageTitle() throws Exception {
		Document doc = Jsoup.connect("https://lockex1987.github.io/").get();
		String title = doc.title();
		System.out.println("Title: " + title);
	}

	private static void formatHtmlCode() {
		String htmlFragment = "<h1>Hi you!</h1><p>What is this?</p>"
				+ "                 <p>Code dang linh tinh"
				+ "<p>Khong dung chuan XHTML</P>           ";
		Document doc = Jsoup.parseBodyFragment(htmlFragment);
		String fullHtml = doc.html();
		System.out.println(fullHtml);
	}

	public static void main(String[] args) throws Exception {
		getPageTitle();
		formatHtmlCode();
	}
}
