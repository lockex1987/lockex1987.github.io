<?php

$folder = 'D:/new/dung si hesman';


function getFiles(): array
{
    global $folder;
    return array_diff(scandir($folder), ['.', '..']);
}


function normalizeFileName(array $files): void
{
    global $folder;
    foreach ($files as $fileName) {
        $a = explode('-', $fileName);
        $newName = strlen($a[0]) == 2 ? '0' : '';
        $newName .= $a[0] . ' - ' . $a[1];
        echo $newName . PHP_EOL;
        // rename($folder . '/' . $fileName, $folder . '/' . $newName);
    }
}


function checkSpecialCharacters(array $files): void
{
    $pattern = '/[^ a-z0-9.-]/i';
    foreach ($files as $fileName) {
        if (preg_match($pattern, $fileName) > 0) {
            echo $fileName . PHP_EOL;
        }
    }
}


function generateBatchFile(array $files): void
{
    global $folder;
    $outputFolder = 'D:/new/images';
    $content = '';
    foreach ($files as $fileName) {
        $number = explode(' - ', $fileName)[0];
        $subFolder = explode('.', $fileName)[0];
        $content .= 'mkdir "' . $outputFolder . '/' . $subFolder . '"' . PHP_EOL;
        $content .= "pdfimages.exe -j \"$folder/$fileName\" \"$outputFolder/$subFolder/$number\"" . PHP_EOL;
    }
    file_put_contents('convert_pdf_to_images.bat', $content);
}


$files = getFiles();
// normalizeFileName($files);
// checkSpecialCharacters($files);
generateBatchFile($files);
