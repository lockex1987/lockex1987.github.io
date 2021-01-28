<?php

// Đọc cấu hình từ file .env
$config = parse_ini_file('./.env', false, INI_SCANNER_RAW);

// Đường dẫn thư mục chứa file
// Có thể là thư mục bất kỳ trên máy, nằm ngoài thư mục gốc của web server
$rootFolder = $config['ROOT_FOLDER'];
