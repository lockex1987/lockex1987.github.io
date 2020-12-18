<?php

$targetDir = 'uploads/';
$uploadImage = $_FILES['uploadImage'];
$targetName = basename($uploadImage['name']);

header('Content-Type: application/json');

if (move_uploaded_file($uploadImage['tmp_name'], $targetDir . $targetName)) {
    echo '{ "code": 0, "fileName": "' . $targetName . '"}';
} else {
    echo '{ "code": 1 }';
}
