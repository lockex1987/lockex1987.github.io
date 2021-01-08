<?php

// Lấy các tham số tìm kiếm
$page = $_GET['page'];
$pageSize = $_GET['pageSize'];
$orderBy = $_GET['orderBy'];
$orderType = $_GET['orderType'];
$search = $_GET['search'];

// Đọc dữ liệu từ file dùng chung mock_data.js
function getDataFromFile()
{
    $inputFilePath = 'js/mock_data.js';
    $content = file_get_contents($inputFilePath);
    $content = str_replace('export default ', '', $content);
    $content = str_replace(';', '', $content);
    // Xâu JSON hợp lệ yêu cầu phải dấu "
    $content = str_replace('country:', '"country":', $content);
    $content = str_replace('population:', '"population":', $content);
    $content = str_replace('fake_date:', '"fake_date":', $content);
    $content = str_replace('\'', '"', $content);
    // echo $content;
    $data = json_decode($content);
    // echo $data;
    return $data;
}

function filterData($data, $search)
{
    // Tìm kiếm
    if (empty($search)) {
        $filteredData = $data;
        // echo $data;
    } else {
        // echo '2';
        $search = mb_strtolower($search, 'UTF-8');

        $filteredData = array_filter($data, function ($e) use ($search) {
            if (strpos(mb_strtolower($e->country, 'UTF-8'), $search) !== false) {
                return true;
            }
            return false;
        });
    }

    // echo $filteredData;
    return $filteredData;
}

function sortFilteredData($filteredData, $orderBy, $orderType)
{
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
    return $filteredData;
}

$data = getDataFromFile();
$filteredData = filterData($data, $search);
$filteredData = sortFilteredData($filteredData, $orderBy, $orderType);

// Trả về cho client
header('Content-type: application/json');

echo json_encode([
    'total_x' => count($filteredData),
    'data_x' => array_slice($filteredData, $pageSize * ($page - 1), $pageSize)
]);
