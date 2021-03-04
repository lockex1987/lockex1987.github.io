<?php

include_once 'bootstrap.php';

// Lấy tham số JSON từ request
$params = getJsonParams();
$content = $params->content;
$filePath = $rootFolder . $params->filePath;

$result = file_put_contents($filePath, $content);
$code = $result ? 0 : 1;

// Trả về cho client
responseJson([
    'code' => $code
]);
