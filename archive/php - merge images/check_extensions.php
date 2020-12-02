<?php
if (extension_loaded('gd')) {
	print_r(gd_info());
} else {
	echo 'GD is not available.' . "\n";
}

if (extension_loaded('imagick')) {
	$imagick = new Imagick();
	print_r($imagick->queryFormats());
} else {
	echo 'ImageMagick is not available.' . "\n";
}
