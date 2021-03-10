<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\FileManager;
use Cttd\FileManager\CommonUtils;


function handleRequest(): void
{
    $params = CommonUtils::getJsonParams();
    $path = ROOT_FOLDER . $params->path;
    $result = FileManager::delete($path);
    CommonUtils::responseJson([
        'code' => $result ? 0 : 1
    ]);
}

handleRequest();
