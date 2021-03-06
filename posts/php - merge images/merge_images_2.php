<?php 

// define the width and height of our images
define('WIDTH', 200);
define('HEIGHT', 200);

$destImage = imagecreatetruecolor(WIDTH, HEIGHT);

// Make sure the transparency information is saved
imagesavealpha($destImage, true);

// Create a fully transparent background (127 means fully transparent)
$transparentBackground = imagecolorallocatealpha($destImage, 0, 0, 0, 127);

// Fill the image with a transparent background
imagefill($destImage, 0, 0, $transparentBackground);


// Tạo 3 đối tượng ảnh từ  3 đường dẫn PNG đầu vào
$a = imagecreatefrompng('images/1.png');
$b = imagecreatefrompng('images/2.png');
$c = imagecreatefrompng('images/3.png');

// Copy mỗi ảnh đến ảnh đích
imagecopy($destImage, $a, 0, 0, 0, 0, WIDTH, HEIGHT);
imagecopy($destImage, $b, 0, 0, 0, 0, WIDTH, HEIGHT);
imagecopy($destImage, $c, 0, 0, 0, 0, WIDTH, HEIGHT);

// Send the appropriate headers and output the image in the browser
header('Content-Type: image/png');
imagepng($destImage);

// Destroy all the image resources to free up memory
imagedestroy($a);
imagedestroy($b);
imagedestroy($c);
imagedestroy($destImage);
