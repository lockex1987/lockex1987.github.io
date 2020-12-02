package com.viettel.safenet.logalert.util;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.text.Normalizer;
import java.util.regex.Pattern;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.input.ReversedLinesFileReader;

/**
 * Các hàm hay dùng.
 *
 * @author huyennv9
 */
@Slf4j
public class CommonUtils {

    /**
     * Mã hóa base64.
     *
     * @param input Xâu đầu vào
     * @return Xâu base64 mã hóa
     */
    public static String encodeBase64(String input) {
        String output = new String(Base64.encodeBase64(input.getBytes()));
        return output;
    }

    /**
     * Trả về dòng cuối cùng (khác rỗng) của file.
     *
     * @param file Đối tượng file
     * @return Dòng cuối cùng của file
     */
    public static String getLastLine(File file) {
        try (ReversedLinesFileReader reversedReader = new ReversedLinesFileReader(file, Charset.forName("UTF-8"))) {
            String line;
            while ((line = reversedReader.readLine()) != null) {
                //log.info(line);
                if (!line.isEmpty()) {
                    return line;
                }
            }
            return null;
        } catch (Exception ex) {
            log.error("Error when get last line", ex);
            return null;
        }
    }

    /**
     * Loại bỏ các ký tự có dấu đặc biệt.
     *
     * @param s
     * @return
     */
    public static String removeAccent(String s) {
        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("").replace("đ", "d").replace("Đ", "D");
    }

    /**
     * Pings a HTTP URL. This effectively sends a HEAD request and returns <code>true</code> if the response code is in
     * the 200-399 range.
     *
     * @param url The HTTP URL to be pinged.
     * @return <code>true</code> if the given HTTP URL has returned response code 200-399 on a HEAD request within the
     * given timeout, otherwise <code>false</code>.
     */
    public static boolean isUpWebsite(String url) {
        //url = url.replaceFirst("^https", "http"); // Otherwise an exception may be thrown on invalid SSL certificates.

        try {
            HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

            // Set timeouts in milliseconds
            // The timeout in millis for both the connection timeout and the response read timeout
            // Note that the total timeout is effectively two times the given timeout
            int timeout = 30000;

            con.setConnectTimeout(timeout);
            con.setReadTimeout(timeout);

            // A HEAD request is just like a GET request, except that it asks
            // the server to return the response headers only, and not the
            // actual resource (i.e. no message body).
            // This is useful to check characteristics of a resource without
            // actually downloading it,thus saving bandwidth. Use HEAD when
            // you don't actually need a file's contents.
            con.setRequestMethod("HEAD");

            int responseCode = con.getResponseCode();

            // Print HTTP status code/message for your information.
            log.debug("Response Code: " + responseCode);
            log.debug("Response Message: " + con.getResponseMessage());

            return (200 <= responseCode && responseCode <= 399);
        } catch (IOException ex) {
            log.error("Error when checking website", ex);
            return false;
        }
    }

    public static void disableSniExtension() {
        System.setProperty("jsse.enableSNIExtension", "false");
    }

    /**
     * Use this method with self-signed SSL (BlueWay web service)
     */
    public static void disableSslVerification() {
        try {
            TrustManager x509 = new X509TrustManager() {

                public X509Certificate[] getAcceptedIssuers() {
                    return null;
                }

                public void checkClientTrusted(X509Certificate[] certs, String authType) {
                }

                public void checkServerTrusted(X509Certificate[] certs, String authType) {
                }
            };
            TrustManager[] trustAllCerts = {
                x509
            };
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
            HostnameVerifier allHostsValid = new HostnameVerifier() {

                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            };
            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
        } catch (Exception ex) {
            log.error("Lỗi khi disable SSL", ex);
        }
    }
}
