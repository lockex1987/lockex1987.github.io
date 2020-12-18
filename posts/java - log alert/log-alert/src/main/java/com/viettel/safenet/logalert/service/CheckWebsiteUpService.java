package com.viettel.safenet.logalert.service;

import com.viettel.safenet.logalert.util.CommonUtils;
import com.viettel.safenet.logalert.util.DatetimeUtil;
import com.viettel.safenet.logalert.util.FileConfig;
import com.viettel.safenet.logalert.util.SmsSender;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

/**
 * Kiểm tra xem trang web có đang running hay không.
 *
 * @author huyennv9
 */
@Slf4j
public class CheckWebsiteUpService {

    private static List<String> websites;

    private void initWebsites() {
        websites = new ArrayList<>();
        String config = FileConfig.getConfig("checkWebsiteUp.urls");
        if (config != null && !config.isEmpty()) {
            String[] a = config.split(",");
            for (String url : a) {
                url = url.trim();
                websites.add(url);
            }
        }
    }

    public void checkWebsites() {
        if (websites == null) {
            initWebsites();
        }
        
        CommonUtils.disableSslVerification();

        for (String url : websites) {
            boolean isUp = CommonUtils.isUpWebsite(url);
            if (!isUp) {
                processDownUrl(url);
            }
        }
    }

    private void processDownUrl(String url) {
        Date date = new Date();
        log.info("URL: " + url);
        log.info("Checked time: " + DatetimeUtil.convertDateToStandardFormat(date));
        String msg = "URL " + url + " is down.";
        log.info(msg);
        SmsSender.sendSms(msg);
    }
}
