<?php

require 'vendor/autoload.php';

// Lấy thông tin meta
// Tạo một file danh sách ảnh riêng (gallery.xhtml).
use Cttd\Epub\EpubParser;
use Cttd\Epub\EpubCleaner;

function demoParser(): void
{
    $filePath = 'D:/new/tu binh phong - robert van gulik/tu binh phong - robert van gulik.epub';
    $epubParser = new EpubParser($filePath);
    // var_dump($epubParser->getTOC());
    var_dump($epubParser->getTitle());
}

function demoCleaner(): void
{
    $filePath = 'D:/new/tu binh phong - robert van gulik/tu binh phong - robert van gulik.epub';
    new EpubCleaner($filePath);
}

// demoParser();
demoCleaner();
