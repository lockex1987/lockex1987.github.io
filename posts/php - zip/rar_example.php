<?php

$archivePath = 'data/sample.rar';
$extractFolder = 'output';


/*
$entry_name = 'path/to/archive/entry.txt'; // notice: no slash at the beginning
$new_entry_name = 'some.txt';

$entry = rar_entry_get($rar, $entry_name) or die('failed to find ' . $entry_name . ' in ' . $archivePath);

// this will create all necessary subdirs under $extractFolder
$entry->extract($extractFolder);
// OR
// this will create only one new file $new_entry_name in $extractFolder
$entry->extract('', $extractFolder . '/' . $new_entry_name);
*/

function extractRar($archivePath, $extractFolder)
{
    $archiveFile = rar_open($archivePath);
    $entries = rar_list($archiveFile);

    foreach ($entries as $entry) {
        echo 'Filename: ' . $entry->getName() . "\n";
        // echo 'Packed size: ' . $entry->getPackedSize() . "\n";
        // echo 'Unpacked size: ' . $entry->getUnpackedSize() . "\n";
        // echo "\n";
        // $entry->extract($extractFolder);
    }

    rar_close($archiveFile);
}


extractRar($archivePath, $extractFolder);
