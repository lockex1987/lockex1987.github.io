<?php

$srcDir = 'images/'; 
$numbers = range(1, 3); 
shuffle($numbers);
// Chiều rộng ảnh đích
// Chúng ta sẽ xếp các ảnh theo chiều ngang, cùng hàng
$destWidth = 0;

// Mảng các thông số đầu vào
$srcGds = [];

// Mảng các chiều cao để tính ra chiều cao lớn nhất, là chiều cao của ảnh đích
$hts = [];

foreach ($numbers as $key => $val) {
	$src = $srcDir . $val . '.png';
	$size = getimagesize($src);
	$srcGds[$key]['img'] = imagecreatefrompng($src); // Đối tượng ảnh
	$srcGds[$key]['w'] = $size[0]; // Chiều rộng
	$srcGds[$key]['h'] = $size[1]; // Chiều cao
	$destWidth += $srcGds[$key]['w']; // Tăng chiều rộng ảnh đích
	$hts[] = $srcGds[$key]['h'];
}

$destHeight = max($hts);

// echo $destWidth . PHP_EOL;
// echo $destHeight . PHP_EOL;

$destGd = imagecreatetruecolor($destWidth, $destHeight);
$destX = 0;

foreach ($srcGds as $gd) {
	/*
	imagecopy(
		$destGd,
		$gd['img'],
		$destX, 0, 0, 0,
		$gd['w'], $gd['h']
	);
	*/
	imagecopymerge(
		$destGd,
		$gd['img'],
		$destX, 0, 0, 0,
		$gd['w'], $gd['h'],
		99
	);
	$destX += $gd['w'];
	imagedestroy($gd['img']); 
}

header('Content-type: image/png');
imagepng($destGd); // , '', 90
imagedestroy($destGd);
