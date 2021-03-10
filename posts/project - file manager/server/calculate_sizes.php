<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\TraverseFileNode;


function scanFolderAndInsertIntoRedis(): void
{
    $fileNode = new TraverseFileNode();
    // $rootFolder = $argv[1];
    $rootFolder = ROOT_FOLDER;
    $fileNode->scanFolder($rootFolder);
}

scanFolderAndInsertIntoRedis();
