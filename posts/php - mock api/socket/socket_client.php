<?php

// Thiết lập các biến
$host = '127.0.0.1';
$port = 25003;

// Tạo socket kết nối đến server
$clientSocket = socket_create(AF_INET, SOCK_STREAM, 0); // 0 là SOL_TCP?
socket_connect($clientSocket, $host, $port);
echo 'Connnected to server' . PHP_EOL;

do {
    $stdin = fopen('php://stdin', 'r');
    $message = trim(fgets($stdin));

    // Gửi request đến server
    socket_write($clientSocket, $message, strlen($message));

    if ($message == 'quit' || $message == 'shutdown') {
        // Đóng socket
        socket_close($clientSocket);
        break;
    }

    // Nhận response từ server
    $result = socket_read($clientSocket, 1024);
    /*
    if (false === ($buf = socket_read($sock, 2048, PHP_NORMAL_READ))) {
        echo "socket_read() failed: reason: " . socket_strerror(socket_last_error($sock)) . "\n";
    }
    */
    echo 'Reply from server: ' . $result . PHP_EOL;
} while (true);
