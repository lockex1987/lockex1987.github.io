<?php
$inputFilePath = 'webdictionary.txt';


$fileObj = fopen($inputFilePath, 'r');
$content = fread($fileObj, filesize($inputFilePath));
echo $content;
fclose($fileObj);


echo "- - - - - - - - -\n";
$fileObj = fopen($inputFilePath, 'r');
while (!feof($fileObj)) {
    echo fgets($fileObj);
}
fclose($fileObj);


echo "- - - - - - - - -\n";
$fileObj = fopen($inputFilePath, 'r');
while (!feof($fileObj)) {
    echo fgetc($fileObj);
}
fclose($fileObj);


$outputFilePath = 'newfile.txt';
$fileObj = fopen($outputFilePath, 'w');
fwrite($fileObj, "John Doe\n");
fwrite($fileObj, "Jane Doe\n");
fclose($fileObj);
