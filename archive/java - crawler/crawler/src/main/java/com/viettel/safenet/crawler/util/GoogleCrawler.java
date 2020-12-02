package com.viettel.safenet.crawler.util;


import com.gargoylesoftware.htmlunit.BrowserVersion;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;


@Slf4j
public class GoogleCrawler {

    // Driver Selenium
    public WebDriver driver;

    public GoogleCrawler() {
        // Nếu sử dụng FirefoxDriver, đầu tiên bị lỗi sau
        // Exception in thread "main" java.lang.IllegalStateException: The path to the driver executable must be set by the webdriver.gecko.driver system property;
        // for more information, see https://github.com/mozilla/geckodriver.
        // The latest version can be downloaded from https://github.com/mozilla/geckodriver/releases
        //
        // Sau khi download file và thêm lệnh:
        // System.setProperty("webdriver.gecko.driver", "/home/huyennv9/crawler-service/geckodriver");
        // thì bị lỗi:
        // Error: GDK_BACKEND does not match available displays
        //
        // Dùng lệnh:
        // export DISPLAY=:1
        // cũng không được, do không đúng số màn hình
        // Lệnh trướ là:
        // sudo yum -y install firefox Xvfb libXfont Xorg
        // sudo yum -y groupinstall "X Window System" "Desktop" "Fonts" "General Purpose Desktop"
        // Xvfb :99 -ac -screen 0 1280x1024x24 &
        //
        // Cần dùng lệnh:
        // export DISPLAY=:99
        // thì lại bị lỗi:
        // 1522980405446	Marionette	INFO	Listening on port 2828
        // Exception in thread "main" org.openqa.selenium.WebDriverException: connection refused
        //System.setProperty("webdriver.gecko.driver", "/home/huyennv9/crawler-service/geckodriver");
        //driver = new FirefoxDriver();
        
        // Để chạy headless (không có GUI) trên Linux phải dùng HtmlUnitDriver
        // Phải enable JavaScript và browser version
        //driver = new HtmlUnitDriver();
        //driver = new HtmlUnitDriver(true);
        driver = new HtmlUnitDriver(BrowserVersion.CHROME, true);
    }

    /**
     * Tìm kiếm Google.
     *
     * @param keyword Từ khóa
     * @param page Trang (sao lại nhân 10 nhỉ)
     * @param searchType Loại tìm kiếm (tin tức, hình ảnh, video)
     * @return Danh sách các URL tìm kiếm được
     */
    public List<String> searchByKey(String keyword, int page, String searchType) throws UnsupportedEncodingException {
        // Mã hóa keyword (trong trường hợp tiếng Việt)
        keyword = URLEncoder.encode(keyword, "UTF-8");
        
        // Đường dẫn search Google
        String googleSearchUrl = "https://www.google.com.vn/search?";
        if (searchType.equals("video")) {
            googleSearchUrl += "tbm=vid&";
        } else if (searchType.equals("image")) {
            googleSearchUrl += "tbm=isch&";
        }
        String url = googleSearchUrl + "q=" + keyword + "&ie=utf-8&oe=utf-8" + "&start=" + page;
        log.info(url);

        try {
            driver.get(url);
            if (searchType.equals("all") || searchType.equals("video")) {
                return parserTabVideo();
            } else if (searchType.equals("image")) {
                return parserTabImage();
            }
        } catch (Exception ex) {
            log.error("Error when searching", ex);
        }
        return new ArrayList<>();
    }

    public void finish() {
        driver.quit();
    }

    public void clearCookie() {
        driver.manage().deleteAllCookies();
    }

    /**
     * Parser tab video (va tab all).
     *
     * @return Danh sách URL
     */
    private List<String> parserTabVideo() {
        List<String> pages = new ArrayList<>();

        // Lấy các kết quả trả về
        List<WebElement> eles = driver.findElements(By.className("r"));
//        log.debug("Page source: " + driver.getPageSource());
//        log.debug("eles length: " + eles.size());

        // Nếu không có kết quả trả về
        if (!eles.isEmpty()) {
            // Duyệt qua các kết quả, nếu chưa tồn tại thì thêm vào danh sách
            Iterator<WebElement> it = eles.iterator();
            while (it.hasNext()) {
                WebElement ele = it.next();
                String temp = ele.findElement(By.tagName("a")).getAttribute("href");
                String res = DomainUtil.cutOffDomain(temp);
                if (!pages.contains(res)) {
                    pages.add(res);
                }
            }
        }

        return pages;
    }

    /**
     * Parser tab image
     *
     * @return Danh sách URL
     */
    private List<String> parserTabImage() {
        List<String> pages = new ArrayList<>();
        List<WebElement> eles = driver.findElements(By.className("rg_bx"));
        if (!eles.isEmpty()) {
            Iterator<WebElement> it = eles.iterator();
            while (it.hasNext()) {
                WebElement ele = it.next();
                String temp = ele.findElement(By.className("rg_meta")).getAttribute("innerHTML");

                String regx = "\"ru\":\"(.*?)\"";
                Pattern pattern = Pattern.compile(regx);
                Matcher matcher = pattern.matcher(temp);
                if (matcher.find()) {
                    temp = matcher.group(1);

                    String res = DomainUtil.cutOffDomain(temp);
                    if (!pages.contains(res)) {
                        pages.add(res);
                    }
                }
            }
        }

        return pages;
    }
}
