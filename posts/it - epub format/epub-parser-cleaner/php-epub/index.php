<?php

require 'vendor/autoload.php';

// Lấy thông tin meta (cập nhật?)
// Tạo một file danh sách ảnh riêng (gallery.xhtml).
use lywzx\epub\EpubParser;

$filePath = 'D:/new/tu binh phong - robert van gulik/tu binh phong - robert van gulik.epub';
$epubParser = new EpubParser($filePath);
// var_dump($epubParser->getTOC());
// var_dump($epubParser->getDcItem());
var_dump($epubParser->getDcItem('title'));
