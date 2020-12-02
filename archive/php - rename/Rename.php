<?php

/**
 * Liệt kê các file và thư mục con trong thư mục.
 */
function listFilesInDirectory($directoryPath)
{
    $files = array_diff(scandir($directoryPath), ['.', '..']);
    return $files;
}


/**
 * Nối đường dẫn
 */
function joinPath($base, $path)
{
    $temp = rtrim($base, '/') . '/' . ltrim($path, '/');
    return str_replace('\\', '/', $temp);
}


/**
 * Nén thư mục.
 */
function compressFolder($folder, $archive)
{
    $rootPath = realpath($folder);
    $zip = new ZipArchive();
    $zip->open($archive, ZipArchive::CREATE | ZipArchive::OVERWRITE);
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($rootPath),
        RecursiveIteratorIterator::LEAVES_ONLY
    );
    foreach ($files as $name => $file) {
        // Bỏ qua . và ..
        if (!$file->isDir()) {
            // echo $file . PHP_EOL;
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($rootPath) + 1);
            echo $relativePath . PHP_EOL;
            $zip->addFile($filePath, $relativePath);
        }
    }
    /*
    $zip->registerProgressCallback(0.05, function ($r) {
        printf("%d%%\n", $r * 100);
    });
    */
    $zip->close();
}


class Rename
{
    private $rootFolder;

    public function __construct($rootFolder)
    {
        $this->rootFolder = $rootFolder;
    }

    /**
     * Thêm prefix phía trước.
     */
    public function prefix($a, $prefix)
    {
        foreach ($a as $f) {
            $newName = $prefix . strtolower($f);
            $this->rename($f, $newName);
        }
    }

    /**
     * Thêm postfix phía sau.
     */
    public function postfix($a, $postfix)
    {
        foreach ($a as $f) {
            list($name, $ext) = $this->extractFileName($f);
            $newName = $name . $postfix . $ext;
            $this->rename($f, $newName);
        }
    }

    /**
     * Chuyển về chữ thường.
     */
    public function lowerCase($a)
    {
        foreach ($a as $f) {
            // Chú ý ký tự Unicode
            $newName = mb_strtolower($f);
            $this->rename($f, $newName);
        }
    }

    /**
     * Cắt bên trái một số ký tự.
     */
    public function leftTrim($a, $num)
    {
        foreach ($a as $f) {
            $newName = substr($f, $num);
            $this->rename($f, $newName);
        }
    }

    /**
     * Cắt bên phải một số ký tự.
     */
    public function rightTrim($a, $num)
    {
        foreach ($a as $f) {
            $relativePath = joinPath($this->rootFolder, $f);
            if (is_file($relativePath)) {
                list($name, $ext) = $this->extractFileName($f);
                $newName = substr($name, 0, strlen($name) - $num) . $ext;
            } else {
                $newName = substr($f, 0, strlen($f) - $num);
            }
            $this->rename($f, $newName);
        }
    }
    
    /**
     * Các file có cùng số ký tự.
     */
    public function fixLength($a, $num)
    {
        foreach ($a as $f) {
            $relativePath = joinPath($this->rootFolder, $f);
            if (is_file($relativePath)) {
                list($name, $ext) = $this->extractFileName($f);
                $newName = substr($name, 0, $num) . $ext;
            } else {
                $newName = substr($f, 0, $num);
            }
            $this->rename($f, $newName);
        }
    }

    /**
     * Sắp xếp file.
     */
    public function sortFile($a, $prefix)
    {
        natcasesort($a);

        $i = 0;
        foreach ($a as $f) {
            list($name, $ext) = $this->extractFileName($f);
            $newName = $prefix . substr('' . (1001 + $i), 1) . $ext;
            echo $f . ' -> ' . $newName . PHP_EOL;
            $this->rename($f, $newName);
            $i++;
        }
    }

    /**
     * Nén thư mục.
     */
    public function compress($a)
    {
        natcasesort($a);

        $compressor = new SevenZipWrapper();

        // $currentFolder = getcwd();
        chdir($this->rootFolder);

        foreach ($a as $f) {
            // $relativePath = joinPath($this->rootFolder, $f);
            $relativePath = $f;
            if (is_dir($relativePath)) {
                // echo $relativePath . PHP_EOL;
                // compressFolder($relativePath, $relativePath . '.zip');
                $compressor->compress($relativePath, $relativePath . '.zip');
            }
        }

        // chdir($currentFolder);
    }
    
    /**
     * Xử lý các chapter manga.
     */
    public function mangaChapter($a)
    {
        foreach ($a as $subFolder) {
            $relativePath = joinPath($this->rootFolder, $subFolder);
            if (is_dir($relativePath)) {
                $idx = strrpos($subFolder, ' ');
                $prefix = ($idx !== false ? substr($subFolder, $idx + 1) : $subFolder) . '-';
                $fileList = listFilesInDirectory($relativePath);

                natcasesort($fileList);

                // Sắp xếp và chuyển các file ra ngoài
                $i = 0;
                foreach ($fileList as $innerFile) {
                    list($name, $ext) = $this->extractFileName($innerFile);
                    $newName = $prefix . substr('' . (1001 + $i), 1) . $ext;
                    echo $subFolder . '/' . $innerFile . ' -> ' . $newName . PHP_EOL;
                    $this->rename($subFolder . '/' . $innerFile, $newName);
                    $i++;
                }
            }
        }
    }

    /**
     * Đổi tên đuôi mở rộng.
     */
    public function changeExtension($a, $oldExt, $newExt)
    {
        foreach ($a as $f) {
            $relativePath = joinPath($this->rootFolder, $f);
            if (is_file($relativePath)) {
                list($name, $ext) = $this->extractFileName($f);
                if ($ext == $oldExt) {
                    echo $name . PHP_EOL;
                    $newName = $name . $newExt;
                    $this->rename($f, $newName);
                }
            }
        }
    }
    
    /**
     * Thay thế các ký tự đặc biệt.
     * Thay thế ký tự gạch dưới "_" bằng ký tự dấu cách " ".
     * Thay thế ký tự hai chấm ":" bằng ký tự gạch ngang " - "
     * Loại bỏ ký tự do người dùng nhập.
     */
    public function removeCharacter($a, $other)
    {
        foreach ($a as $f) {
            $newName = str_replace('_', ' ', $f);
            $newName = str_replace(':', ' - ', $newName);
            $newName = str_replace('!', '', $newName);
            if (!empty($other)) {
                $newName = str_replace($other, '', $newName);
            }
            $this->rename($f, $newName);
        }
    }
    
    public function extractFiles($a)
    {
        $extractor = new SevenZipWrapper();
        foreach ($a as $f) {
            list($name, $ext) = $this->extractFileName($f);
            if (in_array(substr($ext, 1), ['zip', 'rar', 'cbz', 'cbr'])) {
                $path = joinPath($this->rootFolder, $f);
                $extractor->extract7z($path, $this->rootFolder);
            }
        }
    }
    
    /**
     * Lấy tên file, không bao gồm đuôi mở rộng.
     */
    private function extractFileName($fullName)
    {
        $idx = strrpos($fullName, '.');
        $name = substr($fullName, 0, $idx);
        $ext = strtolower(substr($fullName, $idx));
        return [
            $name,
            $ext
        ];
    }
    
    /**
     * Đổi tên file.
     */
    private function rename($f, $newName)
    {
        rename(
            joinPath($this->rootFolder, $f),
            joinPath($this->rootFolder, $newName)
        );
    }
}


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
    public function extract7z($path, $rootFolder)
    {
        $entries = $this->getEntries($path);
        // print_r($entries);
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

    public function extractNative($archive, $dir)
    {
        $extension = strtolower(pathinfo($archive, PATHINFO_EXTENSION));
        $filename = strtolower(pathinfo($archive, PATHINFO_FILENAME));
        // echo $filename . ', ' . $ext . PHP_EOL;
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
     * Giải nén file ZIP.
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
     * Giải nén file RAR.
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
        // echo $startIndex . ', ' . $endIndex . PHP_EOL;

        // Trích xuất dữ liệu
        $pattern = '/^\S+\s+\S+\s+\S+\s+\S+\s+\S+\s+(\S.*)$/';
        for ($i = $startIndex; $i <= $endIndex; $i++) {
            $s = $a[$i];
            // $tmp = explode(' ', $a[$i]);
            // print_r($tmp);
            // echo  . PHP_EOL;
            if (preg_match($pattern, $s, $matches)) {
                $file = $matches[1];
                // echo $file . PHP_EOL;
                array_push($retval, $file);
            }
        }

        sort($retval);
        return $retval;
    }

    /**
     * Giải nén đến thư mục.
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
     * Nén file.
     */
    public function compress($folder, $archive)
    {
        $command = '7z a -bb ' . escapeshellarg($archive) . ' ' . escapeshellarg($folder);
        // 7z a -bsp1
        // tar cvf

        system($command);

        /*
        $descriptorspec = [
            0 => ['pipe', 'r'],  // stdin is a pipe that the child will read from
            1 => ['pipe', 'w'],  // stdout is a pipe that the child will write to
            2 => ['pipe', 'w']  // stderr is a pipe to write to
            // 2 => ['file', 'error-output.txt', 'a'] // stderr is a file to write to
        ];

        $process = proc_open($command, $descriptorspec, $pipes);

        if (is_resource($process)) {
            while (!feof($pipes[1])) {
                echo fgets($pipes[1]);
            }
            fclose($pipes[1]);
            proc_close($process);
        }
        */
    }
}


if (count($argv) < 3) {
    echo 'Ban phai nhap it nhat 2 tham so' . PHP_EOL;
} else {
    $command = $argv[1];
    $rootFolder = $argv[2];
    $a = listFilesInDirectory($rootFolder);
    $rename = new Rename($rootFolder);

    if ($command == 'lc') {
        $rename->lowerCase($a);
    } elseif ($command == 'pr') {
        $rename->prefix($a, $argv[3]);
    } elseif ($command == 'pt') {
        $rename->postfix($a, $argv[3]);
    } elseif ($command == 'lt') {
        $rename->leftTrim($a, intval($argv[3]));
    } elseif ($command == 'rt') {
        $rename->rightTrim($a, intval($argv[3]));
    } elseif ($command == 'fl') {
        $rename->fixLength($a, intval($argv[3]));
    } elseif ($command == 'sf') {
        $rename->sortFile($a, count($argv) > 3 ? $argv[3] : '');
    } elseif ($command == 'z') {
        $rename->compress($a);
    } elseif ($command == 'mc') {
        $rename->mangaChapter($a);
    } elseif ($command == 'et') {
        $rename->changeExtension($a, '.' . strtolower($argv[3]), '.' . strtolower($argv[4]));
    } elseif ($command == 'rc') {
        $rename->removeCharacter($a, count($argv) > 3 ? $argv[3] : '');
    } elseif ($command == 'x') {
        $rename->extractFiles($a);
    } else {
        echo 'Invalid command' . PHP_EOL;
    }
}
