<?php

include_once 'bootstrap.php';

// Thư mục đầu vào
$folder = $_GET['folder'];

// Liệt kê thư mục
$result = FileManager::listFolder($rootFolder . $folder);

// Trả về cho client
responseJson($result);
