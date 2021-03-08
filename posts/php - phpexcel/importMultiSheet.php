<?php
require('connect/db_connect.php');
require('Classes/PHPExcel.php');

if (isset($_POST['btnGui'])) {
	$file = $_FILES['file']['tmp_name'];

	$objReader = PHPExcel_IOFactory::createReaderForFile($file);
	$listWorkSheets = $objReader->listWorksheetNames($file);

	foreach ($listWorkSheets as $name) {
		$sql = " INSERT INTO lop(name) VALUES('$name') ";
		$mysqli->query($sql);
		$id_lop = $mysqli->insert_id;

		$objReader->setLoadSheetsOnly($name);

		$objExcel = $objReader->load($file);
		$sheetData = $objExcel->getActiveSheet()->toArray('null', true, true, true);

		$highestRow = $objExcel->setActiveSheetIndex()->getHighestRow();
		for ($row = 2; $row <= $highestRow; $row++) {
			$name = $sheetData[$row]['A'];
			$toan = $sheetData[$row]['B'];
			$ly = $sheetData[$row]['C'];
			$hoa = $sheetData[$row]['D'];

			$sql = " INSERT INTO diem(id_lop, name, toan, ly, hoa) VALUES ($id_lop, '$name', $toan, $ly, $hoa) ";
			$mysqli->query($sql);
		}
	}
	echo 'Successfuly';
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
