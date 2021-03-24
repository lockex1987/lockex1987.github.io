<?php

/**
 * Gộp các ảnh nhỏ thành ảnh lớn.
 * Chú ý: Đang chỉ xử lý các ảnh JPG.
 * @param array $paths Danh sách đường dẫn các ảnh nhỏ gốc
 * @param ?string $oputputFilePath Đường dẫn ảnh lớn đầu ra, truyền vào null nếu muốn output luôn cho trình duyệt
 * @return void
 */
function mergeImages(array $paths, ?string $oputputFilePath): void
{
	$sources = [];
	$arrWidth = [];
	$arrHeight = [];
	foreach ($paths as $p) {
		$img = imagecreatefromjpeg($p);
		[$width, $height] = getimagesize($p);
		$sources[] = $img;
		$arrWidth[] = $width;
		$arrHeight[] = $height;
	}

	// Khởi tạo ảnh đích
	$destWidth = max($arrWidth);
	$destHeight = array_sum($arrHeight);
	$destImage = imagecreatetruecolor($destWidth, $destHeight);

	// Copy các ảnh gốc đến ảnh đích
	// Ghép theo cột dọc từ trên xuống
	$destY = 0;
	foreach ($sources as $idx => $src) {
		imagecopy(
			$destImage,
			$src,
			0, $destY,
			0, 0, $arrWidth[$idx], $arrHeight[$idx]
		);
		$destY += $arrHeight[$idx];
		
		
	}

	if ($oputputFilePath) {
		imagejpeg($destImage, $oputputFilePath);
	} else {
		header('Content-type: image/jpeg');
		imagejpeg($destImage, null, 100);
	}

	// Giải phóng bộ nhớ
	foreach ($sources as $src) {
		imagedestroy($src);
	}
	imagedestroy($destImage);
}


/**
 * Đọc file 'merge-couples.json' là kết quả của script check_images_in_folder.php.
 * Nối các file ảnh.
 * @param string $folderPath Đường dẫn thư mục đầu ra
 */
function main(string $folderPath): void
{
    $filePath = 'merge-couples.json';
	$mergeCouples = json_decode(file_get_contents($filePath));
	if (!file_exists($folderPath)) {
		mkdir($folderPath);
	}
	foreach ($mergeCouples as $idx => $couple) {
		$oputputFilePath = $folderPath . '/' . str_pad($idx + 1, 3, '0', STR_PAD_LEFT,) . '.jpg';
		if (count($couple) == 1) {
			copy($couple[0], $oputputFilePath);
		} else {
			echo $couple[0] . ', ' . $couple[1] . PHP_EOL;
			mergeImages($couple, $oputputFilePath);
		}
    }
}


// 'D:/new/mickey en tam giac quy bermuda truyen' . ' (merged)'
$folderPath = $argv[1];
main($folderPath);
