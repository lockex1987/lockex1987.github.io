<?php

include 'bootstrap.php';

// Đường dẫn file đầu vào
$filePath = $_GET['filePath'];

// Lấy nội dung file
$content = file_get_contents($rootFolder . $filePath);

// Trả về cho client
echo $content;
