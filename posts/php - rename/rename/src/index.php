<?php

require_once 'polyfill.php';
require_once 'CommonUtils.php';
require_once 'Rename.php';
require_once 'SevenZipWrapper.php';

if (count($argv) < 3) {
    echo 'Bạn phải nhập ít nhất 2 tham số' . PHP_EOL;
} else {
    $command = $argv[1];
    // Chú ý $rootFolder không có ký tự / cuối cùng
    $rootFolder = rtrim($argv[2], '/');
    $a = CommonUtils::listFilesInDirectory($rootFolder);
    $rename = new Rename($rootFolder);

    if ($command == 'lc') {
        $rename->lowerCase($a);
    } elseif ($command == 'pr') {
        $rename->prefix($a, $argv[3]);
    } elseif ($command == 'pt') {
        $rename->postfix($a, $argv[3]);
    } elseif ($command == 'lt') {
        $rename->leftTrim($a, intval($argv[3]));
    } elseif ($command == 'rt') {
        $rename->rightTrim($a, intval($argv[3]));
    } elseif ($command == 'fl') {
        $rename->fixLength($a, intval($argv[3]));
    } elseif ($command == 'sf') {
        $rename->sortFile($a, count($argv) > 3 ? $argv[3] : '');
    } elseif ($command == 'z') {
        $rename->compress($a);
    } elseif ($command == 'mc') {
        $rename->mangaChapter($a);
    } elseif ($command == 'et') {
        $rename->changeExtension($a, '.' . strtolower($argv[3]), '.' . strtolower($argv[4]));
    } elseif ($command == 'rc') {
        $rename->removeCharacter($a, count($argv) > 3 ? $argv[3] : '');
    } elseif ($command == 'csc') {
        $rename->checkSpecialCharacters($rootFolder);
    } elseif ($command == 'x') {
        $rename->extractFiles($a);
    } else {
        echo 'Invalid command' . PHP_EOL;
    }
}
