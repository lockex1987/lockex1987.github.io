package com.viettel.safenet.crawler.util;

import com.viettel.safenet.crawler.model.CrawlerConfData;
import com.moandjiezana.toml.Toml;

import java.io.File;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CrawlerConfig {

    // Thông tin cấu hình (đọc từ file crawler.conf)
    public static CrawlerConfData data;
    
    public static void readConfig() {
        // Đọc file ở thư mục chạy lệnh java
        File f = new File(System.getProperty("user.dir") + "/crawler.conf");
        log.debug(f.getAbsolutePath());
        try {
            Toml toml = new Toml().read(f);
            data = toml.to(CrawlerConfData.class);
            log.info(data.toString());
        } catch (Exception ex) {
            log.error("Error reading config file", ex);
        }
    }
}
