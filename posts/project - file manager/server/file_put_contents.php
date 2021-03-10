<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\CommonUtils;


function handleRequest(): void
{
    // Lấy tham số JSON từ request
    $params = CommonUtils::getJsonParams();
    $content = $params->content;
    $filePath = ROOT_FOLDER . $params->filePath;

    $result = file_put_contents($filePath, $content);
    $code = $result ? 0 : 1;

    // Trả về cho client
    CommonUtils::responseJson([
        'code' => $code
    ]);
}

handleRequest();
