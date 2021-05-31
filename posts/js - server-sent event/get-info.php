<?php

// Thiết lập đúng header
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

// Phải thêm dòng này
// https://serverfault.com/questions/801628/for-server-sent-events-sse-what-nginx-proxy-configuration-is-appropriate
header('X-Accel-Buffering: no');

// Thêm đoạn này nếu không mặc định script PHP sẽ dừng lại sau 30 giây
set_time_limit(0);

$count = 1;

// Using while to keep server connection open, so we have only one request.
// If connection is closed browser will reconnect and will send last event Id.
while (true) {
    sendMessage($count, 'cpu', time());
    $count++;

    sleep(2);

    // Thêm đoạn này nếu không sẽ là vòng lặp vô hạn trên server
    if (connection_aborted()) {
        break;
    }
}

/**
 * Gửi trả về client.
 */
function sendMessage($value, $event = null, $id = null, $retry = null)
{
    if ($retry) {
        echo "retry: $retry\n";
    }

    if ($id) {
        echo "id: $id\n";
    }

    if ($event) {
        echo "event: $event\n";
    }

    echo "data: $value\n\n";

    ob_flush();
    flush();
}
