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


/**
 * PHP8 mới có hàm str_starts_with.
 */
if (!function_exists('str_starts_with')) {
	function str_starts_with(string $haystack, string $needle): bool
	{
		$length = strlen($needle);
		return substr($haystack, 0, $length) === $needle;
	}
}


/**
 * PHP8 mới có hàm str_ends_with.
 */
if (!function_exists('str_ends_with')) {
	function str_ends_with(string $haystack, string $needle): bool
	{
		$length = strlen($needle);
		return substr($haystack, -$length) === $needle;
	}
}
