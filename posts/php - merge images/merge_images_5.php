<?php

// Load các ảnh gốc
$paths = [
	'papyrus-002.jpg',
	'papyrus-003.jpg'
];
$sources = [];
$arrWidth = [];
$arrHeight = [];
foreach ($paths as $p) {
	$path = 'images/' . $p;
	$img = imagecreatefromjpeg($path);
	[$width, $height] = getimagesize($path);
	$sources[] = $img;
	$arrWidth[] = $width;
	$arrHeight[] = $height;
}

// Khởi tạo ảnh đích
$destWidth = max($arrWidth);
$destHeight = array_sum($arrHeight);
$destImage = imagecreatetruecolor($destWidth, $destHeight);

// Copy các ảnh gốc đến ảnh đích
// Ghép theo cột dọc từ trên xuống
$destY = 0;
foreach ($sources as $idx => $src) {
	imagecopy(
		$destImage,
		$src,
		0, $destY,
		0, 0, $arrWidth[$idx], $arrHeight[$idx]
	);
	$destY += $arrHeight[$idx];
	
	
}

header('Content-type: image/jpeg');
imagejpeg($destImage, null, 100);

// Giải phóng bộ nhớ
foreach ($sources as $src) {
	imagedestroy($src);
}
imagedestroy($destImage);
