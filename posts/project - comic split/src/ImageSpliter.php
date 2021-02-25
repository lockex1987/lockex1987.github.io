<?php

class ImageSpliter
{
    // Đối tượng ảnh
    private GdImage $img;

    // Đường dẫn ảnh
    private string $inputPath;

    // Đuôi mở rộng của ảnh
    private string $ext;

    // Thư mục chứa các ảnh được cắt ra output
    private string $outputFolder = '_output/';

    public function __construct(string $inputPath)
    {
        $this->inputPath = $inputPath;
        $this->ext = $this->getFileExtension($this->inputPath);
        $this->img = $this->getImageFromPath($this->inputPath, $this->ext);

        $this->checkOutputFolder();
        $grid = $this->splitImageToGrid();
        $this->splitFile($grid);

        // Giải phóng bộ nhớ
        imagedestroy($this->img);
    }

    /**
     * Chia ảnh thành các hàng.
     * @return {array} Mảng các hàng, mỗi hàng là mảng bao gồm { left, top, right, bottom }
     */
    private function getAllRows(): array
    {
        $width = imagesx($this->img);
        $height = imagesy($this->img);
        $rows = [];
        $left = 0; // có thể bỏ qua 1 số pixel ở bên trái, cho nhanh hoặc do scan lỗi (bị đen ở bên trái hoặc phải)
        $y1 = 0; // có thể bỏ qua 1 số dòng đầu ở đây để tăng tốc độ
        $right = $width - 1; // có thể bỏ qua một số pixel ở bên phải
        $bottom = $height - 1;
        while (true) {
            [$y1, $y2] = $this->getTopMostRow($left, $y1, $right, $bottom);
            if ($y1 == -1) {
                // Không có hàng nào
                break;
            }
            $rows[] = [
                'left' => $left,
                'top' => $y1,
                'right' => $right,
                'bottom' => $y2
            ];
            // Di chuyển xuống dưới 5px (tăng tốc độ nhưng vẫn đảm bảo không vào row mới)
            $y1 = $y2 + 5;
        }
        return $rows;
    }


    /**
     * Lấy các frame của một hàng.
     * Lấy ra danh sách các cột của dòng (giới hạn bởi row_top và row_bottom).
     * @param $left {int} Tạo độ bên trái
     * @param $top {int} Tạo độ bên trên
     * @param $right {int} Tạo độ bên phải
     * @param $bottom {int} Tạo độ bên dưới
     * @return {array} Mảng các frame của hàng, mỗi frame gồm { left, top, right, bottom }
     */
    private function getAllFramesOfRow(int $left, int $top, int $right, int $bottom): array
    {
        $frames = [];
        $x1 = $left;
        while (true) {
            // Chú ý trường hợp heading
            [$x1, $x2] = $this->getLeftMostFrame($x1, $top, $right, $bottom);
            if ($x1 == -1) {
                // Không có cột nào
                break;
            }
            $frames[] = [
                'left' => $x1,
                'top' => $top,
                'right' => $x2,
                'bottom' => $bottom
            ];
            // Di chuyển sang trái 5px (cho nhanh), nhưng vẫn đảm bảo chưa sang ô khác
            $x1 = $x2 + 5;
        }
        return $frames;
    }


    /**
     * Trả về hàng đầu tiên (từ trên xuống).
     * Lấy ra hàng đầu tiên trong vùng (LEFT, TOP, RIGHT, BOTTOM).
     * Trả về mảng, phần tử thứ nhất là chỉ số dòng trên, phần tử thứ hai là chỉ số dòng dưới.
     * Trả về tuple (điểm bắt đầu hàng, điểm kết thúc hàng), hoặc (-1, -1) nếu không tìm thấy.
     * We don't use page members directly 'coz this function is called to further refine each frame's top and bottom boundaries.
     * @param $left {int} Tọa độ bên trái
     * @param $top {int} Tạo độ bên trên
     * @param $right {int} Tạo độ bên phải
     * @param $bottom {int} Tạo độ bên dưới
     * @return {array} Mảng tọa độ $y1 phía trên và $y2 phía dưới
     */
    private function getTopMostRow(int $left, int $top, int $right, int $bottom): array
    {
        if ($top >= $bottom) {
            return [-1, -1];
        }

        // Tìm dòng trên
        // Tìm điểm bắt đầu hàng
        $y1 = $top;

        // Di chuyển xuống dưới khi dòng vẫn là gutter
        while ($y1 < $bottom && $this->isGutterRow($y1, $left, $right)) {
            $y1++;
        }

        if ($y1 == $bottom) {
            return [-1, -1];
        }

        // Chiều cao tối thiểu của một frame
        $minFrameHeight = 100;

        // Tìm dòng dưới
        // Tìm điểm kết thúc của hàng
        $y2 = $y1 + $minFrameHeight;

        if ($y2 > $bottom) {
            return [-1, -1];
        }

        // Di chuyển xuống dưới khi vẫn đang trong ô (không phải là gutter)
        while ($y2 < $bottom && !$this->isGutterRow($y2, $left, $right)) {
            $y2++;
        }

        if ($y2 - $y1 < $minFrameHeight) {
            return [-1, -1];
        }

        return [$y1, $y2];
    }


    /**
     * Lấy vị trí ngoài cùng bên trái.
     * Trả về cột đầu tiên trong vùng (LEFT, TOP, RIGHT, BOTTOM).
     * Trả về tuple (điểm bắt đầu ô, điểm kết thúc ô) hoặc (-1, -1) nếu không tìm thấy ô.
     * @param $left {int} Tọa độ bên trái
     * @param $top {int} Tạo độ bên trên
     * @param $right {int} Tạo độ bên phải
     * @param $bottom {int} Tạo độ bên dưới
     * @return {array} Tạo độ frame ngoài cùng bên trái gồm $x1 bên trái và $x2 bên phải
     */
    private function getLeftMostFrame(int $left, int $top, int $right, int $bottom): array
    {
        // Tìm cột bên trái
        // Tìm điểm bắt đầu ô
        $x1 = $left;

        // Di chuyển sang phải khi cột vẫn là gutter
        while ($x1 < $right && $this->isGutterColumn($x1, $top, $bottom)) {
            $x1++;
        }
        if ($x1 >= $right) {
            return [-1, -1];
        }

        // Chiều rộng tối thiểu của một ô
        $minFrameWidth = 150;

        // Tìm cột bên phải
        // Tìm điểm kết thúc ô
        $x2 = $x1 + $minFrameWidth;

        if ($x2 > $right) {
            return [-1, -1];
        }

        // Di chuyển sang phải khi vẫn đang trong ô (không phải là gutter)
        while ($x2 < $right && !$this->isGutterColumn($x2, $top, $bottom)) {
            $x2++;
        }
        
        if ($x2 - $x1 < $minFrameWidth) {
            return [-1, -1];
        }

        return [$x1, $x2];
    }


    /**
     * Dòng có phải là dòng trắng hay không.
     * Kiểm tra xem dòng [left, right) ở vị trí y_cord cắt sang có phải là gutter không.
     * @param $row {int} Hàng
     */
    private function isGutterRow(int $row, int $left, int $right): bool
    {
        for ($col = $left; $col <= $right; $col++) {
            if (!$this->isWhitePixel($col, $row)) {
                return false;
            }
        }
        return true;
    }


    /**
     * Có phải là cột trắng hay không.
     * Kiểm tra xem cột [top, bot) ở vị trí x_cord trỏ xuống có phải là gutter không.
     * @param $col {int} Cột
     */
    private function isGutterColumn(int $col, int $top, int $bottom): bool
    {
        for ($row = $top; $row <= $bottom; $row++) {
            if (!$this->isWhitePixel($col, $row)) {
                return false;
            }
        }
        return true;
    }


    /**
     * Kiểm tra xem điểm ảnh có phải là màu trắng hay không.
     * @param $col {int} Cột
     * @param $row {int} Hàng
     * @return {bool} true nếu là điểm ảnh màu trắng
     */
    private function isWhitePixel(int $col, int $row): bool
    {
        $colorIndex = imagecolorat($this->img, $col, $row);
        $a = imagecolorsforindex($this->img, $colorIndex);

        $red = $a['red'];
        $green = $a['green'];
        $blue = $a['blue'];

        return $this->isWhiteColor($red, $green, $blue);
    }

    /**
     * Thuật toán quyết định màu trắng.
     * @param {Integer} $red Chỉ số đỏ
     * @param {Integer} $green Chỉ số xanh lá
     * @param {Integer} $blue Chỉ số xanh dương
     */
    private function isWhiteColor($red, $green, $blue)
    {
        $threshold = 210;

        return ($red >= $threshold &&
            $green >= $threshold &&
            $blue >= $threshold);
    }


    /**
     * Tạo ảnh mono (đơn sắc).
     */
    private function createMonoImage(): void
    {
        // imagefilter($this->img, IMG_FILTER_EDGEDETECT);
        // imagefilter($this->img, IMG_FILTER_GRAYSCALE);
        // imagefilter($this->img, IMG_FILTER_CONTRAST, 0.8);
        // imagefilter($this->img, IMG_FILTER_GRAYSCALE);
        // imagefilter($this->img, IMG_FILTER_CONTRAST, -100);
        // imagefilter($this->img, IMG_FILTER_EDGEDETECT);
        // imagefilter($this->img, IMG_FILTER_GRAYSCALE);
        // imagefilter($this->img, IMG_FILTER_NEGATE);
        // imagefilter($this->img, IMG_FILTER_GRAYSCALE);
        // imagefilter($this->img, IMG_FILTER_COLORIZE, 100, 50, 0);
    }


    /**
     * Lấy đuôi mở rộng của file.
     * @param $path {string} Đường dẫn file
     * @return {string} Đuôi mở rộng của file.
     */
    private function getFileExtension(string $path): string
    {
        $ext = strtolower(substr($path, strrpos($path, '.') + 1));
        return $ext;
    }


    /**
     * Lấy đối tượng ảnh (đối tượng PHP) từ đường dẫn file.
     * @param $path {string} Đường dẫn file
     * @param $ext {string} Đuôi mở rộng của file
     * @return {resource} Đối tượng ảnh
     */
    private function getImageFromPath(string $path, string $ext): GdImage|false
    {
        $resource = match ($ext) {
            'jpg', 'jpeg' => imagecreatefromjpeg($path),
            'gif' => imagecreatefromgif($path),
            'png' => imagecreatefrompng($path),
            default => false
        };
        // echo gettype($resource) . PHP_EOL;
        return $resource;
    }


    /**
     * Ghi ảnh ra file.
     * @param $path {string} Đường dẫn
     * @param $ext {string} Đuôi mở rộng
     */
    private function writeImageToFile(GdImage $croppedImage, string $path, string $ext): void
    {
        match ($ext) {
            'jpg', 'jpeg' => imagejpeg($croppedImage, $path),
            'gif' => imagegif($croppedImage, $path),
            'png' => imagepng($croppedImage, $path)
        };
    }


    /**
     * Tách ảnh thành các file.
     * @param $ext {string} Đuôi mở rộng
     */
    private function cropImages(array $grid, string $fileName): void
    {
        $idx = 0;
        foreach ($grid as $rows) {
            foreach ($rows as ['left' => $left, 'top' => $top, 'right' => $right, 'bottom' => $bottom]) {
                $rect = [
                    'x' => $left,
                    'y' => $top,
                    'width' => $right - $left + 1,
                    'height' => $bottom - $top + 1
                ];
                $cropedImage = imagecrop($this->img, $rect);
                $outputPath = $this->outputFolder . $fileName . '-' . str_pad($idx + 1, 3, '0', STR_PAD_LEFT) . '.' . $this->ext;
                $this->writeImageToFile($cropedImage, $outputPath, $this->ext);
                imagedestroy($cropedImage);

                $idx++;
            }
        }
    }


    /**
     * Tạo folder nếu chưa có.
     */
    private function checkOutputFolder(): void
    {
        if (!file_exists($this->outputFolder)) {
            mkdir($this->outputFolder);
        }
    }


    /**
     * Tách ảnh gốc thành nhiều ảnh nhỏ.
     */
    private function splitImageToGrid(): array
    {
        $rows = $this->getAllRows();

        // Chỉ có một hàng thì không cần tách
        // Copy ảnh thôi
        if (count($rows) < 2) {
            return [];
        }

        $grid = [];
        foreach ($rows as ['left' => $left, 'top' => $top, 'right' => $right, 'bottom' => $bottom]) {
            $frames = $this->getAllFramesOfRow($left, $top, $right, $bottom);
            // print_r($frames);
            if (count($frames) == 0) {
                $frames = [
                    [
                        'left' => $left,
                        'top' => $top,
                        'right' => $right,
                        'bottom' => $bottom
                    ]
                ];

                /*
                if (panels.length < 2) {
                    // Left trim và right trim
                    let trimmedLeft = left;
                    while (trimmedLeft < right && this.isGutterColumn(trimmedLeft, top, bottom)) {
                        trimmedLeft++;
                    }
                    if (trimmedLeft > left) {
                        trimmedLeft--;
                    }
                    let trimmedRight = right;
                    while (trimmedRight > left && this.isGutterColumn(trimmedRight, top, bottom)) {
                        trimmedRight--;
                    }
                    if (trimmedRight < right) {
                        trimmedRight++;
                    }
    
                    panels = [
                        [trimmedLeft, top, trimmedRight, bottom]
                    ];
                }
                */
            }
            $grid[] = $frames;
        }

        // Có thể cắt tiếp các frame, có trường hợp một frame trải trên 2 hàng

        return $grid;
    }

    /**
     * Xử lý file.
     */
    private function splitFile(array $grid): void
    {
        // Tên file
        $baseName = basename($this->inputPath);
        // Tên file mà không có đuôi mở rộng
        $fileName = str_replace('.' . $this->ext, '', $baseName);

        if (count($grid) == 0) {
            // Chỉ có một hàng thì không cần tách
            // Copy ảnh thôi
            copy($this->inputPath, $this->outputFolder . $baseName);
        } else {
            $this->cropImages($grid, $fileName);
        }
    }
}
