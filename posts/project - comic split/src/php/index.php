<?php

include_once('ImageSpliter.php');


class Main
{
    public function __construct()
    {
        $this->main();
    }


    /**
     * Xử lý một file (dùng để test).
     */
    private function processSingleFile(string $filePath, string $inputFolder): string
    {
        echo $filePath . PHP_EOL;
        $outputFolder = '../../_output/';
        $imageSpliter = new ImageSpliter($filePath, $inputFolder);
        $grid = $imageSpliter->splitImageToGrid();
        // $imageSpliter->splitFile($grid, $outputFolder);
        $imageSpliter->freeMemory();
        return $imageSpliter->getInfo($grid);
    }


    /**
     * Xử lý nhiều file.
     */
    private function processMultipleFiles(): void
    {
        $arr = [
            // '../images/has-heading.jpg',
            // '../images/has-row-span.jpg',
            '001.jpg',
            '004.jpg',
            '005.jpg',
            '006.jpg',
            '011.jpg',
            '018.jpg',
        ];
        $arrInfo = [];
        foreach ($arr as $filePath) {
            $arrInfo[] = $this->processSingleFile($filePath, '../../data-files/');
        }
        $this->saveResult($arrInfo);
    }


    /**
     * Xử lý cả folder nhiều ảnh.
     */
    private function processFolder(): void
    {
        $folder = '../data-files';
        $files = scandir($folder);
        $arrInfo = [];
        foreach ($files as $f) {
            if (!in_array($f, ['.', '..'])) {
                $filePath = $folder . DIRECTORY_SEPARATOR . $f;
                if (is_file($filePath)) {
                    $arrInfo[] = $this->processSingleFile($filePath, '../../data-files/');
                }
            }
        }
        $this->saveResult($arrInfo);
    }


    /**
     * Lưu kết quả ra file.
     */
    private function saveResult(array $arrInfo): void
    {
        $outputFilePath = '../../data/panels.json';
        $text = '[' . implode(",\n", $arrInfo) . ']';
        file_put_contents($outputFilePath, $text);
    }


    /**
     * Kiểm tra các phụ thuộc.
     * Chương trình phụ thuộc extension gd của PHP.
     * Cần đảm bảo extension này được enable ở file php.ini.
     */
    private function checkDependencies(): bool
    {
        if (!extension_loaded('gd')) {
            return false;
        }
        return true;
    }


    /**
     * Cắt các ảnh từ các grid đã được phân tích sẵn (lưu trong file JSON).
     */
    private function splitImageFromJson(): void
    {
        $panelsFilePath = '../data/panels.json';
        $files = json_decode(file_get_contents($panelsFilePath));
        // var_dump($files);
        foreach ($files as $f) {
            echo $f->filename . PHP_EOL;
            
            $grid = [];
            foreach ($f->panels as $p) {
                echo $p[0] . ', ' . $p[1] . ', ' . $p[2] . ', ' . $p[3] . PHP_EOL;
                $x = $p[0];
                $y = $p[1];
                $w = $p[2];
                $h = $p[3];
                $grid[] = new Rectangle(
                    left: $x,
                    top: $y,
                    right: $x + $w,
                    bottom: $y + $h
                );
            }
            
            $outputFolder = '../_output/';
            $filePath = 'D:/new/blake & mortimer/blake & mortimer 01 - the yellow m (2010, 3rd print)/' . $f->filename;
            $imageSpliter = new ImageSpliter($filePath);
            $imageSpliter->splitFile($grid, $outputFolder);
            $imageSpliter->freeMemory();
        }
    }


    /**
     * Hàm chính.
     */
    private function main(): void
    {
        if (!$this->checkDependencies()) {
            echo 'Bạn cần enable extension gd' . PHP_EOL;
            return;
        }
        
        // $this->processFolder();
        $this->processMultipleFiles();
    }
}


new Main();
