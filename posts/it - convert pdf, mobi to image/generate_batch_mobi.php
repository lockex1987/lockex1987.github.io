<?php

$inputFolder = 'D:/new/mobi';
$outputFolder = 'D:/new/epub';


function getFiles(): array
{
    global $inputFolder;
    return array_diff(scandir($inputFolder), ['.', '..']);
}


function generateBatchFile(array $files): void
{
    global $inputFolder;
    global $outputFolder;
    $content = '';
    foreach ($files as $fileName) {
        $baseName = explode('.', $fileName)[0];
        $content .= "\"C:/Program Files (x86)/Calibre2/ebook-convert.exe\" \"$inputFolder/$baseName.mobi\" \"$outputFolder/$baseName.epub\"" . PHP_EOL;
        // for (( i = 5; i <= 9; i++ )) do unzip "vo si dao 0$i.zip" -d "vo si dao 0$i"; done
    }
    file_put_contents('convert_mobi_to_epub.bat', $content);
}


$files = getFiles();
generateBatchFile($files);
