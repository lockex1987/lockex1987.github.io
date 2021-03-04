<?php

include_once 'bootstrap.php';


$fileNode = new TraverseFileNode();
// $rootFolder = $argv[1];
$fileNode->scanFolder($rootFolder);
