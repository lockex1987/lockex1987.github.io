<?php

function buildGetRequestBody(string $host, string $path, array $headers): string
{
    $body = "GET $path HTTP/1.1\r\n";
    $body .= "Host: $host\r\n";
    $body .= "Connection: Close\r\n";
    foreach ($headers as $key => $value) {
        $body .= "$key: $value\r\n";
    }
    $body .= "\r\n";
    return $body;
}

function buildPostData(string $boundary, array $params, array $uploadFiles): string
{
    $postData = "--$boundary";

    foreach ($params as $key => $value) {
        $postData .= "\r\nContent-Disposition: form-data; name=\"" . $key ."\"\r\n";
        $postData .= "\r\n";
        $postData .= "$value\r\n";
        $postData .= "--$boundary";
    }

    foreach ($uploadFiles as $e) {
        $filePath = $e['path'];
        $paramName = $e['name'];
                
        if (file_exists($filePath)) {
            $fileName = basename($filePath);
            $fileContent = file_get_contents($filePath);
            $mimeType = mime_content_type($filePath);
 
            $postData .= "\r\nContent-Disposition: form-data; name=\"" . $paramName . "\"; filename=\"" . $fileName . "\"\r\n";
            $postData .= "Content-Type: " . $mimeType . "\r\n";
            $postData .= "\r\n";
            $postData .= $fileContent . "\r\n";
            $postData .= "--" . $boundary;
        }
    }

    $postData .= "--\r\n";
    $postData .= "\r\n";
    return $postData;
}

function buildPostRequestBody(string $host, string $path, array $headers, array $params, array $uploadFiles): string
{
    $boundary = "----" . substr(md5(rand(0, 32000)), 0, 10);
    $postData = buildPostData($boundary, $params, $uploadFiles);

    $body = "POST $path HTTP/1.1\r\n";
    $body .= "Host: " . $host . "\r\n";
    $body .= "Connection: Close\r\n";
    foreach ($headers as $key => $value) {
        $body .= "$key: $value\r\n";
    }
    $body .= "Content-Type: multipart/form-data; boundary=$boundary\r\n";
    $body .= "Content-Length: " . strlen($postData) . "\r\n";
    $body .= "\r\n";
    $body .= $postData;
    return $body;
}

function makeRequest(string $url, string $method, array $headers = [], array $params = [], array $uploadFiles = []): void
{
    $arr = parse_url($url);
    // var_dump($arr);
    $host = $arr['host'];
    $scheme = $arr['scheme'];
    $port = $arr['port'] ?? ($scheme == 'https' ? 443 : 80);
    $path = $arr['path'];
    $hostPrefix = $scheme == 'https' ? 'ssl://' : ''; // nếu dùng stream_socket_client, không dùng fsockopen thì phải có tcp:// trong trường hợp HTTP?
    // echo "$host $port $path\n";

    $context = stream_context_create([
        'ssl' => [
           'verify_peer' => false,
           'verify_peer_name' => false
        ]
    ]);

    // $fp = fsockopen($hostPrefix . $host, $port, $errno, $errstr);
    $fp = stream_socket_client(
        $hostPrefix . $host . ':' . $port,
        $errno,
        $errstr,
        30,
        STREAM_CLIENT_CONNECT,
        $context
    );
    
    if (!$fp) {
        echo "$errno: $errstr\n";
    } else {
        if ($method == 'GET') {
            $body = buildGetRequestBody($host, $path, $headers);
        } elseif ($method == 'POST') {
            $body = buildPostRequestBody($host, $path, $headers, $params, $uploadFiles);
        }
        // echo $body . PHP_EOL;

        // Gửi request
        fwrite($fp, $body);

        // Đọc response
        while (!feof($fp)) {
            echo fgets($fp, 1024);
        }
        fclose($fp);
    }
}


/*
makeRequest(
    url: 'https://sso-passport.cttd.tk/api/apps',
    method: 'GET',
    headers: [
        'Authorization' => 'Bearer a4a139e8-6425-43fa-9a08-1b723c5c3aafY8ey7fESGVkDugpBGxGllMYdY4KSiSRlnIlg0t0MArRusbv5ZBAfBZyOdwpsGnsqMwoj8svQDaMdPZugXCC2YaUcRFGBnF4kyE9z'
    ]
);
*/


makeRequest(
    url: 'https://sso-passport.cttd.tk/api/user',
    method: 'POST',
    headers: [
        'Authorization' => 'Bearer a4a139e8-6425-43fa-9a08-1b723c5c3aafY8ey7fESGVkDugpBGxGllMYdY4KSiSRlnIlg0t0MArRusbv5ZBAfBZyOdwpsGnsqMwoj8svQDaMdPZugXCC2YaUcRFGBnF4kyE9z'
    ],
    params: [
        'fullName' => 'Nguyễn Văn Huyên',
        'email' => 'lockex1987@gmail.com',
        'phone' => '0386519125'
    ],
    uploadFiles: [
        [
            'path' => 'D:/htdocs/lockex1987.github.io/images/nvh/huyennv9b.jpg',
            'name' => 'avatar'
        ]
    ]
);
