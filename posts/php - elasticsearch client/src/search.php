<?php

require 'bootstrap.php';


/**
 * Tìm kiếm.
 * @param string $queryText Xâu tìm kiếm
 * @param int $from Chỉ số bản ghi bắt đầu
 * @param int $size Số bản ghi
 */
function runSearch(string $queryText, int $from, int $size): array
{
    $client = connectToElasticsearch();

    try {
        if (!$queryText) {
            $params = [
                'index' => 'post',
                'body' => [
                    'from' => $from,
                    'size' => $size,
                    'query' => [
                        'match_all' => new stdClass()
                    ],
                    // Sắp xếp bài viết theo ngày xuất bản, đường dẫn
                    'sort' => [
                        [
                            // Sắp xếp theo ngày xuất bản giảm dần
                            'date' => 'desc'
                        ],
                        [
                            // ID bản ghi chính là path
                            // Không sắp xếp được theo path vì path có kiểu dữ liệu là string, không được tối ưu cho sắp xếp
                            '_id' => [
                                'order' => 'asc'
                            ]
                        ]
                        /*,
                        // Sắp xếp theo theo người dùng tăng dần
                        'user',
                        [
                            // Sắp xếp theo tuổi tăng dần
                            'age' => 'asc'
                        ],
                        // Sắp xếp theo score tìm kiếm
                        '_score'
                        */
                    ]
                ]
            ];

            $results = $client->search($params);
            
            $total = $results['hits']['total']['value'];
            $hits = array_map(function ($e) {
                $src = $e['_source'];
                return [
                    'category' => $src['category'],
                    'date' => $src['date'],
                    // 'id' => $e['_id],
                    'path' => $src['path'],
                    'title' => $src['title'],
                    'description' => $src['description']
                ];
            }, $results['hits']['hits']);

            // $client->close();

            return [
                'total' => $total,
                'hits' => $hits
            ];
        } else {
            $params = [
                'index' => 'post',
                // 'type' => 'constituencies',
                // 'fields' => ['action', 'signature_count'],
                'body' => [
                    'from' => $from,
                    'size' => $size,
                    // _source: ['title', 'summary', 'publish_date']
                    'query' => [
                        // match: { ConstituencyName: 'Ipswich' }
                        // wildcard: { 'constituencyname': '???wich' }
                        // regexp: { 'constituencyname': '.+wich' }
                        // match: { content: queryText }
                        'multi_match' => [
                            'query' => $queryText,
                            'fields' => ['title^3', 'path^3', 'description^2', 'content'],
                            // fields: ['title', 'path', 'description', 'content'],
                            // Search cả từ, các từ phải đứng cạnh nhau
                            'type' => 'phrase'
                        ]
                    ],
                    'highlight' => [
                        // pre_tags: ['<em>'],
                        // post_tags: ['</em>'],
                        'fields' => [
                            'title' => new stdClass(),
                            'path' => new stdClass(),
                            'description' => new stdClass(),
                            'content' => new stdClass()
                        ]
                    ]
                ]
            ];

            $results = $client->search($params);

            $total = $results['hits']['total']['value'];
            $hits = array_map(function ($e) {
                $src = $e['_source'];
                $hi = $e['highlight'];
                return [
                    'category' => $src['category'],
                    'date' => $src['date'],
                    'path' => $hi['path'][0] ?? $src['path'],
                    'title' => $hi['title'][0] ?? $src['title'],
                    'description' => $hi['description'][0] ?? $src['description'],
                    'content' => !empty($hi['content']) ? $hi['content'][0] : null
                ];
            }, $results['hits']['hits']);

            return [
                'total' => $total,
                'hits' => $hits
            ];
        }
    } catch (Exception $ex) {
        // echo $ex->errorMessage();
        echo 'Message: ' .$ex->getMessage();
        // console.log(ex);
        // console.log(ex.meta.body.error);

        return [
            'total' => 0,
            'hits' => []
        ];
    }
}


// http://localhost:3001/search?queryText=&from=0&size=10
function handleRequest()
{
    // Enable CORS
    /*
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    */
    
    $queryText = $_GET['queryText'];
    $from = intval($_GET['from']);
    $size = intval($_GET['size']);
    $result = runSearch($queryText, $from, $size);
    responseJson($result);
}


function test()
{
    $queryText = '';
    $from = 0;
    $size = 20;
    $result = runSearch($queryText, $from, $size);
    var_dump($result);
}


handleRequest();
// test();
