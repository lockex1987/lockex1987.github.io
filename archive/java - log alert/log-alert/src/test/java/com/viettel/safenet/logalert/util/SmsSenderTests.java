package com.viettel.safenet.logalert.util;

import lombok.extern.slf4j.Slf4j;

import org.junit.Ignore;
import org.junit.Test;

/**
 *
 * @author huyennv9
 */
@Slf4j
public class SmsSenderTests {

	@Ignore
    @Test
    public void testSendSms() {
        String lastLine = "Cao Thị Thùy Dương";
        //String lastLine = "ha ha \"he he\"";
        //String lastLine = "[Sun Aug 13 23:53:17.969733 2017] [:error] [pid 11873] [client 91.196.50.33:45460] script '/var/www/html/safenet_intro/testproxy.php' not found or unable to stat";
        //String lastLine = "[Thu Aug 10 17:40:01.721615 2017] [:error] [pid 8928] [client 10.30.154.113:39968] PHP Fatal error:  Call to a member function col() on null in /var/www/html/safenet_intro/services/application/controllers/ScheduleService.php on line 1723";
        SmsSender.sendSms("File D:/new/httpd/safenet_error.log thay doi. " + lastLine);
    }
}
