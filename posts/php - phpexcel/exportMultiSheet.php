<?php
require('Classes/PHPExcel.php');
require('connect/db_connect.php');

if (isset($_POST['btnExport'])) {
	$objExcel = new PHPExcel;

	$numSheet = 0;
	$sql = " SELECT * FROM lop ";
	$result = $mysqli->query($sql);
	while ($lop = mysqli_fetch_assoc($result)) {
		$objExcel->createSheet();
		$objExcel->setActiveSheetIndex($numSheet);
		$sheet = $objExcel->getActiveSheet()->setTitle($lop['name']);

		$numRow = 1;
		$sheet->setCellValue("A$numRow", 'Họ tên');
		$sheet->setCellValue("B$numRow", 'Toán');
		$sheet->setCellValue("C$numRow", 'Lý');
		$sheet->setCellValue("D$numRow", 'Hóa');

		$diem = $mysqli->query(" SELECT name, toan, ly, hoa FROM diem WHERE id_lop = $lop[id] ");

		while ($hocsinh = mysqli_fetch_assoc($diem)) {
			$numRow++;
			$sheet->setCellValue("A$numRow", $hocsinh['name']);
			$sheet->setCellValue("B$numRow", $hocsinh['toan']);
			$sheet->setCellValue("C$numRow", $hocsinh['ly']);
			$sheet->setCellValue("D$numRow", $hocsinh['hoa']);
		}

		$numSheet++;
	}
	$objWriter = new PHPExcel_Writer_Excel2007($objExcel);
	$filename = "diem_export.xlsx";
	$objWriter->save($filename);

	header('Content-Disposition: attachment; filename="' . $filename . '"');  
	header('Content-Type: application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet');  
	header('Content-Length: ' . filesize($filename));  
	header('Content-Transfer-Encoding: binary');  
	header('Cache-Control: must-revalidate');  
	header('Pragma: no-cache');  
	readfile($filename);  
	return;
}
?>


<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Export multisheet</title>
</head>
<body>
	<form method="POST">
		<button type="submit" name="btnExport">
            Export
        </button>
	</form>
</body>
</html>
