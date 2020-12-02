<?php
// https://diceattack.wordpress.com/2011/01/03/combining-multiple-images-using-php-and-gd/ 

// Source image paths (DISCLAIMER: this is just to demonstrate, to generate a real TT map you need 144 of these)
$srcImagePaths = [
'tile_e_o_fh.png',
'tile_e_g_fh.png',
'tile_e_b_fh.png',
'tile_b_q_fh.png'
];

/*
 * INIT BASE IMAGE FILLED WITH BACKGROUND COLOR
 */
$tileWidth = $tileHeight = 28;
$numberOfTiles = 12;
$pxBetweenTiles = 1;
$leftOffSet = $topOffSet = 1;

$mapWidth = $mapHeight = ($tileWidth + $pxBetweenTiles) * $numberOfTiles;

$mapImage = imagecreatetruecolor($mapWidth, $mapHeight);
$bgColor = imagecolorallocate($mapImage, 50, 40, 0);
imagefill($mapImage, 0, 0, $bgColor);

/*
 *  PUT SRC IMAGES ON BASE IMAGE
 */
function indexToCoords($index)
{
	global $tileWidth, $pxBetweenTiles, $leftOffSet, $topOffSet, $numberOfTiles;

	$x = ($index % 12) * ($tileWidth + $pxBetweenTiles) + $leftOffSet;
	$y = floor($index / 12) * ($tileWidth + $pxBetweenTiles) + $topOffSet;
	return array($x, $y);
}

/*
 * COPY SOURCE IMAGES TO MAP
 */
foreach ($srcImagePaths as $index => $srcImagePath) {
	list ($x, $y) = indexToCoords($index);
	$tileImg = imagecreatefrompng($srcImagePath);
	imagecopy($mapImage, $tileImg, $x, $y, 0, 0, $tileWidth, $tileHeight);
	imagedestroy($tileImg);
}

/*
 * RESCALE TO THUMB FORMAT
 */
$thumbSize = 200;
$thumbImage = imagecreatetruecolor($thumbSize, $thumbSize);
imagecopyresampled($thumbImage, $mapImage, 0, 0, 0, 0, $thumbSize, $thumbSize, $mapWidth, $mapWidth);

header ("Content-type: image/png");
imagepng($thumbImage);
?>
