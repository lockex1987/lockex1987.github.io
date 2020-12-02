package com.viettel.safenet.logalert.job;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.viettel.safenet.logalert.service.CheckWebsiteUpService;
import com.viettel.safenet.logalert.util.DatetimeUtil;

import lombok.extern.slf4j.Slf4j;

/**
 * Kiểm tra các trang web đang chạy.
 *
 * @author huyennv9
 */
@Slf4j
public class CheckWebsiteUpJob implements Job {

    @Override
    public void execute(JobExecutionContext jec) throws JobExecutionException {
        Date currentDate = new Date();
        log.info("Check websites at: " + DatetimeUtil.convertDateToStandardFormat(currentDate));
        try {
            CheckWebsiteUpService checkWebsiteUp = new CheckWebsiteUpService();
            checkWebsiteUp.checkWebsites();
        } catch (Exception ex) {
            log.error("Error when check log file", ex);
        }
    }
}
