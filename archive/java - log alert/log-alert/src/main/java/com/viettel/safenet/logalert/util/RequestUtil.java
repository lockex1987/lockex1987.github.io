package com.viettel.safenet.logalert.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;

/**
 * Thực hiện các web request.
 *
 * @author huyennv9
 */
@Slf4j
public class RequestUtil {

    /**
     * Thực hiện một request dạng GET.
     *
     * @param url URL
     * @return Xâu response trả về
     */
    public static String executeGetRequest(String url) {
        try {
            HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Accept", "text/json,application/json");

            String responseContent = getResponseContent(con);
            con.disconnect();
            return responseContent;
        } catch (Exception ex) {
            log.error("Error when executing GET request", ex);
            return null;
        }
    }

    /**
     * Thực hiện request dạng POST.
     *
     * @param url Đường dẫn URL
     * @param input Nội dung của request
     * @param headers Các header
     * @return Xâu response trả về
     */
    public static String executePostRequest(String url, String input, Map<String, String> headers) {
        try {
            HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
            con.setDoOutput(true);
            con.setRequestMethod("POST");
            if (headers != null && !headers.isEmpty()) {
                Set<String> keySet = headers.keySet();
                for (String key : keySet) {
                    con.setRequestProperty(key, headers.get(key));
                }
            }

            OutputStream os = con.getOutputStream();
            os.write(input.getBytes());
            os.flush();

            String responseContent = getResponseContent(con);
            con.disconnect();
            return responseContent;
        } catch (Exception ex) {
            log.error("Error when executing POST request", ex);
            return null;
        }
    }

    private static String getResponseContent(HttpURLConnection con) throws Exception {
        //int responseCode = con.getResponseCode();
        BufferedReader responseStream = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String line;
        StringBuilder responseContent = new StringBuilder();
        while ((line = responseStream.readLine()) != null) {
            responseContent.append(line);
        }
        responseStream.close();
        return responseContent.toString();
    }
}
