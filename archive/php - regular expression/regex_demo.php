<?php
$pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/';
$value = '123456aA@';
// echo preg_match($pattern, $value) . "\n";

function validateUrl()
{
	$data = [
		'http://duongdanmau.abc/xyz',
		'javascript:alert(origin)//http://anything.com/xyz',
		'javascript:alert(origin)',
		'http://vnexpress.net'
	];
	foreach ($data as $s) {
		/*
		if (filter_var($s, FILTER_VALIDATE_URL) !== FALSE) {
			echo $s . ': ' . filter_var($s, FILTER_VALIDATE_URL) . "\n";
		}
		*/
		$pattern = "/^https?:\/\/[\w.-]+\.[\w\.-]+[\w\-\._~:\/?#[\]@!\$&\'\(\)\*\+,;=.]+$/";
		if (preg_match($pattern, $s)) {
			echo $s . "\n";
		}
	}
}

validateUrl();
