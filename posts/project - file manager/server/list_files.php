<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\FileManager;
use Cttd\FileManager\CommonUtils;


function handleRequest()
{
    $folder = $_GET['folder'];
    $result = FileManager::listFolder(ROOT_FOLDER . $folder);
    // $result = FileManager::listFolder('D:/htdocs/lockex1987.github.io/posts/');
    CommonUtils::responseJson($result);
}

handleRequest();
