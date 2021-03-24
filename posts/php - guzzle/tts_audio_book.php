<?php

require 'vendor/autoload.php';

// Truyện "Phi hồ ngoại truyện".


/**
 * Gọi API.
 */
function callTtsApi($text)
{
    $token = 'c4Mi6k-sYPTmnZcxZAaRUtmf0kWgRrRnLMnZUMqRLixpBilMCQJV27hxxS6ikn-5';
    $voice = 'doanngocle';
    $speed = 1;
    $url = 'https://viettelgroup.ai//voice/api/tts/v1/rest/syn';

    // Không xác thực SSL
    // http://docs.guzzlephp.org/en/stable/request-options.html#verify-option
    $client = new \GuzzleHttp\Client([
        'verify' => false
    ]);
    $options = [
        'headers' => [
            'token' => $token
        ],
        'json' => [
            'text' => $text,
            'voice' => $voice,
            'speed' => $speed,
            'id' => '3',
            'without_filter' => false,
            'tts_return_option' => 2,
            'timeout' => 60000 * 60
        ]
    ];
    $response = $client->request('POST', $url, $options);

    echo $response->getStatusCode() . "\n";
    $content = $response->getBody();
    return $content;
}


/**
 * Đọc nội dung file text.
 * Nên tách thành nhiều file nhỏ, mỗi file tầm 1000 từ, 5000 ký tự, 50 dòng.
 */
function readTextFile($fileName)
{
    $fileObj = fopen($fileName, 'r');
    $text = fread($fileObj, filesize($fileName));
    // echo $text . "\n";
    fclose($fileObj);
    return $text;
}


/**
 * Ghi file âm thanh.
 */
function writeAudioFile($fileName, $content)
{
    $fileObj = fopen($fileName, 'w');
    fwrite($fileObj, $content);
    fclose($fileObj);
}


/**
 * Hàm thực thi.
 */
function main()
{
    $folder = 'data-files/';
    for ($no = 12; $no <= 13; $no++) {
        $text = readTextFile($folder . $no . '.txt');
        $content = callTtsApi($text);
        writeAudioFile($folder . $no . '.wav', $content);
    }
}

main();
