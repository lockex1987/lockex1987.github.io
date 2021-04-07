<?php

include 'vendor/autoload.php';
include 'dhash.php';

use Jenssegers\ImageHash\ImageHash;
use Jenssegers\ImageHash\Implementations\DifferenceHash;
use Jenssegers\ImageHash\Implementations\AverageHash;


/**
 * Class xử lý core.
 */
class Finder
{
    private ImageHash $hasher;

    public function __construct()
    {
        $implement = new DifferenceHash();
        // $implement = new AverageHash();
        $this->hasher = new ImageHash($implement);
    }

    /**
     * Gọi đệ quy, lấy danh sách file ảnh trong thư mục.
     * @param string $folderPath Đường dẫn thư mục
     * @return array Danh sách đường dẫn ảnh
     */
    public function scanImagesInFolder(string $folderPath): array
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
                    $ext = strtolower(pathinfo($relativePath, PATHINFO_EXTENSION));
                    if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif'])) {
                        $images[] = $relativePath;
                    }
                }
            }
        }
        return $images;
    }

    /**
     * Tính toán hash của ảnh.
     * @param array $images Danh sách đường dẫn ảnh
     * @return array Mảng các phần tử gồm có path và hash
     */
    public function calculateHash(array $images): array
    {
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
        return $hashes;
    }

    /**
     * Tìm các ảnh trùng nhau.
     * @param array $hashes Danh sách các phần tử gồm có hash và path
     * @return array Mảng có key là ảnh và value là các ảnh trùng với ảnh đó
     */
    public function findDuplicateImages(array $hashes): array
    {
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
        return $duplicates;
    }

    /**
     * So sánh hash của hai ảnh.
     */
    public function compareHash(string $path1, string $path2): void
    {
        $hash1 = $this->hasher->hash($path1);
        $hash2 = $this->hasher->hash($path2);
        $distance = $this->hasher->distance($hash1, $hash2);
        echo $path1 . ', ' . $path2 . ': ' . $distance . PHP_EOL;
    }
}


/**
 * Class thực thi.
 */
class Main
{
    // Đường dẫn file JSON chứa hash và path
    private string $jsonFile = '../data/hashes.json';

    /**
     * Tính toán hash.
     */
    function calculateHash(string $folderPath): void
    {
        $startTime = microtime(true);
        $finder = new Finder();
        $normalizedPath = rtrim($folderPath, '/') . '/';
        $images = $finder->scanImagesInFolder($normalizedPath);
        $endTime = microtime(true);
        echo 'Tìm thấy ' . count($images) . ' ảnh sau ' . ($endTime - $startTime) . ' giây' . PHP_EOL; // 0.18224501609802

        $startTime = microtime(true);
        $hashes = $finder->calculateHash($images);
        $data = json_encode($hashes);
        file_put_contents($this->jsonFile, $data);
        $endTime = microtime(true);
        echo 'Tính toán hash trong ' . ($endTime - $startTime) . ' giây' . PHP_EOL; // 863.96802020073
    }

    /**
     * Tìm các ảnh trùng.
     */
    function findDuplicateImages(): void
    {
        $startTime = microtime(true);
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
        $endTime = microtime(true);
        echo 'Tìm các ảnh trùng trong ' . ($endTime - $startTime) . ' giây' . PHP_EOL; // 15.619441986084
    }

    /**
     * Kiểm tra.
     */
    function test(): void
    {
        $finder = new Finder();
        $finder->compareHash('D:/archive/last comani/yugioh color (end 343)/322/322-018.jpg', 'D:/archive/last comani/yugioh color (end 343)/323/323-020.jpg');
        $finder->compareHash('D:/archive/last comani/yugioh color (end 343)/329/329-025.jpg', 'D:/archive/last comani/yugioh color (end 343)/334/334-020.jpg');
        $finder->compareHash('D:/archive/last comani/yugioh color (end 343)/322/322-018.jpg', 'D:/archive/last comani/yugioh color (end 343)/329/329-025.jpg');
    }
}


$folderPath = 'D:/archive/last comani/dragon ball color';
$main = new Main();
// $main->calculateHash($folderPath);
$main->findDuplicateImages();
// $main->test();
