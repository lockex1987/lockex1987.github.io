package com.viettel.safenet.crawler.util;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;

@Slf4j
public class CrawlerConfigTests {

    @Test
    public void readConfigTest() {
        CrawlerConfig.readConfig();

        log.debug("Url: " + CrawlerConfig.data.saveServer.serverRuleCommon.url);
        log.debug("Token: " + CrawlerConfig.data.saveServer.serverRuleCommon.token);
    }
}
