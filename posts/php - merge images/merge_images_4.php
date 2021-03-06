<?php

// https://diceattack.wordpress.com/2011/01/03/combining-multiple-images-using-php-and-gd/ 

// Source image paths (DISCLAIMER: this is just to demonstrate, to generate a real TT map you need 144 of these)
$srcImagePaths = [
	'tile_e_o_fh.png',
	'tile_e_g_fh.png',
	'tile_e_b_fh.png',
	'tile_b_q_fh.png'
];


// Khởi tạo ảnh base với màu nền
$tileWidth = 28;
$tileHeight = 28;
$numberOfTiles = 12;
$pxBetweenTiles = 1;
$leftOffSet = 1;
$topOffSet = 1;

$mapWidth = ($tileWidth + $pxBetweenTiles) * $numberOfTiles;
$mapHeight = $mapWidth;

$mapImage = imagecreatetruecolor($mapWidth, $mapHeight);
$bgColor = imagecolorallocate($mapImage, 50, 40, 0);
imagefill($mapImage, 0, 0, $bgColor);


/*
 * Từ chỉ số ảnh sang tọa độ (x, y).
 */
function indexToCoords($index)
{
	global $tileWidth, $tileHeight, $pxBetweenTiles, $leftOffSet, $topOffSet, $numberOfTiles;

	$x = ($index % $numberOfTiles) * ($tileWidth + $pxBetweenTiles) + $leftOffSet;
	$y = floor($index / $numberOfTiles) * ($tileHeight + $pxBetweenTiles) + $topOffSet;
	return array($x, $y);
}


// Copy các ảnh gốc đến ảnh đích
foreach ($srcImagePaths as $index => $srcImagePath) {
	[$x, $y] = indexToCoords($index);
	$tileImg = imagecreatefrompng('images/' . $srcImagePath);
	imagecopy(
		$mapImage,
		$tileImg,
		$x, $y, 0, 0,
		$tileWidth, $tileHeight
	);
	imagedestroy($tileImg);
}

/*
 * RESCALE TO THUMB FORMAT
 */
$thumbSize = 200;
$thumbImage = imagecreatetruecolor($thumbSize, $thumbSize);
imagecopyresampled(
	$thumbImage,
	$mapImage,
	0, 0, 0, 0,
	$thumbSize, $thumbSize,
	$mapWidth, $mapWidth
);

header('Content-type: image/png');
imagepng($thumbImage);
