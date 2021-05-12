<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\FileManager;
use Cttd\FileManager\CommonUtils;


// TODO: Chạy file-manager-reactphp dạng Linux service, có ghi log, sử dụng > out.log (https://cttd.tk/posts/linux%20-%20service%20management/)
function handleRequest()
{
    $folder = $_GET['folder'];
    $result = FileManager::listFolder(ROOT_FOLDER . $folder);
    // $result = FileManager::listFolder('D:/htdocs/lockex1987.github.io/posts/');
    CommonUtils::responseJson($result);
}

handleRequest();
