<?php

// Đọc dữ liệu từ file dùng chung mock_data.js
$inputFilePath = 'js/mock_data.js';
$fileObj = fopen($inputFilePath, 'r');
$content = fread($fileObj, filesize($inputFilePath));
$content = str_replace('var serverData = ', '', $content);
$content = str_replace(';', '', $content);
$json = $content;
$data = json_decode($json);

// Lấy các tham số tìm kiếm
$page = $_GET['page'];
$pageSize = $_GET['pageSize'];
$orderBy = $_GET['orderBy'];
$orderType = $_GET['orderType'];
$search = $_GET['search'];

// Tìm kiếm
if (empty($search)) {
    $filteredData = $data;
} else {
    $search = mb_strtolower($search, 'UTF-8');

    $filteredData = array_filter($data, function ($e) use ($search) {
        if (strpos(mb_strtolower($e->country, 'UTF-8'), $search) !== false) {
            return true;
        }
        return false;
    });
}

// Sắp xếp
if (count($filteredData) > 0 && !empty($orderBy)) {
    // Sắp xếp domain tăng dần,
    // các bài tin trong cùng domain thì sắp xếp giảm dần theo thời gian
    usort($filteredData, function ($a, $b) use ($orderBy, $orderType) {
        $compareValue = $a->{$orderBy} <=> $b->{$orderBy};
        if ($compareValue != 0) {
            if ($orderType == 'asc') {
                return $compareValue;
            }

            // desc
            return - $compareValue;
        }
        return 0;
    });
}


// Trả về cho client
header('Content-type: application/json');
echo json_encode([
    'total_x' => count($data),
    'data_x' => array_slice($filteredData, $pageSize * ($page - 1), $pageSize)
]);
