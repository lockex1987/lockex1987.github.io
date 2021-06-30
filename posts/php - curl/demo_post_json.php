<?php

$data = [
    'name' => 'Hagrid',
    'age' => 36
];

$json = json_encode($data);

$curl = curl_init('http://localhost/posts/php%20-%20mock%20api/post_json_demo.php');

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($json)
]);

$resp = curl_exec($curl);

echo $resp;

curl_close($curl);
