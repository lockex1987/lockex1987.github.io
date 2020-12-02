<?php
//phpinfo();

// Thiết lập thông tin locale
// Không ăn
//setlocale(LC_ALL, 'en_US.UTF-8');
//setlocale(LC_CTYPE, array('en_US.UTF-8', 'English_United States.UTF-8', 'English_United States.UTF8'));
setlocale(LC_ALL, 'vn');

// Lấy thông tin locale
echo setlocale(LC_ALL, 0) . PHP_EOL;
echo setlocale(LC_CTYPE, 0) . PHP_EOL;

echo 'Tu danh ' . ((stripos('Trung Dũng', 'DŨNG') !== false) ? 'true' : 'false') . PHP_EOL;

echo stripos("Học Web Chuẩn", "Web Chuẩn") . PHP_EOL;

$arr = [
	'Ngọc Phương',
	'Trung Dũng',
	'Trung Dũng'
];

$search = 'DŨNG';
//$search = 'DŨNG';
//$search = 'dũng';

//echo $search . ', ' . mb_detect_encoding($search) . PHP_EOL;
//echo strtolower($search) . PHP_EOL;
//echo $search . PHP_EOL;
//echo strtolower($search) . PHP_EOL;
echo mb_strtolower($search, 'UTF-8') . PHP_EOL;
//echo 'dũng' . PHP_EOL;

foreach ($arr as $s) {
	//$check = (stripos($s, $search) !== false) ? 'true' : 'false';
	//$check = (strpos(strtolower($s), strtolower($search)) !== false) ? 'true' : 'false';
	//$check = (strstr(strtolower($s), strtolower($search)) !== false) ? 'true' : 'false';
	$check = (strpos(mb_strtolower($s, 'UTF-8'), mb_strtolower($search, 'UTF-8')) !== false) ? 'true' : 'false';
	echo $s . ', ' . $check . ', ' . PHP_EOL; //  . mb_detect_encoding($s)
	//echo strtolower($s) . PHP_EOL;
	//echo mb_strtolower($s, 'UTF-8') . PHP_EOL;
}