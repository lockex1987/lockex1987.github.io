<?php
include 'config.php';

$folder = $_GET['folder'];


// Đọc các file trong thư mục và đẩy vào mảng
$files = scandir($rootFolder . $folder);

$result = [];
foreach ($files as $file) {
    if (!in_array($file, ['.', '..'])) {
        $absPath = $rootFolder . $folder . $file;
        $isDir = is_dir($absPath);
        array_push($result, [
            'name' => $file,
            'isDir' => $isDir,
            'size' => $isDir ? null : filesize($absPath), // bytes
            'url' => '/data/' . $folder . $file
        ]);
    }
}

// Trả về cho client
header('Content-type: application/json');
echo json_encode($result);
