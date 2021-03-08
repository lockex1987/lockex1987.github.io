<?php

require 'bootstrap.php';


$client = connectToElasticsearch();

function insertBulkData()
{
    global $client;

    $params = [];

    for ($i = 0; $i < 1234; $i++) {
        // Các cặp trong mảng
        // Phần tử thứ nhất chỉ định index, id
        $params[] = [
            'index' => [
                '_index' => 'my_index',
                '_id'    => $i
            ]
        ];

        // Phần tử thứ hai chỉ định dữ liệu
        $params[] = [
            'my_field' => 'my_value',
            'second_field' => 'some more values'
        ];

        // Every 1000 documents stop and send the bulk request
        if ($i % 1000 == 0) {
            $responses = $client->bulk(['body' => $params]);

            // erase the old bulk request
            $params = [];

            // unset the bulk response when you are done to save memory
            unset($responses);
        }
    }

    // Send the last batch if it exists
    if (!empty($params['body'])) {
        $responses = $client->bulk(['body' => $params]);
    }
}


$post = getJsonParams();

$params = [
    'index' => 'post',
    'id' => $post->path,
    'body' => $post
];
$resp = $client->index($params);
responseJson($resp);
