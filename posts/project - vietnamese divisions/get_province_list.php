<?php

/**
 * Lấy mã HTML của trang web.
 * @param string $url Địa chỉ trang web
 * @return string Mã HTML
 */
function getHtml(string $url): string
{
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_PROXY => 'http://192.168.103.26:80',
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false
    ]);
    $resp = curl_exec($curl);
    curl_close($curl);
    return $resp;
}


/**
 * Bóc tách mã HTML, lấy danh sách các tỉnh / thành phố của Việt Nam.
 */
function getProvinceList(string $html): array
{
    $doc = new DomDocument();
    @$doc->loadHTML($html);

    $table = $doc->getElementsByTagName('table')->item(2);
    $rows = $table->getElementsByTagName('tr');

    $provinceList = [];
    foreach ($rows as $idx => $row) {
        // Dòng header không có thẻ td
        if ($idx == 0) {
            continue;
        }

        $cols = $row->getElementsByTagName('td');
        $firstCell = $cols->item(0);
        $link = $firstCell->getElementsByTagName('a')->item(0);
        $provinceName = $link->nodeValue;
        $provinceName = str_replace([' Province', ' City'], ['', ''], $provinceName);
        $url = $link->getAttribute('href');
        
        $provinceList[] = [
            'name' => $provinceName,
            'url' => 'https://en.m.wikipedia.org' . $url
        ];
    }

    return $provinceList;
}


/**
 * Lấy tọa độ của từng tỉnh từ trang Wikipedia của tỉnh đó.
 */
function getCoordinatesOfProvince(string $url): array
{
    $html = getHtml($url);
    $doc = new DomDocument();
    @$doc->loadHTML($html);

    $xpath = new DOMXpath($doc);
    $elems = $xpath->query("//span[@class='geo-dec']");
    $summary = $elems[0]->textContent;
    echo $summary . PHP_EOL;

    $lat = 0;
    $lng = 0;
    $regex = '/([\d.]+)°N ([\d.]+)°E/';
    if (preg_match($regex, $summary, $maches)) {
        $lat = floatval($maches[1]);
        $lng = floatval($maches[2]);
    }

    return [
        $lat,
        $lng
    ];
}


/**
 * Lưu đầu ra JSON ra file.
 */
function writeToJsonFile(array $provinceList): void
{
    $filePath = 'data/provinceList.json';
    $json = json_encode($provinceList, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents($filePath, $json);
}


function main(): void
{
    $html = getHtml('https://en.m.wikipedia.org/wiki/Provinces_of_Vietnam');
    $provinceList = getProvinceList($html);
    foreach ($provinceList as $i => $province) {
        [$lat, $lng] = getCoordinatesOfProvince($province['url']);
        echo $province['name'] . PHP_EOL . $lat . ', ' . $lng . PHP_EOL . PHP_EOL;
        $provinceList[$i]['lat'] = $lat;
        $provinceList[$i]['lng'] = $lng;
        unset($provinceList[$i]['url']);
    }
    writeToJsonFile($provinceList);
}

main();
