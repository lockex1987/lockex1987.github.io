<?php

// Get title from url
// $url = 'http://www.japantimes.co.jp/';
$url = 'sample_3.html';
$html = file_get_contents($url);

$doc = new DOMDocument();
$doc->loadHTML($html);

$xpath = new DOMXPath($doc);  
$titleNode = $xpath->query('//title');
// var_dump($titleNode->item(0));
print_r($titleNode->item(0));

// Get all link from url
$allLink = $doc->getElementsByTagName('a');
foreach ($allLink as $link) {
    echo $link->getAttribute('href') . "\n";
    $link->setAttribute('rel', 'nofollow');
}

echo $doc->saveHTML();
