package com.viettel.safenet.logalert.job;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.viettel.safenet.logalert.service.CheckLogFileService;
import com.viettel.safenet.logalert.util.DatetimeUtil;

import lombok.extern.slf4j.Slf4j;

/**
 * Kiểm tra file log lỗi.
 *
 * @author huyennv9
 */
@Slf4j
public class CheckLogFileJob implements Job {

    @Override
    public void execute(JobExecutionContext jec) throws JobExecutionException {
        Date currentDate = new Date();
        log.info("Check log file at: " + DatetimeUtil.convertDateToStandardFormat(currentDate));
        try {
            CheckLogFileService checkLogFile = new CheckLogFileService();
            checkLogFile.checkFile();
        } catch (Exception ex) {
            log.error("Error when check log file", ex);
        }
    }
}
