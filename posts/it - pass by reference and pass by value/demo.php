<?php

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
echo 'Sử dụng foreach' . PHP_EOL;
// Không sửa mảng gốc
foreach ($arr as $e) {
	$e['age'] = 30;
}
var_dump($arr);
*/

/*
echo 'Sử dụng foreach với reference' . PHP_EOL;
// Có sửa mảng gốc
foreach ($arr as &$e) {
	$e['age'] = 30;
}
var_dump($arr);
*/

/**
 * Nếu khai báo $b thì không thay đổi mảng gốc
 * Nếu khai báo &$b thì có thay đổi
 */
/*
function changeArray($b): void
{
	// Có sửa mảng gốc
	foreach ($b as &$e) {
		$e['age'] = 30;
	}
}

changeArray($arr);
var_dump($arr);
*/

// Type là object thì có thay đổi, không cần truyền bằng reference
$arrObject = json_decode('[{ "name": "Nguyễn Anh Tuấn" }]');

/*
foreach ($arrObject as $e) {
	$e->age = 30;
}
var_dump($arrObject);
*/

function changeArrayObject($b): void
{
	// Có sửa mảng gốc
	foreach ($b as $e) {
		$e->age = 30;
	}
}

changeArrayObject($arrObject);
var_dump($arrObject);

/*
echo 'Sử dụng for, gán biến' . PHP_EOL;
// Không sửa mảng gốc
for ($i = 0; $i < $countArr; $i++) {
	$e = $arr[$i];
	$e['age'] = 30;
}
var_dump($arr);
*/

/*
echo 'Sử dụng for, gán biến theo địa chỉ' . PHP_EOL;
// Có sửa mảng gốc
for ($i = 0; $i < $countArr; $i++) {
	$e = & $arr[$i];
	$e['age'] = 30;
}
var_dump($arr);
*/

/*
echo 'Sử dụng for, không gán biến' . PHP_EOL;
// Có sửa mảng gốc
for ($i = 0; $i < $countArr; $i++) {
	$arr[$i]['age'] = 30;
}
var_dump($arr);
*/
