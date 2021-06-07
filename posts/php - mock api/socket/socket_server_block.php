<?php

// Thiết lập biến
$host = '127.0.0.1';
$port = 25003;

// Không đặt timeout
set_time_limit(0);

// Tạo socket
$serverSocket = socket_create(AF_INET, SOCK_STREAM, 0);
socket_bind($serverSocket, $host, $port);
socket_listen($serverSocket, 3);

// Nhận kết nối đến
do {
    $clientSocket = socket_accept($serverSocket);

    do {
        // Đọc request input từ client
        $input = socket_read($clientSocket, 1024);

        // Xử lý input
        $input = trim($input);
        echo 'Client message: ' . $input . PHP_EOL;
        $output = strrev($input) . "\n";

        // Gử response
        socket_write($clientSocket, $output, strlen($output));

        if ($input == 'quit') {
            // Đóng client hiện tại
            // Chờ client tiếp theo
            socket_close($clientSocket);
            break;
        }
        if ($input == 'shutdown') {
            // Dừng hẳn server
            break 2;
        }
    } while (true);
} while (true);

socket_close($serverSocket);
