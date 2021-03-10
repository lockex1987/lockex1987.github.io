<?php

include_once 'vendor/autoload.php';


function handleRequest(): void
{
    // Đường dẫn file đầu vào
    $filePath = $_GET['filePath'];

    // Lấy nội dung file
    $content = file_get_contents(ROOT_FOLDER . $filePath);

    // Trả về cho client
    echo $content;
}

handleRequest();
