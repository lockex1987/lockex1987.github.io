<?php

include_once 'bootstrap.php';

// Lấy tham số JSON từ request
$params = getJsonParams();
$folder = $params->folder;
$path = $rootFolder . $params->path;

// Thực thi
$result = FileManager::delete($path);

// Trả về cho client
responseJson([
    'code' => $result ? 0 : 1
]);
