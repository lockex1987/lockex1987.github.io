<?php

$url = 'sample_2.html';
$html = file_get_contents($url);


$dom = new DOMDocument(); 
$dom->loadHTML($html); 
// $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));

// Loại bỏ khoảng trắng
$dom->preserveWhiteSpace = false; 

// Lấy bảng theo tên thẻ
$tables = $dom->getElementsByTagName('table'); 

// Lấy tất cả các hàng từ bảng
$rows = $tables->item(0)->getElementsByTagName('tr'); 

// Lặp qua các hàng trong bảng
foreach ($rows as $row) 
{
    // Lấy cột theo tên thẻ
    $cols = $row->getElementsByTagName('td'); 
   
    // Hiển thị giá trị
    echo 'Designation: '.$cols->item(0)->nodeValue . "\n"; 
    echo 'Manager: '.$cols->item(1)->nodeValue . "\n"; 
    echo 'Team: '.$cols->item(2)->nodeValue . "\n"; 
    echo  "------------------\n\n";
}
