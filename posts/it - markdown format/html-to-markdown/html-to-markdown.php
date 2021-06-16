<?php

require_once __DIR__ . '/vendor/autoload.php';

use League\HTMLToMarkdown\HtmlConverter;

function convertHtmlToMarkdown(string $inputFilePath): void
{
    $html = file_get_contents($inputFilePath);
    $options = [
        'strip_tags' => true,
        'remove_nodes' => 'title'
    ];
    $converter = new HtmlConverter($options);
    $markdown = $converter->convert($html);
    $outputFilePath = 'dist/index.md';
    file_put_contents($outputFilePath, $markdown);
}

convertHtmlToMarkdown($argv[1]);
