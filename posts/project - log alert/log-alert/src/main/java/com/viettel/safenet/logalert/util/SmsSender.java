package com.viettel.safenet.logalert.util;

import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;

/**
 * Gửi tin nhắn 171.
 *
 * @author huyennv9
 */
@Slf4j
public class SmsSender {

    /**
     * Gửi tin nhắn.
     *
     * @param content Nội dung (không dấu, không chứa dấu nháy đơn, dấu nháy kép vẫn được)
     */
    public static void sendSms(String content) {
        // Lấy các thông tin cấu hình
        String url = FileConfig.getConfig("sms.url");
        String user = FileConfig.getConfig("sms.user");
        String password = FileConfig.getConfig("sms.password");
        String[] receivers = FileConfig.getConfig("sms.receivers").split(",");
        String serviceName = FileConfig.getConfig("sms.serviceName");

        // Chuẩn hóa các số điện thoại gửi đi
        for (int i = 0; i < receivers.length; i++) {
            receivers[i] = receivers[i].trim();
        }
        
        // Thêm tên service vào nội dung
        String actualContent = serviceName + " " + content;

        // Gửi tin nhắn
        for (String mobile : receivers) {
            sendSms(url, user, password, mobile, actualContent);
        }
    }

    /**
     * Gửi tin nhắn.
     *
     * @param url URL của service
     * @param user User của service
     * @param password Password của service
     * @param mobile Số điện thoại
     * @param content Nội dung tin nhắn
     *
     */
    private static void sendSms(String url, String user, String password, String mobile, String content) {
        try {
            // Header Authentication được mã hóa Base64 để xác thực
            String base64AuthorHeader = "Basic " + CommonUtils.encodeBase64(user + ":" + password);

            // Các giá trị header của request
            Map<String, String> headers = new HashMap<>();
            headers.put("Content-Type", "application/json");
            headers.put("Accept", "application/json");
            headers.put("Authorization", base64AuthorHeader);

            // Gọi API
            String input = buildRequestJson(mobile, content);
            //log.info(input);
            String responseContent = RequestUtil.executePostRequest(url, input, headers);
            log.info(responseContent);
        } catch (Exception ex) {
            log.error("Send SMS failed", ex);
        }
    }

    /**
     * Thành lập nội dung của request.
     *
     * @param mobile Số điện thoại
     * @param content Nội dung
     * @return Xâu theo định dạng mà service yêu cầu
     */
    private static String buildRequestJson(String mobile, String content) {
        // Loại bỏ dấu nháy đơn
        content = content.replace("'", "");
        
        // Loại bỏ ký tự tiếng Việt
        content = CommonUtils.removeAccent(content);
        
        // Thành lập xâu JSON
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("mobile", mobile);
        jSONObject.put("sms", content);
        String input = jSONObject.toString();
        
        return input;
    }
}
