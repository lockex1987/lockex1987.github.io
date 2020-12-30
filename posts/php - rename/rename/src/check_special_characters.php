<?php

/**
 * Loại bỏ các ký tự đặc biệt, để có thể di chuyển file giữa Windows và Linux.
 */
function checkSpecialCharacters($folder)
{
	$a = scandir($folder);
	foreach ($a as $f) {
		if (!in_array($f, ['.', '..'])) {
			$absPath = $folder . DIRECTORY_SEPARATOR . $f;
			if (str_contains($f, ':') || str_contains($f, '!')) {
				echo $absPath . PHP_EOL;
				$newName = str_replace(':', ' - ', $f);
				$newName = str_replace('!', '', $newName);
				rename($absPath, $folder . DIRECTORY_SEPARATOR . $newName);
			}
			if (is_dir(realpath($absPath))) {
				checkSpecialCharacters($absPath);
			}
		}
	}
}


/**
 * PHP8 mới có hàm str_contains
 */
/*
if (!function_exists('str_contains')) {
	function str_contains($haystack, $needle)
	{
		if (strpos($haystack, $needle) !== false) {
			return true;
		}
		return false;
	}
}
*/

// Chú ý $rootFolder không có ký tự / cuối cùng
$rootFolder = $argv[1];
checkSpecialCharacters($rootFolder);
