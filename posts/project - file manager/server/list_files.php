<?php

include 'config.php';
include 'FileManager.php';

// Thư mục đầu vào
$folder = $_GET['folder'];

// Liệt kê thư mục
$result = FileManager::listFolder($rootFolder . $folder);

// Trả về cho client
header('Content-type: application/json');
echo json_encode($result);
