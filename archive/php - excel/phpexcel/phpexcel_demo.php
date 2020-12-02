<?php
require 'vendor/autoload.php';

$provinces = [];
$districts = [];
$wards = [];

function importExcel()
{
    global $provinces, $districts, $wards;

    // Load file ra object PHPExcel
    $objPHPExcel = PHPExcel_IOFactory::load('addresses.xls');
    // Set sheet sẽ được đọc dữ liệu
    $provinceSheet = $objPHPExcel->setActiveSheetIndex(0);
    // Lấy số row lớn nhất trong sheet
    $highestRow = $provinceSheet->getHighestRow();
    // For chạy từ 2 vì row 1 là title
    
    for ($row = 2; $row <= $highestRow; $row++) {
        // Lấy dữ liệu từng ô theo col và row
        $id = $provinceSheet->getCellByColumnAndRow(0, $row)->getValue();
        $name = $provinceSheet->getCellByColumnAndRow(1, $row)->getValue();
        $type = $provinceSheet->getCellByColumnAndRow(2, $row)->getValue();

        //echo $name . PHP_EOL;

        array_push($provinces, [
            'id' => $id,
            'name' => $name,
            'type' => $type
        ]);
    }

    $districtSheet = $objPHPExcel->setActiveSheetIndex(1);
    $highestRow = $districtSheet->getHighestRow();
    for ($row = 2; $row <= $highestRow; $row++) {
        $id = $districtSheet->getCellByColumnAndRow(0, $row)->getValue();
        $name = $districtSheet->getCellByColumnAndRow(1, $row)->getValue();
        $type = $districtSheet->getCellByColumnAndRow(2, $row)->getValue();
        $location = $districtSheet->getCellByColumnAndRow(3, $row)->getValue();
        $provinceId = $districtSheet->getCellByColumnAndRow(4, $row)->getValue();

        //echo $name . PHP_EOL;

        array_push($districts, [
            'id' => $id,
            'name' => $name,
            'type' => $type,
            'location' => $location,
            'provinceId' => $provinceId
        ]);
    }

    $wardSheet = $objPHPExcel->setActiveSheetIndex(2);
    $highestRow = $wardSheet->getHighestRow();
    for ($row = 2; $row <= $highestRow; $row++) {
        $id = $wardSheet->getCellByColumnAndRow(0, $row)->getValue();
        $name = $wardSheet->getCellByColumnAndRow(1, $row)->getValue();
        $type = $wardSheet->getCellByColumnAndRow(2, $row)->getValue();
        $location = $wardSheet->getCellByColumnAndRow(3, $row)->getValue();
        $districtId = $wardSheet->getCellByColumnAndRow(4, $row)->getValue();

        //echo $name . PHP_EOL;

        array_push($wards, [
            'id' => $id,
            'name' => $name,
            'type' => $type,
            'location' => $location,
            'districtId' => $districtId
        ]);
    }
}

function exportExcel()
{
    global $provinces, $districts, $wards;

    $objPHPExcel = new \PHPExcel();

    foreach ($provinces as $key => $province) {
        // Tạo 1 sheet mới
        $objPHPExcel->createSheet();
        $activeSheet = $objPHPExcel->setActiveSheetIndex($key);
        // Đặt tên sheet là tên tỉnh
        $activeSheet->setTitle($province['name']);
        // Set title cho dòng đầu tiên
        $activeSheet
                ->setCellValue('A1', 'Quận/Huyện')
                ->setCellValue('B1', 'Xã/Phường')
                ->setCellValue('C1', 'Kinh độ, vĩ độ');
        $i = 2;
        $j = 2;

        $currentDistricts = getDistrictsOfProvince($districts, $province['id']);
        
        foreach ($currentDistricts as $district) {
            // Set tên quận/huyện
            $activeSheet->setCellValue("A$i", $district['type'] . ' ' . $district['name']);

            $currentWards = getWardsOfDistrict($wards, $district['id']);
            
            foreach ($currentWards as $ward) {
                // Tương ứng mỗi quận huyện set tên xã/phường
                $activeSheet->setCellValue("B$j", $ward['type'] . ' ' . $ward['name']);
                $activeSheet->setCellValue("C$j", $ward['location']);
                $j++;
            }

            $rowMerge = $j - 1;
            if ($i < $rowMerge) {
                // Merge các cell có cùng 1 quận/huyện
                $activeSheet->mergeCells("A$i:A$rowMerge");
            }
            $i = $j;
        }

        foreach (range('A', 'C') as $columnId) {
            $activeSheet->getColumnDimension($columnId)->setAutoSize(true);
        }
    }

    $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    $objWriter->save('result.xlsx');
}

function getDistrictsOfProvince($districts, $provinceId)
{
    return array_filter($districts, function ($d) use ($provinceId) {
        return $d['provinceId'] == $provinceId;
    });
}

function getWardsOfDistrict($wards, $districtId)
{
    return array_filter($wards, function ($w) use ($districtId) {
        return $w['districtId'] == $districtId;
    });
}

importExcel();
exportExcel();
