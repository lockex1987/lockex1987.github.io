package com.viettel.safenet.logalert.util;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import lombok.extern.slf4j.Slf4j;

/**
 * Chứa phương thức static để đọc cấu hình.
 *
 * @author huyennv9
 */
@Slf4j
public class FileConfig {

    // Tên file config
    private static final String FILE = "conf/application";

    // Đối tượng chứa cấu hình chính
    private static Properties prop;

    // Khởi tạo lớp
    static {
        loadMainProperies();
        loadEnvProperies();
    }

    /**
     * Lấy cấu hình dựa vào key.
     *
     * @param key Key của cấu hình
     * @return Giá trị cấu hình
     */
    public static String getConfig(String key) {
        try {
            return prop.getProperty(key);
        } catch (Exception ex) {
            log.error("getConfig error with key " + key, ex);
            return null;
        }
    }

    /**
     * Khởi tạo đối tượng prop, đọc cấu hình từ file chính.
     */
    private static void loadMainProperies() {
        prop = new Properties();
        loadProperies(prop, FILE + ".properties");
    }

    /**
     * Đọc thêm cấu hình từ file phụ (tùy thuộc môi trường).
     * Các tham số mà chắc chắn thay đổi khi chuyển từ môi trường 'dev' sang môi trường 'prod'
     * thì nên tách ra một file riêng.
     * Ngoài ra về sau file riêng này có thể phải mã hóa.
     * Chỉ một cấu hình duy nhất chúng ta thường xuyên phải thay đổi là cấu hình 'environment'.
     */
    private static void loadEnvProperies() {
        String environment = prop.getProperty("environment");
        if (environment != null && !environment.isEmpty()) {
            // Đối tượng chứa cấu hình phụ (tùy thuộc môi trường)
            Properties envProp = new Properties();
            loadProperies(envProp, FILE + "." + environment + ".properties");

            // Thêm tất cả các cấu hình từ envProp sang prop,
            // từ bây giờ về sau chỉ sử dụng prop thôi
            prop.putAll(envProp);
        }
    }

    /**
     * Load đối tượng Properties từ file.
     * Chú ý đối tượng Properties phải được khởi tạo trước khi gọi hàm này.
     *
     * @param prop Đối tượng Properties
     * @param filePath Đường dẫn file
     */
    private static void loadProperies(Properties prop, String filePath) {
        try {
            // Có 2 cách
            // ClassLoader.getSystemResourceAsStream(FILE)
            // new FileInputStream(FILE)
            try (InputStream is = new FileInputStream(filePath)) {
                prop.load(is);
            }
        } catch (Exception ex) {
            log.error("load properties error", ex);
        }
    }
}
