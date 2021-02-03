<?php

function createZipFile()
{
	$path = 'test_new.zip';
	$zip = new ZipArchive;
	if ($zip->open($path, ZipArchive::CREATE) == true) {
		// Add files to the zip file
		$zip->addFile('create_zip_file.php');
		//$zip->addFile('export_docx.php');

		// Add index.html file to zip and rename it to random.html
		//$zip->addFile('index.html', 'random.html');

		// Add a file new.txt file to zip using the text specified
		$zip->addFromString('new.txt', 'Text to be added to the new.txt file');

		// All files are added, so close the zip file.
		$zip->close();
	}
}

createZipFile();


/**
 * Creates a compressed zip file
 */
function createZip2($files = array(), $destination = '', $overwrite = false)
{
	// If the zip file already exists and overwrite is false, return false
	if (file_exists($destination) && !$overwrite) {
		return false;
	}

	// Danh sách các file hợp lệ
	$valid_files = array();
	// If files were passed in
	if (is_array($files)) {
		// Cycle through each file
		foreach ($files as $file) {
			// Make sure the file exists
			if (file_exists($file)) {
				$valid_files[] = $file;
			}
		}
	}

	// If we have good files
	if (count($valid_files)) {
		// Create the archive
		$zip = new ZipArchive();
		if ($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
			return false;
		}

		// Add the files
		foreach ($valid_files as $file) {
			$zip->addFile($file, $file);
		}

		//echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;

		// Close the zip -- done!
		$zip->close();

		// Check to make sure the file exists
		return file_exists($destination);
	} else {
		return false;
	}
}

$files_to_zip = [
	'preload-images/1.jpg',
	'preload-images/2.jpg',
	'preload-images/5.jpg',
	'kwicks/ringo.gif',
	'rod.jpg',
	'reddit.gif'
];


$result = createZip2($files_to_zip, 'my-archive.zip');
