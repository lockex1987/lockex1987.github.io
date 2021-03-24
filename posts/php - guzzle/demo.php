<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();
$url = 'http://sso.cttd.tk/api/user';
$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc3NvLmN0dGQudGsvYXBpL2xvZ2luIiwiaWF0IjoxNTU5NjQwMjc2LCJleHAiOjE1NTk3MjY2NzYsIm5iZiI6MTU1OTY0MDI3NiwianRpIjoiTVNtdnZBSlF1NkpLZkhEcSIsInN1YiI6MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.ERBcUaBkjU3L3LSej4WZJmZlzvPb3hLSae0fznOZPa4';
$headers = [
	'Authorization' => 'Bearer ' . $token
];
$options = [
    'headers' => $headers
];
$response = $client->request('GET', $url, $options);

echo $response->getStatusCode() . "\n"; # 200
echo $response->getHeaderLine('content-type') . "\n"; # 'application/json; charset=utf8'
echo $response->getBody() . "\n"; # '{"id": 1420053, "name": "guzzle", ...}'
