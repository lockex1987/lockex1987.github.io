package com.viettel.safenet.logalert.util;

import java.io.File;
import lombok.extern.slf4j.Slf4j;

import org.junit.Ignore;
import org.junit.Test;

/**
 *
 * @author huyennv9
 */
@Slf4j
public class CommonUtilsTests {

	@Ignore
	@Test
	public void testEncodeBase64() {
		String input = "tunglq5:smsTLQ@20161115";
		String base64 = CommonUtils.encodeBase64(input);
		log.info(base64);
	}

	@Ignore
	@Test
	public void testGetLastLine() {
		String filePath = "D:/new/httpd/safenet_error.log-20170814";
		File file = new File(filePath);
		String lastLine = CommonUtils.getLastLine(file);
		log.info("lastLine: " + lastLine);
	}

	@Ignore
	@Test
	public void testRemoveAccent() {

		log.info(CommonUtils.removeAccent(
				"ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰự"));
	}

    @Ignore
	@Test
	public void longEqualsTest() {
		Long n1 = 10L;
		Long n2 = 10L;
		log.info(String.valueOf(n1 == n2));
		log.info(String.valueOf(n1 != n2));
		log.info(String.valueOf(!n1.equals(n2)));
	}
    
    //@Ignore
	@Test
	public void isUpTest() {
        //CommonUtils.disableSniExtension();
        CommonUtils.disableSslVerification();
        
		String[] hostList = {
            "http://tree.itrithucviet.vn/",
            "http://safenet.vn/blocked.html",
            "https://safenet.vn/blocked.html"
        };
        for (String url : hostList) {
            boolean status = CommonUtils.isUpWebsite(url);
            log.info("URL: " + url + ", status: " + status);
        }
	}
}
