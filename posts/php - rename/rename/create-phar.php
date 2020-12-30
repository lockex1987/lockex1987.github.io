<?php

$pharFile = 'dist/app.phar';

// Xóa các file cũ
if (file_exists($pharFile)) {
    unlink($pharFile);
}

if (file_exists($pharFile . '.gz')) {
    unlink($pharFile . '.gz');
}

// Tạo mới đối tượng Phar
$p = new Phar($pharFile);

// Bao gồm toàn bộ thư mục src
$p->buildFromDirectory('src/');

// File thực thi là index.php
$p->setDefaultStub('index.php', '/index.php');

// Bạn có thể nén GZ (tạo file app.phar.gz)
// $p->compress(Phar::GZ);
   
echo $pharFile . ' successfully created' . PHP_EOL;
