<?php

// https://freetuts.net/su-dung-php-curl-de-upload-file-231.html

$cfile = new CURLFile(__DIR__ . '/curl.png', 'image/png', 'curl.png');
$params = [
    'metadata' => '{"file_type": 0}',
    'uploadImage' => $cfile
];

$curl = curl_init('http://localhost/posts/php%20-%20mock%20api/post_upload_demo.php');

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $params);

$resp = curl_exec($curl);
echo $resp;
curl_close($curl);
