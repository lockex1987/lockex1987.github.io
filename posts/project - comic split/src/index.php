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
    function processSingleFile(string $filePath): void
    {
        echo $filePath . PHP_EOL;
        $outputFolder = '../_output/';
        $imageSpliter = new ImageSpliter($filePath);
        $grid = $imageSpliter->splitImageToGrid();
        $imageSpliter->splitFile($grid, $outputFolder);
        $imageSpliter->freeMemory();
    }


    /**
     * Xử lý cả folder nhiều ảnh.
     */
    function processFolder(string $folder): void
    {
        $files = scandir($folder);
        foreach ($files as $f) {
            if (!in_array($f, ['.', '..'])) {
                $filePath = $folder . DIRECTORY_SEPARATOR . $f;
                if (is_file($filePath)) {
                    $this->processSingleFile($filePath);
                }
            }
        }
    }


    /**
     * Kiểm tra các phụ thuộc.
     * Chương trình phụ thuộc extension gd của PHP.
     * Cần đảm bảo extension này được enable ở file php.ini.
     */
    function checkDependencies()
    {
        if (!extension_loaded('gd')) {
            return false;
        }
        return true;
    }


    /**
     * Hàm chính.
     */
    function main(): void
    {
        if (!$this->checkDependencies()) {
            echo 'Bạn cần enable extension gd' . PHP_EOL;
            return;
        }

        $arr = [
            '../images/has-heading.jpg',
            '../images/has-row-span.jpg',
            '../data-files/001.jpg',
            '../data-files/004.jpg',
            '../data-files/005.jpg',
            '../data-files/006.jpg',
            '../data-files/011.jpg',
            '../data-files/018.jpg',
        ];
        foreach ($arr as $filePath) {
            // $this->processSingleFile($filePath);
        }

        $folder = '../data-files';
        $this->processFolder($folder);
    }
}


new Main();
