<?php

// $host = 'platform.cttd.tk';
// $host = 'localhost';
// $host = 'www.w3schools.com';
// $host = 'vnexpress.net';
// $host = 'ttcd.vn';
$host = 'ttcd-v1.cttd.tk';

$port = 80;
// $port = 443;
// $port = 8080;

$fp = fsockopen($host, $port, $errno, $errstr, 20);
if (!$fp) {
    echo "$errno: $errstr\n";
} else {
	/*
    $out = "GET /psc/missions HTTP/1.1\r\n";
    $out .= "Host: " . $host . "\r\n";
	$out .= "X-CSRF-TOKEN: yoUOXQuw1szk5OyZ0HKjlVl5ZArN1j1oqUi5bBI6\r\n";
	$out .= "Cookie: laravel_session=eyJpdiI6IlBcL1dFWjRvMll3cTdiVzFFNXpSM0lnPT0iLCJ2YWx1ZSI6IldYT3hyUTZIY0M3NEhlandEdnNVcjNEMUk1OHlucldDNUFHZENIV1gyNWY4VnJqcUpDWGZwWjIwbUtYZ1lLNEciLCJtYWMiOiIxNzA1Mjc4NDMwMTA2MmE4ODQ4MjczZjczNzU2MjA4ZjJhMzNhNjM5MWNhMzk2NjBjYWUyZjFmYWI3Mzg4YzViIn0%3D\r\n";
    $out .= "Connection: Close\r\n";
	$out .= "\r\n";
	*/
	
	/*
	$postData = "----WebKitFormBoundary7MA4YWxkTrZu0gW\r\n"
		. "Content-Disposition: form-data; name=\"name\"\r\n"
		. "\r\n"
		. "xxxx\r\n"
		. "----WebKitFormBoundary7MA4YWxkTrZu0gW\r\n"
		. "Content-Disposition: form-data; name=\"description\"\r\n"
		. "\r\n"
		. "1\r\n"
		. "----WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n"
		;
	*/
	
	$boundary = "---------------------------" . substr(md5(rand(0, 32000)), 0, 10);
	// $data = "--$boundary";

	// http://docs.php.net/fsockopen
	// $postData phải có --$boundary ở đầu
	// và $boundary-- ở cuối
	$postData = "--$boundary";
	$arr = [
		'name' => 'Huyen test 1',
		'description' => '<p>ABC</p>',
		'start' => '04/09/2020',
		'due' => '',
		'important' => 0,
		'parent_id' => '',
		'author_id' => '',
		'organizations_id' => '[23]',
		'sources' => '[]',
		'source' => '',
		'file_attach' => '[]',
		'extra' => '{}'
	];

	foreach ($arr as $key => $value) {
		$postData .= "\r\nContent-Disposition: form-data; name=\"" . $key ."\"\r\n"
			. "\r\n"
			. "$value\r\n"
			. "--$boundary";
	}
	$postData .= "--\r\n\r\n";

	
	// echo $postData . PHP_EOL;
	// echo strlen($postData) . PHP_EOL;

	$out = "POST /psc/missions/save HTTP/1.1\r\n";
    $out .= "Host: " . $host . "\r\n";
	$out .= "X-CSRF-TOKEN: yoUOXQuw1szk5OyZ0HKjlVl5ZArN1j1oqUi5bBI6\r\n";
	$out .= "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) SFive/80.0 Chrome/80.0.3987.145 Safari/537.36\r\n";
	$out .= "Origin: http://ttcd-v1.cttd.tk\r\n";
	$out .= "Referer: http://ttcd-v1.cttd.tk/psc/missions\r\n";
	$out .= "Content-Type: multipart/form-data; boundary=$boundary\r\n";
	$out .= "Content-Length: " . strlen($postData) . "\r\n";
	$out .= "Cookie: laravel_session=eyJpdiI6IlBcL1dFWjRvMll3cTdiVzFFNXpSM0lnPT0iLCJ2YWx1ZSI6IldYT3hyUTZIY0M3NEhlandEdnNVcjNEMUk1OHlucldDNUFHZENIV1gyNWY4VnJqcUpDWGZwWjIwbUtYZ1lLNEciLCJtYWMiOiIxNzA1Mjc4NDMwMTA2MmE4ODQ4MjczZjczNzU2MjA4ZjJhMzNhNjM5MWNhMzk2NjBjYWUyZjFmYWI3Mzg4YzViIn0%3D\r\n";
	$out .= "Connection: Close\r\n";
	$out .= "\r\n";
	// $out .= "\r\n";
	$out .= $postData;
	// $out .= "\r\n";

    fwrite($fp, $out);
    while (!feof($fp)) {
        echo fgets($fp, 128);
    }
    fclose($fp);
}
