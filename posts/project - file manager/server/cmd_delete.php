<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\FileManager;
use Cttd\FileManager\CommonUtils;


function handleRequest(): void
{
    // Lấy tham số JSON từ request
    $params = CommonUtils::getJsonParams();
    $folder = $params->folder;
    $path = ROOT_FOLDER . $params->path;

    // Thực thi
    $result = FileManager::delete($path);

    // Trả về cho client
    CommonUtils::responseJson([
        'code' => $result ? 0 : 1
    ]);
}

handleRequest();
