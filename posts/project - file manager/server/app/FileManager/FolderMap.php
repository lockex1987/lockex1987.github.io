<?php

namespace Cttd\FileManager;

use DirectoryIterator;

class FolderMap
{
    // Các thư mục hệ thống, không hiển thị cho người dùng
    private const HIDDEN_FOLDERS = [
        '.',
        '..',
        'lost+found',
        '.Trash-1000',
        'System Volume Information',
        '$RECYCLE.BIN'
    ];

    public array $folderMap = [];

    public function __construct()
    {
        $startTime = microtime(true);
        $rootPath = 'D:/program';
        $this->scanFolder(ROOT_FOLDER); // $rootPath
        $endTime = microtime(true);
        /*
        foreach ($this->folderMap as $k => $v) {
            echo $k . PHP_EOL;
        }
        */
        echo 'Scan folder trong ' . ($endTime - $startTime) . ' giây' . PHP_EOL; // 863.96802020073
    }

    private function scanFolder(string $folder): int
    {
        $result = [];
        foreach (new DirectoryIterator($folder) as $fileInfo) {
            if ($fileInfo->isDot()) {
                continue;
            }

            $f = $fileInfo->getFilename();
            if (!in_array($f, self::HIDDEN_FOLDERS)) {
                $isDir = $fileInfo->isDir();
                $item = [
                    'name' => $f,
                    'isDir' => $isDir,
                    'size' => $isDir ? null : $fileInfo->getSize()
                ];
                if ($isDir) {
                    $folderSize = $this->scanFolder($folder . '/' . $f);
                    $item['size'] = $folderSize;
                }
                array_push($result, $item);
            }
        }

        $this->folderMap[str_replace(ROOT_FOLDER, '', $folder) . '/'] = $result;
        return count($result);
    }

    public function listFolder(string $folder): array
    {
        if (isset($this->folderMap[$folder])) {
            return $this->folderMap[$folder];
        }
        return [];
    }
}
