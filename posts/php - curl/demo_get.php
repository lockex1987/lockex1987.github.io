<?php

$curl = curl_init();

// curl_setopt($curl, CURLOPT_URL, 'http://cttd.tk/posts/php%20-%20mock%20api/get_demo.php?name=NAT');
// curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($curl, CURLOPT_TIMEOUT, 30);
// curl_setopt($curl, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $token, 'Content-Type: multipart/form-data']);

curl_setopt_array($curl, [
    CURLOPT_URL => 'http://localhost/posts/php%20-%20mock%20api/get_demo.php?name=NAT',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6)    Gecko/20070725 Firefox/2.0.0.6',
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_FOLLOWLOCATION => true
]);

$resp = curl_exec($curl);
// $headers = curl_getinfo($ch);
echo $resp;

curl_close($curl);
