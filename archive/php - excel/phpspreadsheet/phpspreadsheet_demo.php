<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

function simpleDemo()
{
    $spreadsheet = new Spreadsheet();

    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('A1', 'Hello World !');
    
    $writer = new Xlsx($spreadsheet);
    $writer->save('demo_1.xlsx');
}

function readExistingFile()
{
    $filePath = 'demo_1.xlsx';
    $spreadsheet = IOFactory::load($filePath);

    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('B2', 'Updated');

    $writer = new Xlsx($spreadsheet);
    $writer->save('demo_2.xlsx');
}

simpleDemo();
readExistingFile();

