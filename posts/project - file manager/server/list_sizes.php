<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\ListSizes;
use Cttd\FileManager\CommonUtils;


function handleRequest()
{
    $folder = $_GET['folder'];
    $listSizes = new ListSizes();
    $arr = $listSizes->listFolder($folder);
    CommonUtils::responseJson($arr);
}

handleRequest();
