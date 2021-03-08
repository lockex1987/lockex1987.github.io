<?php

// Index management operations
require 'bootstrap.php';


/**
 * Tạo index.
 */
function createIndex()
{
    $client = connectToElasticsearch();
    $params = [
        'index' => 'post',
        'body' => [
            'mappings' => [
                'properties' => [
                    'date' => [
                        'type' => 'date',
                        'format' => 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis'
                    ],
                    'modifiedTime' => [
                        'type' => 'double'
                    ],
                    'category' => [
                        'type' => 'keyword'
                    ]
                ]
            ]
        ]
    ];
    $resp = $client->indices()->create($params);
    echo 'Create' . PHP_EOL;
    var_dump($resp);
}


/**
 * Xóa toàn bộ index.
 */
function deleteIndex()
{
    try {
        $client = connectToElasticsearch();
        $params = [
            'index' => 'post'
        ];
        $resp = $client->indices()->delete($params);
        echo 'Delete' . PHP_EOL;
        var_dump($resp);
    } catch (Exception $ex) {
        // var_dump($ex);
        echo $ex->getMessage() . PHP_EOL;
    }
}


function countData()
{
    $client = connectToElasticsearch();
    $params = [
        'index' => 'post'
    ];
    $resp = $client->count($params);
    // console.log(body);
    echo 'Count' . PHP_EOL;
    // var_dump($resp);
    echo $resp['count'] . PHP_EOL;
}


function getAllDataToCheck()
{
    $client = connectToElasticsearch();
    $params = [
        'index' => 'post',
        'body' => [
            'from' => 0,
            'size' => 1000,
            'query' => [
                'match_all' => new stdClass()
            ]
        ],
        // Không hiển thị source, kết quả ngắn gọn
        '_source' => false
    ];
    $resp = $client->search($params);
    // console.log(body);
    var_dump($resp['hits']['total']);
    var_dump($resp['hits']['hits']);
}


// createIndex();
// deleteIndex();
countData();
// getAllDataToCheck();
