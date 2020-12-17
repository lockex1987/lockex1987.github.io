package cttd.cryptography.demo;

import org.mindrot.jbcrypt.BCrypt;

public class BcryptHashing {

    public static String hash(String password) {
        //return BCrypt.hashpw(password, BCrypt.gensalt());
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    public static boolean check(String candidate, String hashed) {
        hashed = checkPrefix(hashed);
        return BCrypt.checkpw(candidate, hashed);
    }

    /**
     * Giả sử password được hashed bởi PHP (Laravel).
     * Một ứng dụng Java khác cũng cần validate password này.
     * Có khi bị lỗi: java.lang.IllegalArgumentException: Invalid salt revision
     * Đó là do thư viện PHP sử dụng prefix 2y, trong khi thư viện Java vẫn dùng prefix 2a.
     * Ban đầu prefix của bcrypt là 2a, nhưng việc implement bcrypt trong PHP và nhiều phần mềm khác (sử dụng crypt_blowfish) có một lỗi.
     * Để phân biệt cái cũ có thể bị lỗi với cái mới, prefix mới 2y được giới thiệu.
     * Nếu code Java không hỗ trợ prefix 2y, có 2 cách:
     * - Nếu code Java không bị lỗi (vì không sử dụng crypt_blowfish), thì đơn giản chỉ cần thay thế "2y" bằng "2a"
     * - Nếu thư viện Java có lỗi thì nên cập nhật lại thư viện Java
     */
    private static String checkPrefix(String hashed) {
        if (hashed.startsWith("$2a$")) {
            return hashed;
        }

        return "$2a$" + hashed.substring(4);
    }
}
