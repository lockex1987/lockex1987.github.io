<?php

include 'config.php';
include 'FileManager.php';

// Lấy tham số JSON từ request
$params = json_decode(file_get_contents('php://input'));
$folder = $params->folder;
$path = $rootFolder . $params->path;

// Thực thi
$result = FileManager::delete($path);

// Trả về cho client
$resp = [
    'code' => $result ? 0 : 1
];
header('Content-type: application/json');
echo json_encode($resp);
