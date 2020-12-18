<?php
// Load các ảnh
$stamp = imagecreatefrompng('images/copyrights.png');
$img = imagecreatefromjpeg('images/hoi-001.jpg');

// Set the margins for the stamp and get the height/width of the stamp image
$margin_right = 10;
$margin_bottom = 10;
$sx = imagesx($stamp);
$sy = imagesy($stamp);

// Copy the stamp image onto our photo using the margin offsets and the photo 
// width to calculate positioning of the stamp. 
imagecopy(
	$img,
	$stamp,
	imagesx($img) - $sx - $margin_right,
	//10,
	imagesy($img) - $sy - $margin_bottom,
	//10,
	0,
	0,
	$sx,
	$sy
);

// Thêm text
//$whiteColor = imagecolorallocate($img, 25, 233, 12);
//$blackColor = imagecolorallocate($img, 0, 0, 0);
//imagestring($img, 5, 15, 30, 'Copyrights Programmerblog.net', $blackColor);


$blackColor = imagecolorallocate($img, 0, 0, 0);
$whiteColor = imagecolorallocate($img, 255, 255, 255);
$text = 'Hồi 1';
// Phải dùng đường dẫn tuyệt đối
$courierNewFontPath = realpath('fonts/courbd.ttf');
$arialFontPath = realpath('fonts/arial.ttf');
$size = 48;
$positionX = 10;
$positionY = 180;
imagefttext($img, $size, 0, $positionX, $positionY, $blackColor, $arialFontPath, $text);

//$title = 'TAM QUỐC DIỄN NGHĨA';
//$title = strtoupper('Tam quốc diễn nghĩa');
$title = mb_strtoupper('Tam quốc diễn nghĩa');
imagefttext($img, 32, 0, 10, 80, $blackColor, $courierNewFontPath, $title);

// Hiển thị ra trình duyệt
header('Content-type: image/png');
imagepng($img);

// Lưu ra file
//imagejpeg($img, 'output-001.jpg', 100);
//imagejpeg($img, 'output-001.jpg');

// Free memory
imagedestroy($img);
