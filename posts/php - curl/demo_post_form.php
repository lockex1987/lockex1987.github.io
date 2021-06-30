<?php

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => 'http://localhost/posts/php%20-%20mock%20api/post_form_demo.php',
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        'name' => 'Nguyễn Anh Tuấn'
    ])
]);

$resp = curl_exec($curl);

echo $resp;

curl_close($curl);
