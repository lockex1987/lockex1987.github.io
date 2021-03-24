<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;


/**
 * Các API để crawl dữ liệu của liên hoàn họa.
 */
class ApiClient
{
    private const USER = 'ESvpb+e9Lsg=';
    private const PASS = 'AmWFg9vXrw4=';
    private const TOKEN = '68ea946f-29a8-4d4f-8c93-c5ca28e71b10';
    private const API_URL = 'http://ebook.lienhoanhoa.net/api/search';

    private const GET_ALL_TRUYEN = 4;
    private const GET_BO_TRUYEN = 1;
    private const GET_TAP_TRUYEN = 2;

    public function getAllTruyen(): array
    {
        return $this->callApi(self::GET_ALL_TRUYEN, null);
    }

    public function getAllBoOfTruyen($truyenId): array
    {
        return $this->callApi(self::GET_BO_TRUYEN, $truyenId);
    }

    public function getAllTapCuaBo($boId): array
    {
        return $this->callApi(self::GET_TAP_TRUYEN, $boId);
    }

    private function callApi(int $feature, ?int $id): array
    {
        $client = new Client();
        $headers = [
            'Postman-Token' => self::TOKEN
        ];
        $params = [
            'User' => self::USER,
            'Pass' => self::PASS,
            'chuc_nang' => $feature,
            'cs_dau' => 0,
            'cs_cuoi' => 100
        ];
        if (!is_null($id)) {
            $params['Id'] = $id;
        }
        $options = [
            'headers' => $headers,
            'json' => $params
        ];
        $response = $client->post(self::API_URL, $options);
        $body = $response->getBody();
        // echo $body;
        $arr = json_decode($body)->Search;
        return $arr;
    }
}


function crawl(): void
{
    $apiClient = new ApiClient();

    // Cấu trúc: Truyện -> Bộ -> Tập
    $allTruyen = $apiClient->getAllTruyen();
    $data = [];
    // print_r($allTruyen);
    foreach ($allTruyen as $truyen) {
        // echo $truyen->Id_truyen . ': ' . $truyen->Ten_truyen . PHP_EOL;
        $allBo = $apiClient->getAllBoOfTruyen($truyen->Id_truyen);
        $versions = [];
        // print_r($allBo);
        foreach ($allBo as $bo) {
            // echo $bo->Id_bo_truyen . ': ' . $bo->Ten_bo_truyen. PHP_EOL;
            $allTap = $apiClient->getAllTapCuaBo($bo->Id_bo_truyen);
            // print_r($allTap);
            $chapters = array_map(function ($tap) {
                return [
                    'id' => $tap->Id_tap_truyen,
                    'name' => $tap->Ten_tap_truyen,
                    'folder' => $tap->Folder,
                    'pages' => $tap->So_tranh
                ];
            }, $allTap);

            $versions[] = [
                'id' => $bo->Id_bo_truyen,
                'name' => $bo->Ten_bo_truyen,
                'folder' => $bo->Folder,
                'chapters' => $chapters
            ];
        }

        $data[] = [
            'id' => $truyen->Id_truyen,
            'name' => $truyen->Ten_truyen,
            'folder' => $truyen->Folder,
            'versions' => $versions
        ];
    }

    $jsonData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents('data_php_new.json', $jsonData);
}


crawl();
