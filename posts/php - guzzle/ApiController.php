<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;

class ApiController extends Controller
{
    /**
     * Gọi tiếp sang API của đội backend.
     */
    public function callApi(Request $request, string $url)
    {
        $ROOT_API = config('services.api.root');
        // $url = $request->apiUrl;
        $method = $request->apiMethod;
        $params = $request->apiParams;
        $authorizationHeader = $request->header('Authorization');

        $client = new Client([
            'base_uri' => $ROOT_API,
            'headers' => [
                'Authorization' => $authorizationHeader
            ]
        ]);

        try {
            // Log::info($method . ': ' . $url);
            if ($method == 'GET') {
                $response = $client->get($url, [
                    'query' => $params
                ]);
            } elseif ($method == 'POST') {
                $response = $client->post($url, [
                    'json' => $params
                ]);
            } elseif ($method == 'PUT') {
                $response = $client->put($url, [
                    'json' => $params
                ]);
            } elseif ($method == 'DELETE') {
                $response = $client->delete($url, [
                    'body' => json_encode($params),
                    'headers' => [
                        'Content-Type' => 'application/json;charset=UTF-8'
                    ]
                ]);
            } else {
                dd('Invalid method');
            }

            return response($response->getBody())
                ->header('Content-Type', 'application/json');
        } catch (RequestException $ex) {
            // echo Psr7\Message::toString($ex->getRequest());

            if ($ex->hasResponse()) {
                // echo Psr7\Message::toString($ex->getResponse());
                $response = $ex->getResponse();
                return response($response->getBody(), $response->getStatusCode())
                    ->header('Content-Type', 'application/json');
            } else {
                return 'Lỗi không xác định';
            }
        }
    }
}
