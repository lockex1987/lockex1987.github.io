package com.viettel.safenet.crawler.util;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;

@Slf4j
public class GoogleCrawlerTests {

    @Test
    public void searchByKeyTest() throws Exception {
        setProxy();
        
        
    }
    
    private void setProxy() {
        String host = "proxy.cyberspace.vn";
        String port = "3128";
        System.setProperty("http.proxyHost", host);
        System.setProperty("http.proxyPort", port);
        System.setProperty("https.proxyHost", host);
        System.setProperty("https.proxyPort", port);
    }
}
