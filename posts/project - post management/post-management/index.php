<?php

/**
 * Chương trình này dùng để liệt kê danh sách các bài viết.
 * Các post thì liệt kê thêm ngày xuất bản.
 * Thống kê mỗi chuyên mục có bao nhiêu bài viết.
 */
include 'IndexFile.php';


/**
 * Lấy ra danh sách bài viết.
 *
 * @param string $rootFolder Đường dẫn đến thư mục to
 * @param string $adjustPath Đường dẫn điều chỉnh
 * @param array $oldList Danh sách cũ
 * @return array Danh sách bài viết
 */
function getPostList(string $rootFolder, string $adjustPath, array $oldList): array
{
    // Duyệt các thư mục con bên trong thư mục to "posts"
    $folderList = array_diff(scandir($rootFolder), ['.', '..']);
    sort($folderList);
    $postList = [];
    foreach ($folderList as $path) {
        // Lấy ra thể loại của bài viết (phần đầu tiên trước dấu trừ ngăn cách)
        $a = explode(' - ', $path);
        $category = $a[0];

        // Lấy ra tiêu đề, mô tả (tag description), thời gian xuất bản (tag date) của bài viết
        $indexFilePath = $rootFolder . '/' . $path . '/index.html';

        // Lấy thông tin thời gian chỉnh sửa file
        if (!file_exists($indexFilePath)) {
            $modifiedTime = 0;
        } else {
            $modifiedTime = filemtime($indexFilePath); // ?? filectime($indexFilePath);
        }

        $oldObj = null;
        foreach ($oldList as $e) {
            if ($e->path == $path) {
                $oldObj = $e;
                break;
            }
        }

        if (
            $oldObj &&
            $oldObj->modifiedTime &&
            $oldObj->modifiedTime === $modifiedTime
        ) {
            // Nếu file không thay đổi gì
            $postList[] = $oldObj;
        } else {
            echo 'Cập nhật bài viết ' . $path . PHP_EOL;

            $obj = new IndexFile($indexFilePath, $adjustPath);
            $obj->process();
            $title = $obj->title;
            $description = $obj->description;
            $date = $obj->date;
            $content = $obj->content;

            // Thêm vào danh sách
            $postObject = new stdClass();
            $postObject->category = $category;
            $postObject->title = $title;
            $postObject->description = $description;
            $postObject->date = $date;
            $postObject->modifiedTime = $modifiedTime;
            $postObject->path = $path;

            $postList[] = $postObject;

            // Thêm vào Elasticsearch
            // $postObject->content = $content;
            insertPostIntoElasticsearch($postObject);
        }
    }

    return $postList;
}


/**
 * Thêm dữ liệu vào Elasticsearch.
 * @param object $postObject Dữ liệu
 */
function insertPostIntoElasticsearch(object $postObject): void
{
    /*
    const response = await fetch('http://localhost/posts/php - elasticsearch client/src/insert-post.php', {
        method: 'POST',
        body: JSON.stringify(postObject),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    // console.log(data);
    */
}


/**
 * Tính toán số bài viết của từng thể loại.
 *
 * @param array $postList Danh sách bài viết
 * @return $array Mảng liên kết thể loại với số bài viết của thể loại đó
 */
function calculateCategoryCountMap(array $postList): array
{
    $categoryCountMap = [];
    foreach ($postList as $post) {
        $category = $post->category;
        if (isset($categoryCountMap[$category])) {
            $categoryCountMap[$category] = $categoryCountMap[$category] + 1;
        } else {
            $categoryCountMap[$category] = 1;
        }
    }
    return $categoryCountMap;
}


/**
 * Lấy ra nội dung để ghi ra file (danh sách bài viết).
 *
 * @param array $postList Danh sách bài viết
 * @return string Nội dung đẻ ghi ra file
 */
function getPostListJson(array $postList): string
{
    $temp = array_map(function ($post) {
        // Thêm JSON_UNESCAPED_UNICODE để hiển thị Unicode
        return json_encode($post, JSON_UNESCAPED_UNICODE);
    }, $postList);
    return "[\n" . implode(",\n", $temp) . "\n]\n";
}


/**
 * Lấy ra nội dung để ghi ra file (số lượng bài viết từng thể loại).
 *
 * @param array $categoryCountMap Map thể loại và bài viết
 * @return string Nội dung JSON để ghi ra file
 */
function getCategoryCountMapJson(array $categoryCountMap): string
{
    // Sắp xếp theo giá trị giảm dần
    arsort($categoryCountMap);
    $temp = [];
    foreach ($categoryCountMap as $key => $value) {
        $temp[] = '    { "name": "' . $key . '", "y": ' . $value . ' }';
    }
    return "[\n" . implode(",\n", $temp) . "\n]\n";
}


/**
 * Ghi ra file dữ liệu.
 * @param string $filePath Đường dẫn đến file đầu ra
 * @param string $content Nội dung file
 */
function writeDataFile(string $filePath, string $content): void
{
    file_put_contents($filePath, $content);
}


/**
 * Hàm xử lý chính.
 * @param adjustPath Đường dẫn đến thư mục gốc
 */
function main(string $adjustPath): void
{
    $startTime = microtime(true);

    // Dữ liệu cũ
    $listFilePath = $adjustPath . 'data/post-list.json';
    $fileContent = file_get_contents($listFilePath);
    $oldList = json_decode($fileContent);
    // var_dump($oldList);

    // Quét lại các bài viết
    $postList = getPostList($adjustPath . 'posts', $adjustPath, $oldList);


    // Thống kê theo chuyên mục
    $categoryMap = calculateCategoryCountMap($postList);


    // Ghi ra file
    writeDataFile($listFilePath, getPostListJson($postList));
    $categoryFilePath = $adjustPath . 'posts/project - post management/data/category-data.json';
    writeDataFile($categoryFilePath, getCategoryCountMapJson($categoryMap));

    $endTime = microtime(true);
    echo 'Finish after ' . (($endTime - $startTime) / 1000) . 's' . PHP_EOL;
}


// Nếu ở thư mục trong, thực hiện lệnh php index.php "../../../"
// Nếu ở thư mục gốc, thực hiện lệnh php index.php
main((count($argv) > 1) ? $argv[1] : '');
