<?php
require 'vendor/autoload.php';

use Ixudra\Curl\Facades\Curl;
use Ixudra\Curl\CurlService;

$curlService = new CurlService();

$url = 'http://sso.cttd.tk/api/user';
$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc3NvLmN0dGQudGsvYXBpL2xvZ2luIiwiaWF0IjoxNTU5NjQwMjc2LCJleHAiOjE1NTk3MjY2NzYsIm5iZiI6MTU1OTY0MDI3NiwianRpIjoiTVNtdnZBSlF1NkpLZkhEcSIsInN1YiI6MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.ERBcUaBkjU3L3LSej4WZJmZlzvPb3hLSae0fznOZPa4';

$request =
		//Curl::to($url) // khong chay duoc, phai lam tren Laravel
		$curlService->to($url) // khong su dung Laravel
		->withHeader('Authorization: Bearer ' . $token)
		->returnResponseObject();
$response = $request->get();
echo $response->status . "\n";
echo $response->content  . "\n";
