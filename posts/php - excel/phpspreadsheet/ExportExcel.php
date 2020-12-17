<?php
namespace App\Utils;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\IOFactory as PhpSpreadsheetFactory;

class ExportExcel
{
    private $spreadsheet;
    private $sheet;

    public function __construct($templatePath)
    {
        // https://itsolutionstuff.com/post/how-can-i-get-the-path-from-laravel-application-rootexample.html
        // https://laravel.com/docs/master/helpers
        $filePath = app_path($templatePath);
        $this->spreadsheet = $this->loadExistingFile($filePath);
        $this->sheet = $this->spreadsheet->getActiveSheet();
    }

     /**
     * Thiết lập giá trị của một dòng.
     */
    public function setRowValues($row, $values)
    {
        $col = 0;
        foreach($values as $v) {
            $this->sheet->setCellValue($this->getExcelColumnLabel($col++) . $row, $v);
        }
    }

    /**
     * Download file.
     */
    public function responseToClient($filename)
    {
        //header('Content-type: application/vnd.ms-excel'); // xls
        header('Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // xlsx
        header('Content-Disposition: attachment; filename="' . $filename . '"');

        //PhpSpreadsheetFactory::createWriter($this->spreadsheet, 'Xlsx')->save('php://output');
        
        $writer = new Xlsx($this->spreadsheet);
        $writer->save('php://output');
    }

    public function setStyle($area, $styles)
    {
        $this->sheet ->getStyle($area)->applyFromArray($styles);
    }

    public function setBorders($area)
    {
        $this->setStyle($area, [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF222222'],
                ],
            ],
        ]);
    }

    /**
     * Load file Excel có sẵn.
     */
    private function loadExistingFile($filePath)
    {
        return PhpSpreadsheetFactory::load($filePath);
    }

    /**
     * Here's a nice simple recursive function (Based on zero indexed numbers, meaning 0 == A, 1 == B, etc)...
     */
    private function getExcelColumnLabel($num)
    {
        $numeric = $num % 26;
        $letter = chr(65 + $numeric);
        $num2 = intval($num / 26);
        if ($num2 > 0) {
            return $this->getExcelColumnLabel($num2 - 1) . $letter;
        } else {
            return $letter;
        }
    }
}