
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
	<title>PHP Demo</title>
	
	<style>
	table{
		border-collapse:collapse;
		}
	table th, table td{
		border:1px solid #ccc;
		padding:3px 10px;
		text-align:left;
		vertical-align:top;
	}
	table th{
		background:#edeff0;
	}
</style>
</head>
<body>

	<p>Your PHP version is <?php echo phpversion() ?>.</p>

	<table border="1px solid" cellspacing="0" cellpadding="0">
		<tr>
			<th>Value of variable</th>
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
	['value' => '', 'label' => '"" (an empty string)'],
	['value' => '0', 'label' => '"0" (0 as a string)'],
	['value' => 0, 'label' => '0 (0 as an integer)'],
	['value' => 0.0, 'label' => '0.0 (0 as a float)'],
	['value' => array(), 'label' => 'array() (an empty array)'],
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
	
</body>
</html>
