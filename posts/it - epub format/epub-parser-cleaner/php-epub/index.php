<?php

require 'vendor/autoload.php';

use lywzx\epub\EpubParser;

$filePath = 'D:/new/tu binh phong - robert van gulik/tu binh phong - robert van gulik.epub';
$epubParser = new EpubParser($filePath);
// var_dump($epubParser->getTOC());
// var_dump($epubParser->getDcItem());
var_dump($epubParser->getDcItem('title'));
