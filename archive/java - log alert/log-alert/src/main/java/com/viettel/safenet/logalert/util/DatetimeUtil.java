package com.viettel.safenet.logalert.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;

/**
 * Các hàm util liên quan đến thời gian.
 *
 * @author huyennv9
 */
@Slf4j
public class DatetimeUtil {

    // Định dạng chuẩn
    private static final String STANDARD_PATTERN = "yyyy-MM-dd HH:mm:ss";

    public static String convertDateToStandardFormat(Date date) {
        try {
            DateFormat formatter = new SimpleDateFormat(STANDARD_PATTERN);
            return formatter.format(date);
        } catch (Exception ex) {
            log.error("Convert date to standard string error with " + date, ex);
            return null;
        }
    }
}
