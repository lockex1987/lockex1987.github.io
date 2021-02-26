<?php

/*
Thao tác với file zip, rar bằng lệnh 7z.
7z a nail.zip "Nailbiter Returns 01"
7z e nail.zip
7z x nail.zip
7z x nail.zip -oC:\Doc
7z l nail.zip
7z l transformers.cbr
*/
class SevenZipWrapper
{
    /**
     * Giải nén file bằng 7z.
     */
    public function extract7z(string $path, string $rootFolder): void
    {
        $entries = $this->getEntries($path);
        $hasFolder = false;
        foreach ($entries as $entry) {
            if (strpos($entry, '/') !== false || strpos($entry, '\\') !== false) {
                $hasFolder = true;
            }
        }
        if ($hasFolder) {
            $folder = $rootFolder;
        } else {
            $folder = substr($path, 0, strlen($path) - 4);
        }
        $this->extractToFolder($path, $folder);
    }

    /**
     * Giải nén file bằng PHP thuần.
     */
    public function extractNative(string $archivePath, string $extractFolder): void
    {
        // $extension = substr($archivePath, strrpos($archivePath, '.') - strlen($archivePath) + 1);
        $extension = strtolower(pathinfo($archivePath, PATHINFO_EXTENSION));
        $filename = strtolower(pathinfo($archivePath, PATHINFO_FILENAME));
        switch ($extension) {
            case 'zip':
            case 'cbz':
                $this->extractZipArchive($archivePath, $filename, $extractFolder);
                break;
            case 'rar':
            case 'cbr':
                $this->extractRarArchive($archivePath, $filename, $extractFolder);
                break;
        }
    }

    /**
     * Giải nén file ZIP bằng PHP thuần.
     */
    private function extractZipArchive(string $archivePath, string $archiveName, string $extractFolder): void
    {
        $archiveFile = new ZipArchive();
        if ($archiveFile->open($archivePath)) {
            $numFiles = $archiveFile->count();
            $hasFolder = false;
            for ($i = 0; $i < $numFiles; $i++) {
                $entry = $archiveFile->getNameIndex($i);
                if (strpos($entry, '/') !== false || strpos($entry, '\\') !== false) {
                    $hasFolder = true;
                }
                echo $entry . PHP_EOL;
            }

            $destination = $extractFolder . '/' . ($hasFolder ? '' : $archiveName);
            $archiveFile->extractTo($destination);
            $archiveFile->close();
        }
    }

    /**
     * Giải nén file RAR bằng PHP thuần.
     */
    private function extractRarArchive(string $archivePath, string $archiveName, string $extractFolder): void
    {
        $archiveFile = RarArchive::open($archivePath);
        if ($archiveFile === false) {
            die('Cannot open ' . $archivePath);
        }

        $entries = $archiveFile->getEntries();
        if ($entries === false) {
            die('Cannot retrieve entries');
        }

        $hasFolder = false;
        foreach ($entries as $entry) {
            if (strpos($entry, '/') !== false || strpos($entry, '\\') !== false) {
                $hasFolder = true;
            }
        }

        $destination = $extractFolder . '/' . ($hasFolder ? '' : $archiveName);
        foreach ($entries as $entry) {
            echo $entry->getName()  . PHP_EOL;
            // echo 'Packed size: ' . $entry->getPackedSize() . PHP_EOL;
            // echo 'Unpacked size: ' . $entry->getUnpackedSize() . PHP_EOL;
            $entry->extract($destination);
        }

        $archiveFile->close();
    }

    /**
     * Lấy danh sách tên các file trong archive.
     */
    public function getEntries(string $filePath): array
    {
        // Thực hiện lệnh 7z
        // $command = escapeshellcmd('7z l ' . escapeshellarg($filePath)); // thực hiện trên Windows
        $command = '7z l ' . escapeshellarg($filePath); // thực hiện trên Ubuntu
        exec($command, $a);
        $retval = [];

        // Tìm đến dòng bắt đầu và dòng kết thúc
        $i = 0;
        while (strpos($a[$i], '-------------------') === false) {
            $i++;
        }
        $startIndex = $i + 1;
        $i++;
        while (strpos($a[$i], '-------------------') === false) {
            $i++;
        }
        $endIndex = $i - 1;

        // Trích xuất dữ liệu
        $pattern = '/^\S+\s+\S+\s+\S+\s+\S+\s+\S+\s+(\S.*)$/';
        for ($i = $startIndex; $i <= $endIndex; $i++) {
            $s = $a[$i];
            if (preg_match($pattern, $s, $matches)) {
                $file = $matches[1];
                array_push($retval, $file);
            }
        }

        sort($retval);
        return $retval;
    }

    /**
     * Giải nén đến thư mục bằng 7z.
     */
    public function extractToFolder(string $filePath, string $folder): void
    {
        // Ở Ubuntu, để có thể extract file rar thì cần phải cài cả gói p7zip-rar
        // Có thể sử dụng tham số -y
        // Có thể dùng lệnh 'e' hoặc 'x'
        // $command = escapeshellcmd('7z x -bb3 ' . escapeshellarg($filePath) . ' -o* -y');
        // $command = escapeshellcmd('7z x -bb3 ' . escapeshellarg($filePath) . ' -o' . escapeshellarg($folder)); // thực hiện trên Windows
        $command = '7z x -bb3 ' . escapeshellarg($filePath) . ' -o' . escapeshellarg($folder); // thực hiện trên Ubuntu
        system($command);
    }

    /**
     * Nén file bằng 7z.
     */
    public function compress7z(string $folder, string $archive): void
    {
        // $command = escapeshellcmd('7z a -bb3 ' . escapeshellarg($archive) . ' ' . escapeshellarg($folder)); // thực hiện trên Windows
        $command = '7z a -bb3 ' . escapeshellarg($archive) . ' ' . escapeshellarg($folder); // thực hiện trên Ubuntu
        system($command);
    }

    /**
     * Nén thư mục.
     */
    public function compressFolder(string $compressFolder, string $archivePath): void
    {
        echo $compressFolder . PHP_EOL;
        $rootPath = realpath($compressFolder);
        $archiveFile = new ZipArchive();
        $archiveFile->open($archivePath, ZipArchive::CREATE | ZipArchive::OVERWRITE);
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($rootPath),
            RecursiveIteratorIterator::LEAVES_ONLY
        );
        foreach ($files as $name => $file) {
            // Bỏ qua . và ..
            if (!$file->isDir()) {
                $realPath = $file->getRealPath();
                $relativePath = substr($realPath, strlen($rootPath) + 1);
                // echo $relativePath . PHP_EOL;
                $archiveFile->addFile($realPath, $relativePath);
            }
        }

        // PHP 8 có hàm này
        $archiveFile->registerProgressCallback(0.05, function ($r) {
            $percent = round($r * 100);
            // Hiển thị tiến độ trên một dòng
            // https://www.hashbangcode.com/article/overwriting-command-line-output-php
            echo chr(27) . '[0G';
            echo $percent . '%';
            if ($percent == 95) {
                echo PHP_EOL;
            }
        });

        $archiveFile->close();
    }
}
