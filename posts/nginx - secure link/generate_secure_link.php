<?php

class NginxSecureLink
{
    /**
     * Sinh đường link an toàn.
     * @param string $uri - Đường dẫn đến file cần bảo vệ, ví dụ /downloads/myfile.zip
     * @param string $secret - Giá trị bí mật giống như trong cấu hình nginx server. Hãy giữ nó bí mật và an toàn!!!
     * @param int $ttl - Số giây cho đến khi link bị hết hạn
     * @param string $userIp - IP của người dùng được phép. Thông thường, chúng ta sẽ lấy nó bằng cái gì đó như $_SERVER['REMOTE_ADDR'].
     * @return string Đường link an toàn
     */
    public static function generateSecureLink(string $uri, string $secret, int $ttl, string $userIp): string
    {
        $expires = time() + $ttl;
        $md5 = md5("$expires $uri $secret", true); // có thể thêm $userIp
        $md5 = base64_encode($md5);
        $md5 = strtr($md5, '+/', '-_');
        $md5 = str_replace('=', '', $md5);
        return $uri . '?md5=' . $md5 . '&expires=' . $expires;
    }
}


function demo(): void
{
    $uri = '/secure-upload/test.html';
    $secret = 'mySecrete@2021';
    $ttl = 120;
    $userIp = '195.99.99.99';
    echo '<a href="' . NginxSecureLink::generateSecureLink($uri, $secret, $ttl, $userIp) . '">Secure link</a>';
}

demo();
