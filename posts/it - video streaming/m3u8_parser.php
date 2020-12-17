<?php


function startsWith($string, $startString) 
{ 
    $len = strlen($startString);
    return (substr($string, 0, $len) === $startString);
} 


if (count($argv) < 2) {
    echo 'Ban phai nhap file dau vao' . PHP_EOL;
} else {
    $path = $argv[1];
    $baseUrl = count($argv) > 2 ? $argv[2] : '';
    $lines = explode("\n", file_get_contents($path));
	$segments = [];
	foreach ($lines as $s) {
		// n.startswith("#")
		// if (startsWith($s, 'https://') || startsWith($s, 'http://')) {
		if (!startsWith($s, '#')) {
			$a = explode('?', $s);
			$b = explode('/', $a[0]);
			$name = end($b);
            if ($name) {
			    $segments[] = [
				    'url' => $baseUrl . $s,
				    'name' => 'segments/' . $name
			    ];
            }
		}
	}
	$output = json_encode($segments, JSON_PRETTY_PRINT);
	file_put_contents('segments.json', $output);
}
