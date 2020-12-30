<?php

class Rename
{
    // Đường dẫn thư mục gốc
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
            $relativePath = CommonUtils::joinPath($this->rootFolder, $f);
            if (is_file(realpath($relativePath))) {
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
            $relativePath = CommonUtils::joinPath($this->rootFolder, $f);
            if (is_file(realpath($relativePath))) {
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

        chdir($this->rootFolder);

        foreach ($a as $f) {
            if (is_dir(realpath($f))) {
                $compressor->compress($f, $f . '.zip');
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
            $relativePath = CommonUtils::joinPath($this->rootFolder, $subFolder);
            if (is_dir(realpath($relativePath))) {
                $idx = strrpos($subFolder, ' ');
                $prefix = ($idx !== false ? substr($subFolder, $idx + 1) : $subFolder) . '-';
                $fileList = CommonUtils::listFilesInDirectory($relativePath);

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
            $relativePath = CommonUtils::joinPath($this->rootFolder, $f);
            if (is_file(realpath($relativePath))) {
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
            $extWithoutDot = substr($ext, 1);
            if (in_array($extWithoutDot, ['zip', 'rar', 'cbz', 'cbr'])) {
                $path = CommonUtils::joinPath($this->rootFolder, $f);
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
            CommonUtils::joinPath($this->rootFolder, $f),
            CommonUtils::joinPath($this->rootFolder, $newName)
        );
    }
}
