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
    $inputFilePath = 'demo_1.xlsx';
    $spreadsheet = IOFactory::load($inputFilePath);
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('B2', 'Updated');

    $outputFilePath = 'demo_2.xlsx';
    $writer = new Xlsx($spreadsheet);
    $writer->save($outputFilePath);
}


/**
 * Dùng Html Reader của PhpSpreadsheet.
 * https://github.com/tijsverkoyen/CssToInlineStyles.
 */
function generateFromHtml()
{
    // Color phải dạng 6 chữ số hexa
    $htmlString = <<<'HTML'
        <table>
            <tr>
                <td style="background-color: #4c87b9; color: #fff; width: 45; text-align: center"
                    colspan="2">
                    Hello World
                </td>
            </tr>
            <tr>
                <td style="color: red"
                    rowspan="2">
                    Hello
                    <br />
                    World
                </td>
            </tr>
            <tr>
                <!-- Vẫn phải có cell trống? -->
                <!--td>
                    
                </td-->
                <td style="border: 1px solid #000000;">
                    Hello
                    <br>
                    World
                </td>
            </tr>
        </table>
        HTML;

    $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();
    
    $spreadsheet = $reader->loadFromString($htmlString);

    // $reader->setSheetIndex(1);
    // $spreadhseet = $reader->loadFromString($secondHtmlString, $spreadsheet);

    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
    $writer->save('write.xlsx');
}


/**
 * Tham khảo:
 *     https://github.com/PHPOffice/PhpSpreadsheet/blob/master/samples/Chart/
 * Phải dùng Reader và Writer để có tùy chọn setIncludeCharts().
 */
function drawChart()
{
    $inputFilePath = 'chart_input.xlsx';
    
    // $spreadsheet = IOFactory::load($inputFilePath);

    $reader = IOFactory::createReader('Xlsx');
    $reader->setIncludeCharts(true);
    $spreadsheet = $reader->load($inputFilePath);

    
    $sheet = $spreadsheet->setActiveSheetIndex(1);
    $sheet->setCellValue('A3', 'Bình');
    $sheet->setCellValue('B3', 200);

    $outputFilePath = 'chart_output.xlsx';
    
    // $writer = new Xlsx($spreadsheet);

    $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
    $writer->setIncludeCharts(true);
    
    $writer->save($outputFilePath);
}


// simpleDemo();
// readExistingFile();
// generateFromHtml();
drawChart();
