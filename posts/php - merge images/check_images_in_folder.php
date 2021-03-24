<?php

/**
 * Lọc danh sách các file ảnh.
 */
function filterImageFiles(string $folderPath): array
{
    $arr = scandir($folderPath);
    $ret = [];
    foreach ($arr as $f) {
        $fullPath = $folderPath . '/' . $f;
        if (is_file($fullPath)) {
            $ret[] = $fullPath;
        }
    }
    return $ret;
}


/**
 * Kiểm tra các file ảnh có cần merge hay không.
 * Chiều cao mỗi ảnh bình thường phải lớn hơn hoặc bằng 1200px.
 */
function checkNeedMerge(array $imagePaths): array
{
    $MIN_HEIGHT = 1200;
    $mergeCouples = [];
    $idx = 0;
    $size = count($imagePaths);
    while ($idx < $size) {
        $currentPath = $imagePaths[$idx];
        [$width, $height] = getimagesize($currentPath);
        if ($height < $MIN_HEIGHT) {
            $nextPath = $imagePaths[$idx + 1];
            $mergeCouples[] = [
                $currentPath,
                $nextPath
            ];
            $idx++;
        } else {
            $mergeCouples[] = [
                $currentPath
            ];
        }
        $idx++;
    }
    return $mergeCouples;
}


/**
 * Kiểm tra các ảnh trong một thư mục xem có cần merge hay không.
 * Trang web truyentranhphapbi hay tách thành các ảnh con, cần ghép lại.
 * Ghi ra file 'merge-couples.json'.
 */
function checkImagesInFolder(string $folderPath): void
{
    $imagePaths = filterImageFiles($folderPath);
    $mergeCouples = checkNeedMerge($imagePaths);
    foreach ($mergeCouples as $couple) {
        // echo $couple[0] . ', ' . $couple[1] . PHP_EOL;
    }
    $filePath = 'merge-couples.json';
    file_put_contents($filePath, json_encode($mergeCouples));
}


// 'D:/new/mickey en tam giac quy bermuda truyen'
$folderPath = $argv[1];
checkImagesInFolder($folderPath);
