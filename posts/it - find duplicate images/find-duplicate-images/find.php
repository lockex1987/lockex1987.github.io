<?php

include 'vendor/autoload.php';
include 'dhash.php';

use Jenssegers\ImageHash\ImageHash;
use Jenssegers\ImageHash\Implementations\DifferenceHash;
use Jenssegers\ImageHash\Implementations\AverageHash;


class Finder
{
    private ImageHash $hasher;

    public function __construct()
    {
        $implement = new DifferenceHash();
        // $implement = new AverageHash();
        $this->hasher = new ImageHash($implement);
    }

    private function scanImagesInFolder(string $folderPath): array
    {
        $files = scandir($folderPath);
        $images = [];
        foreach ($files as $f) {
            if (!in_array($f, ['.', '..'])) {
                $relativePath = $folderPath . $f;
                if (is_dir($relativePath)) {
                    $subResult = $this->scanImagesInFolder($relativePath . '/');
                    $images = array_merge($images, $subResult);
                } else {
                    // Kiểm tra là file ảnh
                    $images[] = $relativePath;
                }
            }
        }
        return $images;
    }

    public function calculateHash(string $folderPath): array
    {
        $startTime = microtime(true);
        $normalizedPath = rtrim($folderPath, '/') . '/';
        $images = $this->scanImagesInFolder($normalizedPath);
        $hasher = $this->hasher;
        $hashes = array_map(function ($path) use ($hasher) {
            $hash = 1;
            try {
                $hash = $hasher->hash($path);
                // $hash = dhash($path);
            } catch(Exception $ex) {
                echo 'Message: ' .$ex->getMessage() . PHP_EOL;
                echo $path . PHP_EOL;
            }
            $obj = new stdClass();
            $obj->path = $path;
            $obj->hash = $hash;
            return $obj;
        }, $images);
        $endTime = microtime(true);
        echo 'Calculate finish after ' . ($endTime - $startTime) . 's' . PHP_EOL;
        return $hashes;
    }

    public function findDuplicateImages(array $hashes): array
    {
        $startTime = microtime(true);
        foreach ($hashes as $e) {
            $e->isDuplicated = false;
        }
        $duplicates = [];
        $count = count($hashes);
        for ($idx1 = 0; $idx1 < $count - 1; $idx1++) {
            for ($idx2 = $idx1 + 1; $idx2 < $count; $idx2++) {
                if (!$hashes[$idx2]->isDuplicated) {
                    $distance = $this->hasher->distance($hashes[$idx1]->hash, $hashes[$idx2]->hash);
                    // $distance = dhash_distance($hashes[$idx1]->hash, $hashes[$idx2]->hash);
                    $threshold = 7;
                    if ($distance <= $threshold) {
                        // Đánh dấu để không xét lại nữa
                        $hashes[$idx2]->isDuplicated = true;

                        // echo 'Duplicated' . PHP_EOL;
                        $path1 = $hashes[$idx1]->path;
                        $path2 = $hashes[$idx2]->path;
                        if (empty($duplicates[$path1])) {
                            $duplicates[$path1] = [
                                $path2
                            ];
                        } else {
                            $duplicates[$path1][] = $path2;
                        }
                    }
                }
            }
        }
        $endTime = microtime(true);
        echo 'Find finish after ' . ($endTime - $startTime) . 's' . PHP_EOL;
        return $duplicates;
    }

    public function compareHash(string $path1, string $path2): void
    {
        $hash1 = $this->hasher->hash($path1);
        $hash2 = $this->hasher->hash($path2);
        $distance = $this->hasher->distance($hash1, $hash2);
        echo $path1 . ', ' . $path2 . ': ' . $distance . PHP_EOL;
    }
}


class Main
{
    private string $jsonFile = '../data/hashes.json';

    function calculateHash(string $folderPath): void
    {
        $finder = new Finder();
        $hashes = $finder->calculateHash($folderPath);
        $data = json_encode($hashes);
        file_put_contents($this->jsonFile, $data);
    }

    function findDuplicateImages(): void
    {
        $finder = new Finder();
        $data = file_get_contents($this->jsonFile);
        $hashes = json_decode($data);
        $duplicates = $finder->findDuplicateImages($hashes); // sử dụng BKtree?
        $list = [];
        foreach ($duplicates as $key => $arr) {
            array_unshift($arr, $key);
            $list[] = $arr;
        }
        // print_r($list);
        $data = json_encode($list);
        file_put_contents('../data/duplicates.json', $data);
    }

    function test(): void
    {
        $finder = new Finder();
        $finder->compareHash('D:/archive/last comani/yugioh color (end 343)/322/322-018.jpg', 'D:/archive/last comani/yugioh color (end 343)/323/323-020.jpg');
        $finder->compareHash('D:/archive/last comani/yugioh color (end 343)/329/329-025.jpg', 'D:/archive/last comani/yugioh color (end 343)/334/334-020.jpg');
        $finder->compareHash('D:/archive/last comani/yugioh color (end 343)/322/322-018.jpg', 'D:/archive/last comani/yugioh color (end 343)/329/329-025.jpg');
    }
}


$main = new Main();
// $main->calculateHash('D:/archive/last comani/thien long bat bo');
$main->findDuplicateImages();
// $main->test();
