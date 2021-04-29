<?php

require 'vendor/autoload.php';

use React\EventLoop\Factory;
use React\Http\Server as HttpServer;
use React\Socket\Server as SocketServer;
use React\Http\Message\Response;
use Psr\Http\Message\ServerRequestInterface;
use Cttd\FileManager\FolderMap;


$folderMap = new FolderMap();

function responseJson($data): Response
{
    return new Response(
        200,
        ['Content-Type' => 'application/json;charset=UTF-8'],
        json_encode($data)
    );
}

function getParam(ServerRequestInterface $request, string $param): string
{
    $queryParams = $request->getQueryParams();
    if (isset($queryParams[$param])) {
        return $queryParams[$param];
    }
    return '';
}

/**
 * API liệt kê thư mục.
 * Sử dụng PHPReact, lưu map danh sách file trong bộ nhớ cho nhanh.
 * Endpoint:
 *     http://localhost:8080/list_folder?path=%2F
 *     http://localhost:8080/list_folder?path=%2Fcomposer%2F
 */
function initServer(): void
{
    global $folderMap;

    $loop = Factory::create();
    $socket = new SocketServer(8080, $loop);

    /*
    $socket = new SocketServer('tls://0.0.0.0:8080', $loop, [
        'local_cert' => 'D:/program/nginx/conf/cert/test-ssl.local.crt'
    ]);
    */

    /*
    Cấu hình nginx
    location /list_folder {
        proxy_pass http://127.0.0.1:8080;
    }
    */

    $listFolder = function (ServerRequestInterface $request) use ($folderMap): ?Response {
        $uriPath = $request->getUri()->getPath();
        if ($uriPath == '/list_folder') {
            $path = getParam($request, 'path');
            $list = $folderMap->listFolder($path);
            return responseJson($list); // ['path' => $path]
        }
    };
    $server = new HttpServer($loop, $listFolder);
    $server->listen($socket);
    echo 'Listening on ' . str_replace('tcp:', 'http:', $socket->getAddress()) . PHP_EOL;
    $loop->run();
}


initServer();

