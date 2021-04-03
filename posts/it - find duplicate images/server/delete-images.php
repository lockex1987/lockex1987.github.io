<?php

$params = json_decode(file_get_contents('php://input'));
$files = $params->files;
foreach ($files as $f) {
    unlink($f);
}

header('Content-type: application/json');
echo json_encode([
    'code' => 0
]);
