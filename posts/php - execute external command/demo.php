<?php

function demo()
{
	$filePath = '.';
	$command = escapeshellcmd('ls ' . escapeshellarg($filePath));

	// Cách 1: backtick operator
	$result = `$command`;
	echo $result . PHP_EOL;

	// Cách 2: hàm shell_exec
	// Giống hệt backtick operator
	// $result là output
	/*
	$result = shell_exec($command);
	echo $result . PHP_EOL;
	*/

	// Cách 3: hàm exec
	// $result là dòng cuối cùng
	// $output là mảng các dòng
	// $returnVar là 0
	/*
	$result = exec($command, $output, $returnVar);
	print_r($output);
	echo $returnVar . PHP_EOL;
	echo $result . PHP_EOL;
	*/
	
	// Cách 4: hàm system
	// Hàm này tự in kết quả ra màn hình trực tiếp rồi
	// $result chỉ là dòng cuối cùng
	// $returnVar là 0
	/*
	$result = system($command, $returnVar);
	echo $returnVar . PHP_EOL;
	echo $result . PHP_EOL;
	*/

	// Cách 5: hàm passthru
	// Hàm này nên được sử dụng khi mà dữ liệu ở dạng nhị phân
	// mà cần trả về trực tiếp cho trình duyệt
	// (ảnh, download file).
	
	return $result;
}

demo();
