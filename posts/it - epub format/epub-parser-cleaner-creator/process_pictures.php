<?php

// Xử lý các thẻ img
// Chuyển thành thẻ figure(img, figcaption)
// Bỏ aside và note
$rootPath = 'D:/new/tu binh phong - robert van gulik/OEBPS/Text/';
$files = array_diff(scandir($rootPath), ['.', '..']);
// var_dump($files);

function loadXml(string $indexFilePath): DOMDocument
{
    $htmlCode = file_get_contents($indexFilePath);
    $normalizedHtml = mb_convert_encoding($htmlCode, 'HTML-ENTITIES', 'UTF-8');
    $normalizedHtml = str_replace("\r\n", "\n", $normalizedHtml);
    $normalizedHtml = str_replace('&nbsp;', ' ', $normalizedHtml);
    $normalizedHtml = str_replace('<meta name="charset" content="UTF-8"/>', '<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>', $normalizedHtml);
    $doc = new DOMDocument();
    @$doc->loadHTML($normalizedHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    return $doc;
}

foreach ($files as $file) {
    $path = $rootPath . $file;
    $doc = loadXml($path);

    $xpath = new DOMXPath($doc);
    $images = $doc->getElementsByTagName('img');
    $hasChange = false;
    foreach ($images as $img) {
        // echo $img->getAttribute('src') . PHP_EOL;
        $asideTag = $img->parentNode;
        $nodeName = $asideTag->nodeName;
        if ($nodeName == 'aside') {
            $pTag = $asideTag->getElementsByTagName('p')[0];
            // echo $pTag->nodeValue . PHP_EOL;
            $id = $asideTag->getAttribute('id');
            // echo $id . PHP_EOL;

            $aTag = $xpath->query("//a[@href='#$id']")[0];
            // echo $doc->saveXML($aTag) . PHP_EOL;
            $aTag->parentNode->removeChild($aTag);

            // Tạo thẻ div wrapper
            $figure = $doc->createElement('figure');
            $figcaption = $doc->createElement('figcaption');
            $figcaption->nodeValue = $pTag->nodeValue;
            $figure->appendChild($img->cloneNode());
            $figure->appendChild($figcaption);

            
            // Thay thế ảnh với thẻ div
            $asideTag->parentNode->replaceChild($figure, $asideTag);
            echo $doc->saveXML($figure) . PHP_EOL;
            $hasChange = true;
        }
        

    }

    if ($hasChange) {
        // Các thuộc tính của thẻ SVG bị chuyển thành chữ thường
        // Chỗ thẻ style bị thêm CDATA nên bị vỡ giao diện
        // Bỏ thẻ style, cảnh báo
        $output = $doc->saveXML($doc->documentElement);
        // echo $output;

    file_put_contents($path, $output);
    }
    
}