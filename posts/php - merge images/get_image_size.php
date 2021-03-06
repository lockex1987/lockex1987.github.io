<?php

// https://www.php.net/manual/en/function.getimagesize.php
// https://www.php.net/list

$imageInfo = getimagesize('images/geeks.png');
[$width, $height, $type, $attr] = getimagesize('images/geeks.png');

print_r($imageInfo);

echo 'Width of image : ' . $width . PHP_EOL;
echo 'Height of image : ' . $height . PHP_EOL;
echo 'Image type :' . $type . PHP_EOL;
echo 'Image attribute :' .$attr;
