<?php
require('connect/db_connect.php');
require('Classes/PHPExcel.php');

if (isset($_POST['btnGui'])) {
    $file = $_FILES['file']['tmp_name'];
    //echo $file;

	$objReader = PHPExcel_IOFactory::createReaderForFile($file);
	$objReader->setLoadSheetsOnly('10A1');

	$objExcel = $objReader->load($file);
    $sheetData = $objExcel->getActiveSheet()->toArray('null', true, true, true);
    //print_r($sheetData);

	$highestRow = $objExcel->setActiveSheetIndex()->getHighestRow();
	//echo $highestRow; 
	for ($row = 2; $row <= $highestRow; $row++) {
		$id_lop = 1;
		$name = $sheetData[$row]['A'];
		$toan = $sheetData[$row]['B'];
		$ly = $sheetData[$row]['C'];
		$hoa = $sheetData[$row]['D'];

		$sql = " INSERT INTO diem(id_lop, name, toan, ly, hoa) VALUES ($id_lop, '$name', $toan, $ly, $hoa) ";
		$mysqli->query($sql);
	}
	echo 'Inserted!';
}
?>


<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Import data to database</title>
</head>
<body>
	<form method="POST" enctype="multipart/form-data">
		<input type="file" name="file">

		<button type="submit" name="btnGui">
            Import
        </button>
	</form>
</body>
</html>
