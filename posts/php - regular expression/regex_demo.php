<?php

function validateStrongPassword()
{
	// $pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/';
	$pattern = '/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!"#$%&()*+,.\/:;<=>?@^_`{|}~\'\-\[\]\\\\])/';

	$data = [
		'123456aA',
		'12345678aA@'
	];
	foreach ($data as $s) {
		echo preg_match($pattern, $s) . ': ' . $s . "\n";		
	}
}

function validateUrl()
{
	$pattern = "/^https?:\/\/[\w.-]+\.[\w\.-]+[\w\-\._~:\/?#[\]@!\$&\'\(\)\*\+,;=.]+$/";

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
		
		if (preg_match($pattern, $s)) {
			echo $s . "\n";
		}
	}
}

// validateUrl();
validateStrongPassword();
