package com.viettel.safenet.crawler.main;

import com.viettel.safenet.crawler.servlet.CrawlerServlet;
import com.viettel.safenet.crawler.util.CrawlerConfig;
import com.viettel.safenet.crawler.util.GoogleCrawler;
import java.util.List;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;

import lombok.extern.slf4j.Slf4j;

/**
 * Tiến trình crawler.
 */
@Slf4j
public class CrawlerService {

    public static void main(String[] args) throws Exception {
        CrawlerConfig.readConfig();

        createService();
        
        //searchByKeyTest();
    }

    private static void createService() throws Exception {
        Server server = new Server(CrawlerConfig.data.serviceConf.port);
        ServletContextHandler handler = new ServletContextHandler(server, CrawlerConfig.data.serviceConf.crawlerString);
        // Class xử lý
        handler.addServlet(CrawlerServlet.class, "/");
        handler.setAllowNullPathInfo(true);
        server.start();
        server.join();

        log.info("Started crawler service...");
    }
    
    /**
     * Hiện tại đang phải dùng lệnh export DISPLAY=:99 thì mới chạy được.
     * Tuy nhiên, lệnh này đang không được lưu giữa session.
     */
    private static void searchByKeyTest() throws Exception {
        GoogleCrawler gCrawler = new GoogleCrawler();
        String keyword = "jav";
        int start = 0;
        String searchType = "all";
        List<String> domains = gCrawler.searchByKey(keyword, start, searchType);

        for (String s : domains) {
            log.info(s);
        }
    }
}
