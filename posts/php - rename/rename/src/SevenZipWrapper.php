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
    public function extract7z($path, $rootFolder)
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
    public function extractNative($archive, $dir)
    {
        $extension = strtolower(pathinfo($archive, PATHINFO_EXTENSION));
        $filename = strtolower(pathinfo($archive, PATHINFO_FILENAME));
        switch ($extension) {
            case 'zip':
            case 'cbz':
                $this->extractZipArchive($archive, $filename, $dir);
                break;
            case 'rar':
            case 'cbr':
                $this->extractRarArchive($archive, $filename, $dir);
                break;
        }
    }

    /**
     * Giải nén file ZIP bằng PHP thuần.
     */
    private function extractZipArchive($archive, $filename, $dir)
    {
        $zip = new ZipArchive();
        if ($zip->open($archive)) {
            $numFiles = $zip->count();
            $hasFolder = false;
            for ($i = 0; $i < $numFiles; $i++) {
                $entry = $zip->getNameIndex($i);
                if (strpos($entry, '/') !== false || strpos($entry, '\\') !== false) {
                    $hasFolder = true;
                }
                echo $entry . PHP_EOL;
            }
            $destination = $dir . '/' . ($hasFolder ? '' : $filename);
            $zip->extractTo($destination);
            $zip->close();
        }
    }

    /**
     * Giải nén file RAR bằng PHP thuần.
     */
    private function extractRarArchive($archive, $filename, $dir)
    {
        $rar = RarArchive::open($archive);
        $entries = $rar->getEntries();
        $hasFolder = false;
        foreach ($entries as $entry) {
            if (strpos($entry, '/') !== false || strpos($entry, '\\') !== false) {
                $hasFolder = true;
            }
        }

        $destination = $dir . '/' . ($hasFolder ? '' : $filename);
        foreach ($entries as $entry) {
            echo $entry->getName()  . PHP_EOL;
            $entry->extract($destination);
        }
        $rar->close();
    }

    /**
     * Lấy danh sách tên các file trong archive.
     */
    public function getEntries($filePath)
    {
        // Thực hiện lệnh 7z
        $command = escapeshellcmd('7z l ' . escapeshellarg($filePath));
        exec($command, $a);
        $retval = [];

        // Tìm đến dòng bắt đầu và dòng kết thúc
        $startIndex;
        $endIndex;
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
    public function extractToFolder($filePath, $folder)
    {
        // Ở Ubuntu, để có thể extract file rar thì cần phải cài cả gói p7zip-rar
        // Có thể sử dụng tham số -y
        // Có thể dùng lệnh 'e' hoặc 'x'
        // $command = escapeshellcmd('7z x -bb3 ' . escapeshellarg($filePath) . ' -o* -y');
        $command = escapeshellcmd('7z x -bb3 ' . escapeshellarg($filePath) . ' -o' . escapeshellarg($folder));
        system($command);
    }

    /**
     * Nén file bằng 7z.
     */
    public function compress($folder, $archive)
    {
        $command = escapeshellcmd('7z a -bb ' . escapeshellarg($archive) . ' ' . escapeshellarg($folder));
        // echo $command . PHP_EOL;
        // 7z a -bsp1
        system($command);
    }
}
