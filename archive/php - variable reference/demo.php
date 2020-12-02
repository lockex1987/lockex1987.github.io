<?php

// https://www.toptal.com/php/10-most-common-mistakes-php-programmers-make
// https://www.php.net/manual/en/language.references.php

$arr = [
	[
		'name' => 'Anna'
	],
	[
		'name' => 'Bruce'
	],
	[
		'name' => 'Clark'
	],
];

$countArr = count($arr);

/*
foreach ($arr as $e) {
	$e['age'] = 30;
}
*/

/*
for ($i = 0; $i < $countArr; $i++) {
	$e = $arr[$i];
	$e['age'] = 30;
}
*/

for ($i = 0; $i < $countArr; $i++) {
	$e = & $arr[$i];
	$e['age'] = 30;
}

/*
$names = 'Names: ';

foreach ($arr as $e) {
	$names .= $e['name'] . ", ";
}

echo $names . "\n";
*/

unset($e);

for ($i = 0; $i < $countArr; $i++) {
	$e = $arr[$i];
	print_r($e);
}
