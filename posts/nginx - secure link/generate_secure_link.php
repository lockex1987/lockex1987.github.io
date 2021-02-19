<?php

/**
 * @param $uri - Đường dẫn đến file cần bảo vệ, ví dụ /downloads/myfile.zip
 * @param $secret - Giá trị bí mật giống như trong cấu hình nginx server. Hãy giữ nó bí mật và an toàn!!!
 * @param $ttl - Số giây cho đến khi link bị hết hạn
 * @param $userIp - IP của người dùng được phép. Thông thường, chúng ta sẽ lấy nó bằng cái gì đó như $_SERVER['REMOTE_ADDR'].
 * @return string
 */
function generateSecureLink($uri, $secret, $ttl, $userIp)
{
    $expires = time() + $ttl;
    $md5 = md5("$expires $uri $secret", true); // có thể thêm $userIp
    $md5 = base64_encode($md5);
    $md5 = strtr($md5, '+/', '-_');
    $md5 = str_replace('=', '', $md5);
    return $uri . '?md5=' . $md5 . '&expires=' . $expires;
}


$secret = 'mySecrete@2021';
$uri = '/secure-upload/test.html';
$ttl = 120;
$userIp = '195.99.99.99';

echo '<a href="' . generateSecureLink($uri, $secret, $ttl, $userIp) . '">Secure link</a>';
