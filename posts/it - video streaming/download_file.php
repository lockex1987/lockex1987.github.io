<?php

function downloadFromUrl(string $url, string $filePath, ?string $proxy = '')
{
    $file = fopen($filePath, 'wb');

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_FILE, $file);
    // curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Origin: https://www.thvli.vn',
        'Host: thvli-vod.admon.com.vn'
    ]);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) SFive/80.0 Chrome/80.0.3987.145 Safari/537.36');
    curl_setopt($ch, CURLOPT_REFERER, 'https://www.thvli.vn/detail/lien-thanh-quyet1');

    if (! empty($proxy)) {
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    }

    curl_exec($ch);
    curl_close($ch);
    fclose($file);
}


function main()
{
    $url = 'https://thvli-vod.admon.com.vn/61b7efd7a77ca15913ddc7a29697598a1626344295/201705/lienthanhquyet_e33/eb84e942/mapper-mhd/playlist.m3u8';
    $filePath = 'playlist.m3u8';
    $proxy = 'http://192.168.103.26:80';
    downloadFromUrl($url, $filePath, $proxy);
}

main();
