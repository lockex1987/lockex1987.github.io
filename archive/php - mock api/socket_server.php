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
// spawn another socket to handle communication
$clientSocket = socket_accept($serverSocket);

// Đọc request input từ client
$input = socket_read($clientSocket, 1024);

// Xử lý input
$input = trim($input);
echo 'Client message: ' . $input . PHP_EOL;
$output = strrev($input) . "\n";

// Gử response
socket_write($clientSocket, $output, strlen($output));

// Đóng các socket
socket_close($clientSocket);
socket_close($serverSocket);
