<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<title>PHP demo</title>
	
	<link rel="icon" href="../../images/favicon.png">
    <link rel="stylesheet" href="../../css/style.css">
	
	
</style>
</head>
<body>

<article>
<h2>PHP demo</h2>
	<p>Your PHP version is <?php echo phpversion() ?>.</p>

<div class="out-of-box">
	<table class="table table-bordered">
		<tr>
			<th>Giá trị của biến</th>
			<th>boolean</th>
			<th>isset</th>
			<th>empty</th>
			<th>is_null</th>
			<th>Elvis operator</th>
			<th>Null-coalescing operator</th>
		</tr>
	
<?php

function evaluate($v)
{
	if ($v) {
		return 'true';
	} else {
		return 'false';		
	}
}

function displayRow($varValue, $varLabel)
{
	echo '<tr>';
	echo '<td>' . $varLabel . '</td>';
	echo '<td>' . evaluate($varValue) . '</td>';
	echo '<td>' . evaluate(isset($varValue)) . '</td>';
	echo '<td>' . evaluate(empty($varValue)) . '</td>';
	echo '<td>' . evaluate(is_null($varValue)) . '</td>';
	echo '<td>';
	echo var_dump($varValue ?: 'xxx');
	echo '</td>';
	echo '<td>';
	echo var_dump($varValue ?? 'xxx');
	echo '</td>';
	echo '</tr>';
}

function displayUndefined()
{
	echo '<tr>';
	echo '<td>Undefined</td>';
	echo '<td>';
	echo evaluate($varValue);
	echo '</td>';
	
	echo '<td>' . evaluate(isset($varValue)) . '</td>';
	echo '<td>' . evaluate(empty($varValue)) . '</td>';
	echo '<td>';
	echo evaluate(is_null($varValue));
	echo '</td>';
	
	echo '<td>';
	echo var_dump($varValue ?: 'xxx');
	echo '</td>';
	echo '<td>';
	echo var_dump($varValue ?? 'xxx');
	echo '</td>';
	echo '</tr>';
	
	echo '</tr>';
}

$data = [
	['value' => false, 'label' => 'false'],
	['value' => '', 'label' => '"" (xâu rỗng)'],
	['value' => '0', 'label' => '"0" (xâu 0)'],
	['value' => 0, 'label' => '0 (số nguyên 0)'],
	['value' => 0.0, 'label' => '0.0 (số thực 0)'],
	['value' => [], 'label' => 'Mảng rỗng []'],
	['value' => null, 'label' => 'null'],
	// ----------
	['value' => true, 'label' => 'true'],
];

foreach ($data as $e) {
	displayRow($e['value'], $e['label']);
}

displayUndefined();
?>
	
</table>
</div>
</article>	
</body>
</html>
