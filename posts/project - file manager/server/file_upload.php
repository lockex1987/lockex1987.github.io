<?php
include 'config.php';

$paramName = 'myFile'; // tên param của form
$fileName = $_FILES[$paramName]['name']; // the file name
$fileTmpLoc = $_FILES[$paramName]['tmp_name']; // file in the PHP tmp folder
$fileSize = $_FILES[$paramName]['size']; // file size in bytes

// Lưu file và trả về cho client
header('Content-type: application/json');

if (move_uploaded_file($fileTmpLoc, $rootFolder . '/' . $fileName)) {
    echo json_encode([
        'returnCode' => 0,
        'fileName' => $fileName,
        'fileSize' => $fileSize
    ]);
} else {
    echo json_encode([
        'returnCode' => 1
    ]);
}
