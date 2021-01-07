<?php

/**
 * PHP8 mới có hàm str_contains.
 */
if (!function_exists('str_contains')) {
	function str_contains($haystack, $needle)
	{
		if (strpos($haystack, $needle) !== false) {
			return true;
		}
		return false;
	}
}
