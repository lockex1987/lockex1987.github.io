<?php

function writeDownloadLinks(string $folder, int $noOfFiles, string $extension): void
{
    $rootUrl = 'https://beeng.net';
    $basePath = '/libs/tinymce/emoji/';
    $links = [];
    for ($i = 1; $i <= $noOfFiles; $i++) {
        $name = $folder . '/' . str_pad($i, 3, '0', STR_PAD_LEFT) . '.' . $extension;
        $url = $rootUrl . $basePath . $name;
        
        $links[] = [
            'name' => $name,
            'url' => $url
        ];
    }
    $fileName = 'emoji-' . strtolower(str_replace('/', '', $folder)) . '.json';
    $data = json_encode($links);
    file_put_contents($fileName, $data);
}


// writeDownloadLinks('meo', 105, 'png');
// writeDownloadLinks('meo/Gif', 69, 'gif');
// writeDownloadLinks('tho', 69, 'gif');
writeDownloadLinks('voz', 50, 'png');
