package com.viettel.safenet.crawler.util;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SearchGoogle {

    /**
     * Crawl Google.
     *
     * @param cat ID thể loại luật
     * @param keyword Từ khóa crawl
     * @param startPage Trang bắt đầu
     * @param endPage Trang kết thúc
     * @param searchType (Tab all or tab image)
     */
    public static void startSearchCat(int cat, String keyword, int startPage, int endPage, String searchType) {
        log.debug("Start searching in category: " + cat + ", keyword: " + keyword + ", start page: " + startPage + ", end page: " + endPage);
        
        List<String> result = new ArrayList<>();
        GoogleCrawler gCrawler = new GoogleCrawler();
        int count = 0;

        // Duyệt các trang
        for (int j = startPage; j < endPage; j++) {
            count++;
            try {
                // Lấy kết quả từ trang thứ j
                // Mỗi trang lấy 10 kết quả
                List<String> domains = gCrawler.searchByKey(keyword, j * 10, searchType);

                // Nếu đã xong thì bỏ qua
                if (domains.isEmpty()) {
                    break;
                }
                
                // Thêm các URL mới
                for (String domain : domains) {
                    if (!result.contains(domain)) {
                        result.add(domain);
                        ResultSender.sendDomainToServer(cat, keyword, searchType, domain, CrawlerConfig.data.saveServer.serverRuleCommon);
                    }
                }

                if (count % 5 == 0) {
//						gCrawler.clearCookie();
                }
            } catch (UnsupportedEncodingException ex) {
                log.error("Error", ex);
            }

            // Tạm nghỉ tầm 7.5 giây thì sang trang khác
            try {
                Thread.sleep(7500);
            } catch (InterruptedException ex) {
                // Do nothing
            }
        }

        gCrawler.finish();
        log.debug("Done");
    }
}
