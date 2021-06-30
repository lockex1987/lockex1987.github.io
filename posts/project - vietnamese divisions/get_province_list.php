<?php

function getHtml(string $url): string
{
    $proxy = 'http://192.168.103.26:80';

    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        // CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6)    Gecko/20070725 Firefox/2.0.0.6',
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_PROXY => $proxy,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false
    ]);

    $resp = curl_exec($curl);
    curl_close($curl);
    return $resp;
}


function getProvinceList(string $html): array
{
    $doc = new DomDocument();
    @$doc->loadHTML($html);

    $table = $doc->getElementsByTagName('table')->item(2);
    $rows = $table->getElementsByTagName('tr');
    $rowCount = $rows->length - 1; // trừ dòng header
    echo 'Số hàng của bảng là ' . $rowCount . PHP_EOL;

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
        // echo $provinceName . ': ' . $url . PHP_EOL;
    }

    return $provinceList;
}


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
        // var_dump($maches);
        $lat = floatval($maches[1]);
        $lng = floatval($maches[2]);
    }

    return [
        $lat,
        $lng
    ];
}


function main(): void
{
    $html = getHtml('https://en.m.wikipedia.org/wiki/Provinces_of_Vietnam');
    $provinceList = getProvinceList($html);
    for ($i = 0; $i < count($provinceList); $i++) {
        $province = $provinceList[$i];

        echo $province['name'] . PHP_EOL;
        [$lat, $lng] = getCoordinatesOfProvince($province['url']);
        echo $lat . ', ' . $lng . PHP_EOL;
        $provinceList[$i]['lat'] = $lat;
        $provinceList[$i]['lng'] = $lng;
        echo PHP_EOL;
        /*

        echo PHP_EOL;
        echo PHP_EOL;
        */
    }

    file_put_contents('data/provinceList.json', json_encode($provinceList, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    // var_dump($provinceList);
}

main();
