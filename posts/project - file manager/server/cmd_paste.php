<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\FileManager;
use Cttd\FileManager\CommonUtils;


function handleRequest(): void
{
    // Lấy tham số JSON từ request
    $params = CommonUtils::getJsonParams();
    $type = $params->type;
    $oldPath = ROOT_FOLDER . $params->oldPath;
    $newPath = ROOT_FOLDER . $params->newPath;

    // Thực thi
    if (file_exists($newPath)) {
        $code = 2;
        $message = 'File đã tồn tại';
    } else {
        $message = '';
        if ($type == 'copy') {
            $result = FileManager::copy($oldPath, $newPath);
        } else if ($type == 'cut' || $type == 'rename') {
            $result = FileManager::move($oldPath, $newPath);
        }
        $code = $result ? 0 : 1;
    }

    // Trả về cho client
    CommonUtils::responseJson([
        'code' => $code,
        'message' => $message
    ]);
}

handleRequest();
