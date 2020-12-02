<?php 
//define the width and height of our images
define("WIDTH", 200);
define("HEIGHT", 200);

$dest_image = imagecreatetruecolor(WIDTH, HEIGHT);

//make sure the transparency information is saved
imagesavealpha($dest_image, true);

//create a fully transparent background (127 means fully transparent)
$trans_background = imagecolorallocatealpha($dest_image, 0, 0, 0, 127);

//fill the image with a transparent background
imagefill($dest_image, 0, 0, $trans_background);

//take create image resources out of the 3 pngs we want to merge into destination image
$a = imagecreatefrompng('1.png');
$b = imagecreatefrompng('2.png');
$c = imagecreatefrompng('3.png');

//copy each png file on top of the destination (result) png
imagecopy($dest_image, $a, 0, 0, 0, 0, WIDTH, HEIGHT);
imagecopy($dest_image, $b, 0, 0, 0, 0, WIDTH, HEIGHT);
imagecopy($dest_image, $c, 0, 0, 0, 0, WIDTH, HEIGHT);

//send the appropriate headers and output the image in the browser
header('Content-Type: image/png');
imagepng($dest_image);

//destroy all the image resources to free up memory
imagedestroy($a);
imagedestroy($b);
imagedestroy($c);
imagedestroy($dest_image);
?>
