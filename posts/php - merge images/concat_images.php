<?php
/*
1) Load both images with

http://www.php.net/manual/en/function.imagecreatefromjpeg.php

2) Get 1st image height and width with

http://www.php.net/manual/en/function.imagesy.php

http://www.php.net/manual/en/function.imagesx.php

3) Create larger image with height+20

http://www.php.net/manual/en/function.imagecreatetruecolor.php

4) Copy the first image and the second image to the larger image

http://www.php.net/manual/en/function.imagecopy.php

5) Save it

http://www.php.net/manual/en/function.imagejpeg.php
https://php.net/manual/en/function.imagepng.php

Có thể lưu ra file hoặc hiển thị trực tiếp ra trình duyệt

6) Done
*/

header ("Content-type: image/jpeg");
$src_dir = './images/'; 
$numbers = range(1, 3); 
shuffle($numbers); 
$dest_w = 0;

foreach ($numbers as $key => $val) {
	$src = $src_dir . $val . '.jpg';
	$size = getimagesize($src);
	$src_gds[$key]['img'] = imagecreatefromjpeg($src);
	$src_gds[$key]['w'] = $size[0];
	$src_gds[$key]['h'] = $size[1];
	$dest_w += $src_gds[$key]['w'];
	$hts[] = $src_gds[$key]['h'];
}

$dest_h = max($hts);
$dest_gd = imagecreatetruecolor($dest_w, $dest_h);
$dest_x = 0;
foreach ($src_gds as $gd) {
	imagecopymerge($dest_gd, $gd['img'], $dest_x, 0, 0, 0, $gd['w'], $gd['h'], 99);
	$dest_x += $gd['w'];
	imagedestroy($gd['img']); 
}

imagejpeg($dest_gd, '', 90); 
imagedestroy($dest_gd);
