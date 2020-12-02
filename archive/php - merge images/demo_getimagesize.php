<?php
// https://www.php.net/manual/en/function.getimagesize.php
// https://www.php.net/list
$image_info = getimagesize("geeks.png");
print_r($image_info);

//[$width, $height, $type, $attr] = getimagesize("geeks.png");
list($width, $height, $type, $attr) = getimagesize("geeks.png");
echo "Width of image : " . $width . "\n";
echo "Height of image : " . $height . "\n";
echo "Image type :" . $type . "\n";
echo "Image attribute :" .$attr;
