<?php

/**
 * PHP8 mới có hàm str_contains.
 */
if (!function_exists('str_contains')) {
	function str_contains(string $haystack, string $needle): bool
	{
		if (strpos($haystack, $needle) !== false) {
			return true;
		}
		return false;
	}
}
