<?php

namespace Cttd\FileManager;


class FileManager
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

    /**
     * Liệt kê thư mục.
     */
    public static function listFolder(string $folder): array
    {
        // Đọc các file trong thư mục và đẩy vào mảng
        $files = scandir($folder);

        // Danh sách kết quả
        $result = [];
        foreach ($files as $f) {
            if (!in_array($f, self::HIDDEN_FOLDERS)) {
                $absPath = $folder . $f;
                $isDir = is_dir($absPath);
                array_push($result, [
                    'name' => $f,
                    'isDir' => $isDir,
                    'size' => $isDir ? count(array_diff(scandir($absPath), ['.', '..'])) : filesize($absPath), // dung lượng file, tính theo byte (B)
                    // 'url' => '/data-drive/' . $absPath
                    'isTextFile' => $isDir ? false : CommonUtils::isTextFile($absPath)
                    // 'mime' => $isDir ? 'folder' : mime_content_type($absPath)
                ]);
            }
        }
        return $result;
    }


    /**
     * Copy file hoặc folder.
     */
    public static function copy(string $oldPath, string $newPath): bool
    {
        if (is_dir($oldPath)) {
            return self::copyFolder($oldPath, $newPath);
        } else {
            return self::copyFile($oldPath, $newPath);
        }
    }


    /**
     * Copy file.
     */
    public static function copyFile(string $oldPath, string $newPath): bool
    {
        return copy($oldPath, $newPath);
    }


    /**
     * Copy folder.
     */
    public static function copyFolder(string $oldPath, string $newPath): bool
    {
        $hasError = false;

        // Tạo thư mục đích nếu chưa có
        if (!file_exists($newPath)) {
            if (!mkdir($newPath)) {
                $hasError = true;
            }
        }

        if ($hasError) {
            return false;
        }

        $a = array_diff(scandir($oldPath), ['.', '..']);
        foreach ($a as $f) {
            $absPath = $oldPath . $f;
            $isDir = is_dir($absPath);
            if ($isDir) {
                $result = self::copyFolder($oldPath . '/' . $f, $newPath . '/' . $f);
            } else {
                $result = copy($oldPath . '/' . $f, $newPath . '/' . $f);
            }
            if (!$result) {
                $hasError = true;
            }
        }

        if ($hasError) {
            return false;
        }

        return true;
    }


    /**
     * Move / rename file.
     * Áp dụng luôn được với folder.
     */
    public static function move(string $oldPath, string $newPath): bool
    {
        return rename($oldPath, $newPath);
    }


    /**
     * Xóa file hoặc folder.
     */
    public static function delete(string $path): bool
    {
        if (is_dir($path)) {
            return self::deleteFolder($path . '/');
        } else {
            return self::deleteFile($path);
        }
    }


    /**
     * Xóa file.
     */
    public static function deleteFile(string $filePath): bool
    {
        return unlink($filePath);
    }


    /**
     * Xóa thư mục.
     */
    public static function deleteFolder($folder): bool
    {
        $a = array_diff(scandir($folder), ['.', '..']);
        foreach ($a as $f) {
            $absPath = $folder . $f;
            $isDir = is_dir($absPath);
            if ($isDir) {
                $result = self::deleteFolder($absPath . '/');
            } else {
                $result = unlink($absPath);
            }
            if (!$result) {
                return false;
            }
        }
        return rmdir($folder);
    }
}
