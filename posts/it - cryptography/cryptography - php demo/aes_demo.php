<?php

var_dump(openssl_get_cipher_methods());

function decryptA2p($encryptedBase64, $isUnicode)
{
	$encryptionKey = 'stackjava.com.if';
	$iv = '12345678ttek35()';
	$method = 'aes-128-cfb';
	/*
	'aes-128-cbc',
	'aes-128-cfb',
	'aes-128-cfb1',
	'aes-128-cfb8',
	'aes-128-ofb',
	
	'aes-192-cbc',
	'aes-192-cfb',
	'aes-192-cfb1',
	'aes-192-cfb8',
	'aes-192-ofb',

	'aes-256-cbc',
	'aes-256-cfb',
	'aes-256-cfb1',
	'aes-256-cfb8',
	'aes-256-ofb',
	*/
	$s = openssl_decrypt($encryptedBase64, $method, $encryptionKey, 0, $iv);
	if ($isUnicode) {
		$s = mb_convert_encoding($s, 'UTF-8', 'UTF-16');
		// $s = mb_convert_encoding($s, 'UTF-16', 'UTF-8');
		// $s = iconv('UTF-16', 'UTF-8', $s);
		// $s = iconv('UTF-8', 'UTF-16', $s);
	}
	return $s;
}

$data = [
	[
		'content' => 'YlBfisYuEUlt/JBGQYWaMa7EKg==',
		'isUnicode' => false,
		'expected' => 'Nguyễn Anh Tuấn'
	]
];

foreach ($data as $e) {
	echo decryptA2p($e['content'], $e['isUnicode']) . "\n" . $e['expected'] . "\n\n";
}
