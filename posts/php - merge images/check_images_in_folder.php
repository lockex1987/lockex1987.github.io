<?php


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


function checkNeedMerge(array $imagePaths): array
{
    $mergeCouples = [];
    $idx = 0;
    $size = count($imagePaths);
    while ($idx < $size) {
        $currentPath = $imagePaths[$idx];
        [$width, $height] = getimagesize($currentPath);
        if ($height < 1200) {
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


function init(): void
{
    $folderPath = 'D:/new/mickey en tam giac quy bermuda truyen';
    $imagePaths = filterImageFiles($folderPath);
    $mergeCouples = checkNeedMerge($imagePaths);
    foreach ($mergeCouples as $couple) {
        // echo $couple[0] . ', ' . $couple[1] . PHP_EOL;
    }
    $filePath = 'merge-couples.json';
    file_put_contents($filePath, json_encode($mergeCouples));
}


init();
