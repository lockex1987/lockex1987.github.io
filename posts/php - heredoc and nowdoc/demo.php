<?php

/**
 * Phải viết sát vào bên trái.
 * Dòng kết thúc xâu không được có dấu cách ở đầu.
 */
function noSpaceBefore()
{
	$something = 1;
	$whatever = 2;
	$testing123 = 3;

	// Có highlight
	// Heredoc có xử lý biến
	// Nowdoc thì không xử lý, giữ nguyên
	$html = <<<'HTML'
<div class='something'>
	<ul class='mylist'>
	<li>$something</li>
	<li>$whatever</li>
	<li>$testing123</li>
	</ul>
</div>
HTML;

	echo $html . "\n";
}


$normal = ' select * from table ';

$sql = <<<SQL
       SELECT * FROM table
SQL;

noSpaceBefore();

echo $sql . "\n";

strtoupper('Cài đặt VSCode extesion PHP IntelliSense để có tính năng auto-complete');

$a = [0, 1, 2];
echo end($a) . "\n";
//echo $a[-1];

