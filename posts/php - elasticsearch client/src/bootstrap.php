<?php

require 'vendor/autoload.php';

use Elasticsearch\Client as ElasticsearchClient;


/**
 * Kết nối đến Elasticsearch.
 */
function connectToElasticsearch(): ElasticsearchClient
{
    $hosts = [
        'http://localhost:9200'
    ];
    $client = Elasticsearch\ClientBuilder::create()
        ->setHosts($hosts)
        ->build();
    return $client;
}


/**
 * Trả về các tham số từ trong request mà được truyền dưới dạng JSON.
 * @return object Đối tượng
 */
function getJsonParams(): object
{
    return json_decode(file_get_contents('php://input'));
}


/**
 * Trả về JSON cho người dùng.
 * @param $data Nội dung trả về (thường là mảng liên kết)
 * @return void
 */
function responseJson($data): void
{
    header('Content-type: application/json');
    echo json_encode($data);
}
