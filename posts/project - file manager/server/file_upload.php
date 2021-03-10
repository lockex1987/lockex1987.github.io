<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\CommonUtils;


function handleRequest()
{
    $paramName = 'myFile'; // tên param của form
    $fileName = $_FILES[$paramName]['name']; // the file name
    $fileTmpLoc = $_FILES[$paramName]['tmp_name']; // file in the PHP tmp folder
    $fileSize = $_FILES[$paramName]['size']; // file size in bytes

    // Lưu file và trả về cho client
    if (move_uploaded_file($fileTmpLoc, ROOT_FOLDER . '/' . $fileName)) {
        CommonUtils::responseJson([
            'returnCode' => 0,
            'fileName' => $fileName,
            'fileSize' => $fileSize
        ]);
    } else {
        CommonUtils::responseJson([
            'returnCode' => 1
        ]);
    }
}

handleRequest();
