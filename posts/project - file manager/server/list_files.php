<?php

include 'config.php';

$folder = $_GET['folder'];

// Đọc các file trong thư mục và đẩy vào mảng
$files = scandir($rootFolder . $folder);

// Các thư mục hệ thống, không hiển thị cho người dùng
$HIDDEN_FOLDERS = [
    '.',
    '..',
    'lost+found',
    '.Trash-1000',
    'System Volume Information',
    '$RECYCLE.BIN'
];

$result = [];
foreach ($files as $file) {
    if (!in_array($file, $HIDDEN_FOLDERS)) {
        $absPath = $rootFolder . $folder . $file;
        $isDir = is_dir($absPath);
        array_push($result, [
            'name' => $file,
            'isDir' => $isDir,
            'size' => $isDir ? null : filesize($absPath), // bytes
            'url' => '/data-drive/' . $folder . $file
        ]);
    }
}

// Trả về cho client
header('Content-type: application/json');
echo json_encode($result);
