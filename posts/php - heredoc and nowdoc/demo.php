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
	$html1 = <<<'HTML'
		<div class='something'>
			<ul class='mylist'>
			<li>$something</li>
			<li>$whatever</li>
			<li>$testing123</li>
			</ul>
		</div>
	HTML;

	$html2 = <<<HTML
		<div class='something'>
			<ul class='mylist'>
			<li>$something</li>
			<li>$whatever</li>
			<li>$testing123</li>
			</ul>
		</div>
	HTML;

	echo $html1 . PHP_EOL;
	echo $html2 . PHP_EOL;
}


$normal = ' select * from table ';

$sql = <<<SQL
    select * from table
SQL;

noSpaceBefore();

echo $sql . PHP_EOL;

strtoupper('Cài đặt VSCode extesion PHP IntelliSense để có tính năng auto-complete');

$a = [0, 1, 2];
echo end($a) . PHP_EOL;
//echo $a[-1];
