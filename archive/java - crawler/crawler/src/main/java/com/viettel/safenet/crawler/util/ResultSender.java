package com.viettel.safenet.crawler.util;

import com.google.gson.Gson;
import com.viettel.safenet.crawler.model.RuleCommonConf;
import com.viettel.safenet.crawler.model.RuleSaveRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ResultSender {

    /**
     * Đẩy các domain mới vào bảng rule_common_crawl.
     * Bằng cách gọi API bên web SafeNet.
     *
     * @param cat
     * @param keyword
     * @param source
     * @param domain
     * @param serverConf
     */
    public static void sendDomainToServer(int cat, String keyword, String source, String domain, RuleCommonConf serverConf) {
        RuleSaveRequest req = new RuleSaveRequest();
        req.category_id = cat;
        req.compare_type = "EQ";
        req.rule_content = domain;
        req.rule_type = "domain";
        req.source = source;
        req.keyword = keyword;
        req.token = serverConf.token;

        try {
            String resp = sendSaveReq(serverConf.url, req);
            log.info("Sent " + domain + " (" + req.category_id + ") => Result: " + resp);
            Thread.sleep(100);
        } catch (Exception ex) {
            log.error("Error", ex);
        }
    }

    private static String sendSaveReq(String strUrl, RuleSaveRequest req) throws Exception {
        HttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(strUrl);
        httpPost.setHeader("Content-Type", "text/plain; charset=UTF-8");

        Gson gson = new Gson();
        String reqData = gson.toJson(req);

        httpPost.setEntity(new StringEntity(reqData));
        HttpResponse r = httpClient.execute(httpPost);

        BufferedReader buf = new BufferedReader(new InputStreamReader(r.getEntity().getContent()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = buf.readLine()) != null) {
            response.append(inputLine);
        }
        return response.toString();
    }
}
