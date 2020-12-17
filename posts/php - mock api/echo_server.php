<?php

// Lắng nghe ở cổng nào đó
$binding = 'tcp://0.0.0.0:1234';
$server = stream_socket_server($binding);

if ($server === false) {
    throw new Exception('Could not listen');
}

while (true) {
    // Nhận kết nối đến
    $client = stream_socket_accept($server);

    if ($client !== false) {
        // stream_copy_to_stream($client, $client);

        // Đọc request
        $firstLine = stream_get_line($client, $maxLength, $ending);
        $restOfContents = stream_get_contents($client);
        echo $firstLine . PHP_EOL;
        echo $restOfContents . PHP_EOL;

        // Gửi response
        $responseData = 'NAT';
        stream_socket_sendto($client, $responseData);

        // Đóng kết nối
        stream_socket_shutdown($client, STREAM_SHUT_RDWR);
    }
}
