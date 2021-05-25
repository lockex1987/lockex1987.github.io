<?php

/**
 * Gửi packet để khởi động máy tính qua LAN.
 * @param string $broadcast Địa chỉ broadcast
 * @param string $mac Địa chỉ MAC của máy đích
 */
function wol(string $broadcast, string $mac): void
{
    $packet = getMagicPacket($mac);

    $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);

    if ($sock !== false) {
        $options = socket_set_option($sock, SOL_SOCKET, SO_BROADCAST, true);

        if ($options !== false) {
            $port = 7;
            socket_sendto($sock, $packet, strlen($packet), 0, $broadcast, $port);
            socket_close($sock);
            echo 'Magic packet sent' . PHP_EOL;
        }
    }
}

/**
 * Tạo magic packet từ địa chỉ MAC.
 */
function getMagicPacket(string $mac): string
{
    $a = explode(':', $mac);

    $hardwareAddress = implode('', array_map(fn ($s) => chr(hexdec($s)), $a));

    /*
    $hardwareAddress = '';
    for ($i = 0; $i < 6; $i++) {
        $hardwareAddress .= chr(hexdec($a[$i]));
    }
    */
    
    // $hardwareAddress = pack('H*', preg_replace('/[^0-9a-fA-F]/', '', $mac));

    $packet = sprintf(
        '%s%s',
        str_repeat(chr(255), 6), // 0xFF
        str_repeat($hardwareAddress, 16)
    );
    return $packet;
}


$broadcast = '255.255.255.0';
$mac = 'aa:bb:cc:11:22:33';

// echo getMagicPacket($mac) . PHP_EOL;
