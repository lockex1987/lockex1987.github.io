<?php
require('WriteToFile.php');

try {
	// Tạo một đối tượng file để lưu dữ liệu
	$fp = new WriteToFile('data.txt');

	// Ghi vào file dữ liệu
	$fp->write('This is a line of data.');

	// Đóng file
	$fp->close();

	// Xóa đối tượng
	unset($fp);

	// Mọi việc hoàn thành, in ra một message
	echo 'Ghi dữ liệu vào file thành công.\n';
} catch (Exception $e) {
	// Nếu lỗi xảy ra, in ra màn hình message
	echo 'Quá trình xử lý file lỗi: ' . $e->getMessage() . "\n";
}
