package com.viettel.safenet.crawler.util;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;

@Slf4j
public class DomainUtilTests {

    @Test
    public void cutOffDomainTest() {

        log.debug(DomainUtil.cutOffDomain("http://thongtinnhansu.viettel.vn/TTNS/authenticateAction.do?_vt=92914df86017e592b50186142ecf10aa"));
        log.debug(DomainUtil.cutOffDomain("https://rocketchat.cyberspace.vn/group/httvsh-tester"));
        log.debug(DomainUtil.cutOffDomain("rocketchat.cyberspace.vn"));
    }
}
