<?php

/**
 * Tính vị trí x, y để cho chữ vào giữa.
 */
function calculateCenterPosition($img, $fontSize, $angle, $fontPath, $txt): array
{
    $imageWidth = imagesx($img);
    $imageHeight = imagesy($img);
    $box = imagettfbbox($fontSize, $angle, $fontPath, $txt);
    // 0	lower left corner, X position
    // 1	lower left corner, Y position
    // 2	lower right corner, X position
    // 3	lower right corner, Y position
    // 4	upper right corner, X position
    // 5	upper right corner, Y position
    // 6	upper left corner, X position
    // 7	upper left corner, Y position
    $textWidth = max([$box[2], $box[4]]) - min([$box[0], $box[6]]);
    $textHeight = max([$box[5], $box[7]]) - min([$box[1], $box[3]]);

    $x = ceil(($imageWidth - $textWidth) / 2);
    $y = ceil(($imageHeight - $textHeight) / 2);
    return [$x, $y];
}


/**
 * Sinh ảnh bìa.
 */
function generateCover()
{
    $img = imagecreatefromjpeg('images/cover-bg.jpg');
    $textColor = imagecolorallocate($img, 168, 0, 0);
    $title = 'Thiên Long Bát Bộ';
    $chapter = '06';
    $fontPath = realpath('fonts/UVN-MucCham.ttf');
    $fontSize = 100;
    $angle = 0;
    $x = 50;
    $y = 150;
    imagettftext($img, $fontSize, $angle, $x, $y, $textColor, $fontPath, $title);
    imagettftext($img, 100, $angle, 150, 300, imagecolorallocate($img, 255, 255, 255), realpath('fonts/VNI-Nhatban.ttf'), $chapter);
    header('Content-type: image/jpeg');
    imagejpeg($img);
    imagejpeg($img, 'cover-' . '.jpg', 75); // . $chapter
    imagedestroy($img);
}


generateCover();
