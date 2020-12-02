<?php

/**
 * Chia ảnh thành các hàng.
 */
function getAllRows($img)
{
    $width = imagesx($img);
    $height = imagesy($img);
    $rows = [];
    $left = 0;
    $y1 = 0;
    $right = $width -1;
    $bottom = $height - 1;
    while (true) {
        [$y1, $y2] = getTopMostRow($img, $left, $y1, $right, $bottom);
        if ($y1 != -1) {
            $rows []= [$left, $y1, $right, $y2];
            $y1 = $y2 + 5;
        } else {
            break;
        }
    }
    return $rows;
}


function getAllFramesOfRow($img, $left, $top, $right, $bottom)
{
    $frames = [];
    $x1 = $left;
    while (true) {
        [$x1, $x2] = getLeftMostFrame($img, $x1, $top, $right, $bottom);
        if ($x1 == -1) {
            break;
        }
        $frames []= [$x1, $top, $x2, $bottom];
        $x1 = $x2 + 5;
    }
    return $frames;
}


/**
 * Trả về hàng đầu tiên (từ trên xuống).
 * Trả về mảng, phần tử thứ nhất là chỉ số dòng trên, phần tử thứ hai là chỉ số dòng dưới.
 */
function getTopMostRow($img, $left, $top, $right, $bottom)
{
    if ($top >= $bottom) {
        return [-1, -1];
    }

    // Tìm dòng trên
    $y1 = $top;
    while ($y1 < $bottom && isGutterRow($img, $y1, $left, $right)) {
        $y1++;
    }
    if ($y1 == $bottom) {
        return [-1, -1];
    }

    // Tìm dòng dưới
    $y2 = $y1 + 5;
    while ($y2 < $bottom && !isGutterRow($img, $y2, $left, $right)) {
        $y2++;
    }
    $minFrameHeight = 100;
    if ($y2 - $y1 < $minFrameHeight) {
        return [-1, -1];
    }

    return [$y1, $y2];
}


function getLeftMostFrame($img, $left, $top, $right, $bottom)
{
    // Tìm cột bên trái
    $x1 = $left;
    while ($x1 < $right && isGutterColumn($img, $x1, $top, $bottom)) {
        $x1++;
    }
    if ($x1 >= $right) {
        return [-1, -1];
    }

    // Tìm cột bên phải    
    $x2 = $x1 + 5;
    if ($x2 > $right) {
        return [-1, -1];
    }
    while ($x2 < $right && !isGutterColumn($img, $x2, $top, $bottom)) {
        $x2++;
    }
    $minFrameWidth = 150;
    if ($x2 - $x1 < $minFrameWidth) {
        return [-1, -1];
    }

    return [$x1, $x2];
}


/**
 * Dòng có phải là dòng trắng hay không.
 */
function isGutterRow($img, $row, $left, $right)
{
    // $nonWhite = 0;
    for ($col = $left; $col <= $right; $col++) {
        if (!isWhitePixel($img, $col, $row)) {
            // $nonWhite++;
            return false;
        }
    }
    // return $nonWhite == 0;
    return true;
}


function isGutterColumn($img, $col, $top, $bottom)
{
    // $nonWhite = 0;
    for ($row = $top; $row <= $bottom; $row++) {
        if (!isWhitePixel($img, $col, $row)) {
            // $nonWhite++;
            return false;
        }
    }
    // return $nonWhite == 0;
    return true;
}


function isWhitePixel($img, $col, $row)
{
    $colorIndex = imagecolorat($img, $col, $row);
    $a = imagecolorsforindex($img, $colorIndex);    
    $red = $a['red'];
    $green = $a['green'];
    $blue = $a['blue'];

    $threshold = 210;

    return ($red >= $threshold &&
            $green >= $threshold &&
            $blue >= $threshold);
}


function createMonoImage()
{
    // imagefilter($img, IMG_FILTER_EDGEDETECT);
    // imagefilter($img, IMG_FILTER_GRAYSCALE);
    // imagefilter($img, IMG_FILTER_CONTRAST, 0.8);
    // imagefilter($img, IMG_FILTER_GRAYSCALE);
    // imagefilter($img, IMG_FILTER_CONTRAST, -100);
    // imagefilter($img, IMG_FILTER_EDGEDETECT);
    // imagefilter($img, IMG_FILTER_GRAYSCALE);
	// imagefilter($img, IMG_FILTER_NEGATE);
	// imagefilter($img, IMG_FILTER_GRAYSCALE);
	// imagefilter($img, IMG_FILTER_COLORIZE, 100, 50, 0);
}


function getFileExtension($path)
{
    $ext = strtolower(substr($path, strrpos($path, '.') + 1));
    return $ext;
}


function getImageFromPath($path)
{
    $ext = getFileExtension($path);
    switch ($ext) {
    case 'jpg':
    case 'jpeg':
        $img = imagecreatefromjpeg($path);
        break;
    case 'gif':
        $img = imagecreatefromgif($path);
        break;
    case 'png':
        $img = imagecreatefrompng($path);
    break;
    }
    return $img;
}


function writeImageToFile($img, $path, $ext)
{
    switch($ext) {
    case 'jpg':
    case 'jpeg':
        imagejpeg($img, $path);
        break;
    case 'gif':
        imagegif($img, $path);
        break;
    case 'png':
        imagepng($img, $path);
        break;
    }
}


function cropImages($img, $grid, $ext, $outputFolder, $fileName)
{
    $idx = 0;
    // print_r($grid);
    // return;
    foreach ($grid as $rows) {
        foreach ($rows as [$left, $top, $right, $bottom]) {
            $rect = [
                'x' => $left,
                'y' => $top,
                'width' => $right - $left + 1,
                'height' => $bottom - $top + 1
            ];
            $cropedImage = imagecrop($img, $rect);
            $outputPath = $outputFolder . $fileName . '-' . str_pad($idx + 1, 3, '0', STR_PAD_LEFT) . '.' . $ext;
            writeImageToFile($cropedImage, $outputPath, $ext);
            imagedestroy($cropedImage); 

            $idx++;
        }
    }
}


function splitImage($inputPath)
{
    $outputFolder = '_output/';
    $img = getImageFromPath($inputPath);
    $ext = getFileExtension($inputPath);
    $baseName = basename($inputPath);
    $fileName = str_replace('.' . $ext, '', $baseName);
    // echo $fileName . "\n";
    // return;

    $rows = getAllRows($img);
    // print_r($rows);

    if (count($rows) < 2) {
        copy($inputPath, $outputFolder . $baseName);
        return;
    }

    $grid = [];
    $idx = 0;
    foreach ($rows as [$left, $top, $right, $bottom]) {
        $frames = getAllFramesOfRow($img, $left, $top, $right, $bottom);
        // print_r($frames);
        if (count($frames) == 0) {
            $frames = [
                [$left, $top, $right, $bottom]
            ];
        }
        $grid []= $frames;

        $idx++;
    }

    cropImages($img, $grid, $ext, $outputFolder, $fileName);
    imagedestroy($img);
}


function main()
{
    // splitImage('data-files/05-004.jpg');
    // return;

    $folder = 'data-files';
    $files = scandir($folder);
    foreach ($files as $f) {
        if (!in_array($f, ['.', '..'])) {
            $inputPath = $folder . DIRECTORY_SEPARATOR . $f;
            if (is_file($inputPath)) {
                echo $inputPath . "\n";
                splitImage($inputPath);
            }
        }
    }
}


main();
