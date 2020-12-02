package com.viettel.safenet.crawler.util;

public class DomainUtil {

    /**
     * Lấy thông tin domain từ URL.
     *
     * @param url Thông tin URL đầy đủ
     * @return Thông tin domain
     */
    public static String cutOffDomain(String url) {
        // Kích thước của protocol
        // Là 7 nếu http
        // Là 8 nếu https
        int sizeH;
        int begin = url.indexOf("https://");
        if (begin < 0 || begin > 8) {
            begin = url.indexOf("http://");
            if (begin < 0 || begin > 7) {
                // Không tìm thấy cả https và http thì không hợp lệ, trả về xâu rỗng
                return "";
            } else {
                sizeH = 7;
            }
        } else {
            sizeH = 8;
        }

        // Cắt phần protocol ở đầu
        String result = url.substring(begin + sizeH);
        
        // Cắt phần đuôi phía sau
        int end = result.indexOf("/");
        result = result.substring(0, end);
        return result;
    }
}
