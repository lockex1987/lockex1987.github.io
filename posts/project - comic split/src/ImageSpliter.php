<?php

include_once('Rectangle.php');


class ImageSpliter
{
    // Đường dẫn file ảnh
    private string $filePath;

    // Đuôi mở rộng của ảnh
    private string $fileExt;

    // Đối tượng ảnh
    private GdImage $img;

    // Kích thước ảnh
    private int $imageWidth;
    private int $imageHeight;

    // Padding
    private const PADDING = 7;

    public function __construct(string $filePath)
    {
        $this->filePath = $filePath;
        $this->fileExt = $this->getFileExtension($this->filePath);
        $this->img = $this->getImageFromPath($this->filePath, $this->fileExt);
        $this->imageWidth = imagesx($this->img);
        $this->imageHeight = imagesy($this->img);
    }

    /**
     * Giải phóng bộ nhớ.
     */
    public function freeMemory(): void
    {
        imagedestroy($this->img);
    }

    /**
     * Lấy các hàng trong một vùng chữ nhật của ảnh.
     * @param $rect {Rectangle} Hình chữ nhật
     * @return {array} Mảng các hàng, mỗi hàng là đối tượng Rectangle
     */
    private function getAllRows(Rectangle $rect): array
    {
        $rows = [];
        $y1 = $rect->top;

        while (true) {
            [$y1, $y2, $nextY] = $this->getTopMostRow(new Rectangle(
                left: $rect->left,
                top: $y1,
                right: $rect->right,
                bottom: $rect->bottom
            ));

            if ($y1 == -1) {
                // Không có hàng nào
                break;
            }

            $rows[] = new Rectangle(
                left: $rect->left,
                top: $y1,
                right: $rect->right,
                bottom: $y2
            );

            $y1 = $nextY;
        }

        return $rows;
    }


    /**
     * Lấy các cột trong một vùng chữ nhật của ảnh.
     * @param $rect {Rectangle} Hình chữ nhật
     * @return {array} Mảng các cột, mỗi cột là đối tượng Rectangle
     */
    private function getAllColumns(Rectangle $rect): array
    {
        $frames = [];
        $x1 = $rect->left;

        while (true) {
            [$x1, $x2, $nextX] = $this->getLeftMostColumn(new Rectangle(
                left: $x1,
                top: $rect->top,
                right: $rect->right,
                bottom: $rect->bottom
            ));

            if ($x1 == -1) {
                // Không có cột nào
                break;
            }

            $frames[] = new Rectangle(
                left: $x1,
                top: $rect->top,
                right: $x2,
                bottom: $rect->bottom
            );

            // Di chuyển sang phải
            $x1 = $nextX;
        }

        // Chú ý trường hợp heading
        if (count($frames) >= 2) {
            $frames = $this->checkHeading($frames);
        }

        // Luôn trả về ít nhất một cột
        if (count($frames) == 0) {
            return [
                $rect
            ];
        }

        return $frames;
    }


    /**
     * Kiểm tra một hàng mà chỉ là dòng chữ, không phải là các frame (panel).
     */
    private function checkHeading(array $frames): array
    {
        $maxColumns = 5;
        if (count($frames) > $maxColumns) {
            // Trả về mảng rỗng để tiếp theo xử lý không cắt
            return [];
        }

        $minFrameWidth = intval($this->imageWidth * 0.2);

        $normalized = [];
        $tag = null;
        foreach ($frames as $current) {
            if ($current->right - $current->left >= $minFrameWidth) {
                if (is_null($tag)) {
                    $normalized[] = $current;
                } else if ($tag->right - $tag->left >= $minFrameWidth) {
                    $normalized[] = $tag;
                    $tag = null;
                    $normalized[] = $current;
                } else {
                    $tag->right = $current->right;
                }
            } else {
                if (is_null($tag)) {
                    $tag = Rectangle::withRect($current);
                } else {
                    $tag->right = $current->right;
                }
            }
        }
        if (!is_null($tag)) {
            $normalized[] = $tag;
        }
        return $normalized;
    }


    /**
     * Lấy hàng đầu tiên (từ trên xuống) trong một vùng chữ nhật của ảnh.
     * Trả về mảng, phần tử thứ nhất là tọa độ y1 phía trên (điểm bắt đầu hàng), phần tử thứ hai là tọa độ y2 phía dưới (điểm kết thúc hàng).
     * Trả về mảng [-1, -1] nếu không tìm thấy.
     * @param $rect {Rectangle} Hình chữ nhật
     * @return {array} Mảng tọa độ y1 phía trên và y2 phía dưới và vị trí y để xét tiếp theo
     */
    private function getTopMostRow(Rectangle $rect): array
    {
        // Tìm điểm bắt đầu hàng (phía trên)
        $y1 = $rect->top;

        // Di chuyển xuống dưới khi dòng vẫn là gutter
        while ($y1 < $rect->bottom && $this->isGutterRow($y1, $rect->left, $rect->right)) {
            $y1++;
        }

        if ($y1 >= $rect->bottom) {
            return [-1, -1, -1];
        }

        // Chiều cao tối thiểu của một frame
        $minFrameHeight = max(15, intval($this->imageHeight * 0.05));

        // Tìm điểm kết thúc của hàng (phía dưới)
        $y2 = $y1 + $minFrameHeight;

        /*
        if ($y2 > $rect->bottom) {
            return [-1, -1, -1];
        }
        */

        // Di chuyển xuống dưới khi vẫn đang trong ô (không phải là gutter)
        while (
            $y2 <= $rect->bottom &&
            !$this->isGutterRow($y2, $rect->left, $rect->right)
        ) {
            $y2++;
        }

        $nextY = $y2;

        // Có một số trường hợp có dòng chữ ở trên mà không có dòng kẻ ở trên
        // Khi đó nếu cắt sẽ bị sát vào chữ quá, khó đọc
        // Thêm padding cho phía trên
        // Và cả padding phía dưới
        $y1 = max($y1 - self::PADDING, $rect->top);
        $y2 = min($y2 + self::PADDING, $rect->bottom);

        return [$y1, $y2, $nextY];
    }


    /**
     * Lấy ra cột đầu tiên ngoài cùng bên trái trong một vùng chữ nhật của ảnh.
     * Trả về mảng [điểm bắt đầu cột, điểm kết thúc cột] hoặc [-1, -1] nếu không tìm thấy.
     * @param $rect {Rectangle} Hình chữ nhật
     * @return {array} Tạo độ cột ngoài cùng bên trái gồm x1 bên trái và x2 bên phải và vị trí x tiếp theo
     */
    private function getLeftMostColumn(Rectangle $rect): array
    {
        // Tìm điểm bắt đầu ô bên trái
        $x1 = $rect->left;

        // Di chuyển sang phải khi cột vẫn là gutter
        while ($x1 < $rect->right && $this->isGutterColumn($x1, $rect->top, $rect->bottom)) {
            $x1++;
        }

        if ($x1 >= $rect->right) {
            return [-1, -1, -1];
        }

        // Chiều rộng tối thiểu của một ô
        // Chỗ này chỉ giới hạn nhỏ thôi để có thể kiểm tra heading sau này
        $minFrameWidth = intval($this->imageWidth * 0.05);

        // Tìm điểm kết thúc ô bên phải
        $x2 = $x1 + $minFrameWidth;

        // Di chuyển sang phải khi vẫn đang trong ô (không phải là gutter)
        while (
            $x2 <= $rect->right &&
            !$this->isGutterColumn($x2, $rect->top, $rect->bottom)
        ) {
            $x2++;
        }

        /*
        if ($x2 > $rect->right) {
            return [-1, -1];
        }

        if ($x2 - $x1 < 2) { // $minFrameWidth
            return [-1, -1];
        }
        */

        $nextX = $x2;

        $x1 = max($x1 - self::PADDING, $rect->left);
        $x2 = min($x2 + self::PADDING, $rect->right);

        return [$x1, $x2, $nextX];
    }


    /**
     * Đoạn kẻ ngang có phải là đoạn màu trắng hay không.
     * Kiểm tra xem đoạn kẻ ngang [left, right] ở vị trí row có phải là gutter không.
     * @param $row {int} Hàng
     * @param $left {int} Trái
     * @param $right {int} Phải
     * @return {boolean} true nếu là đoạn màu trắng
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
     * Kiểm tra có phải là đoạn kẻ dọc trắng hay không.
     * Kiểm tra xem cột [top, bot] ở vị trí col có phải là gutter không.
     * @param $col {int} Cột
     * @param $top {int} Vị trí trên bắt đầu đoạn thẳng
     * @param $bottom {int} Vị trí cuối kết thúc đoạn thẳng
     * @return {boolan} true nếu là đoạn thẳng dọc có màu trắng
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
     * @param $red {int} Chỉ số đỏ
     * @param $green {int} Chỉ số xanh lá
     * @param $blue {int} Chỉ số xanh dương
     * @return {bool} true nếu là màu trắng
     */
    private function isWhiteColor(int $red, int $green, int $blue): bool
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
     * @param $filePath {string} Đường dẫn file
     * @return {string} Đuôi mở rộng của file
     */
    private function getFileExtension(string $filePath): string
    {
        $fileExt = strtolower(substr($filePath, strrpos($filePath, '.') + 1));
        return $fileExt;
    }


    /**
     * Lấy đối tượng ảnh (đối tượng PHP) từ đường dẫn file.
     * @param $filePath {string} Đường dẫn file
     * @param $fileExt {string} Đuôi mở rộng của file
     * @return {GdImage} Đối tượng ảnh
     */
    private function getImageFromPath(string $filePath, string $fileExt): GdImage
    {
        $resource = match ($fileExt) {
            'jpg', 'jpeg' => imagecreatefromjpeg($filePath),
            'gif' => imagecreatefromgif($filePath),
            'png' => imagecreatefrompng($filePath),
            default => null
        };
        // echo gettype($resource) . PHP_EOL;
        return $resource;
    }


    /**
     * Tách ảnh gốc thành nhiều ảnh nhỏ.
     */
    public function splitImageToGrid(): array
    {
        $rows = $this->getAllRows(new Rectangle(
            left: 0, // có thể bỏ qua 1 số pixel ở bên trái, cho nhanh hoặc do scan lỗi (bị đen ở bên trái hoặc phải)
            top: 0, // có thể bỏ qua 1 số dòng đầu ở đây để tăng tốc độ
            right: $this->imageWidth - 1, // có thể bỏ qua một số pixel ở bên phải
            bottom: $this->imageHeight - 1
        ));

        // Chỉ có một hàng dừng lại
        if (count($rows) == 0) {
            return $rows;
        }

        // Nếu chỉ cắt theo hàng thì dừng lại luôn ở đây
        // return $rows;

        return $this->splitRowsToColumns($rows);
    }


    /**
     * Tách các hàng, mỗi hàng thành các cột.
     * @param $rows {array} Các hàng
     * @param {array} Các ô
     */
    private function splitRowsToColumns(array $rows): array
    {
        $grid = [];
        foreach ($rows as $rect) {
            $frames = $this->getAllColumns($rect);
            // print_r($frames);
            if (count($frames) == 1) {
                $temp = $frames[0];

                // Left trim và right trim
                $temp = $this->trimLeftAndRight($temp);

                // Chiều rộng tối thiểu một frame
                $minFrameWidth = max(35, intval($this->imageWidth * 0.1));

                // Kiểm tra dòng số trang
                if ($temp->right - $temp->left < $minFrameWidth) {
                    echo 'Loại bỏ dòng ở file ' . $this->filePath . PHP_EOL;
                    $frames = [];
                } else {
                    $frames = [
                        $temp
                    ];
                }
            }

            $grid = array_merge($grid, $frames);
        }

        // var_dump($grid);

        $grid = $this->splitFramesHorizontaly($grid);

        return $grid;
    }


    /**
     * Cắt bên trái và bên phải.
     */
    private function trimLeftAndRight(Rectangle $rect): Rectangle
    {
        // echo 'Trim' . PHP_EOL;
        $trimmedLeft = $rect->left;
        while (
            $trimmedLeft <= $rect->right &&
            $this->isGutterColumn($trimmedLeft, $rect->top, $rect->bottom)
        ) {
            $trimmedLeft++;
        }
        $trimmedLeft = max($trimmedLeft - self::PADDING, $rect->left);

        $trimmedRight = $rect->right;
        while (
            $trimmedRight >= $rect->left &&
            $this->isGutterColumn($trimmedRight, $rect->top, $rect->bottom)
        ) {
            $trimmedRight--;
        }
        $trimmedRight = min($trimmedRight + self::PADDING, $rect->right);

        return new Rectangle(
            left: $trimmedLeft,
            top: $rect->top,
            right: $trimmedRight,
            bottom: $rect->bottom
        );
    }


    /**
     * Cắt bên trên và bên dưới.
     */
    private function trimTopAndBottom(Rectangle $rect): Rectangle
    {
        // echo 'Trim' . PHP_EOL;
        $trimmedTop = $rect->top;
        while (
            $trimmedTop <= $rect->bottom &&
            $this->isGutterRow($trimmedTop, $rect->left, $rect->right)
        ) {
            $trimmedTop++;
        }
        $trimmedTop = max($trimmedTop - self::PADDING, $rect->top);

        $trimmedBottom = $rect->bottom;
        while (
            $trimmedBottom >= $rect->top &&
            $this->isGutterRow($trimmedBottom, $rect->left, $rect->right)
        ) {
            $trimmedBottom--;
        }
        $trimmedBottom = min($trimmedBottom + self::PADDING, $rect->bottom);

        return new Rectangle(
            left: $rect->left,
            top: $trimmedTop,
            right: $rect->right,
            bottom: $trimmedBottom
        );
    }


    /**
     * Có thể cắt tiếp các frame, có trường hợp một frame trải trên 2 hàng.
     * @param $grid {array} Mảng các frame
     * @return {array} Mảng các frame sau khi đã xử lý
     */
    private function splitFramesHorizontaly(array $grid): array
    {
        $arr = [];
        foreach ($grid as $rect) {
            /*
            $subRows = $this->getAllRows($rect);

            // Đảm bảo trả về ít nhất một hàng
            if (count($subRows) == 0) {
                $subRows[] = $rect;
            }
            $arr = array_merge($arr, $subRows);
            */

            $temp = $this->trimTopAndBottom($rect);
            
            /*
            // Chiều cao tối thiểu một frame
            $minFrameHeight = max(35, intval($this->imageWidth * 0.1));

            // Kiểm tra dòng số trang
            if ($temp->bottom - $temp->top < $minFrameHeight) {
                echo 'Loại bỏ cột ở file ' . $this->filePath . PHP_EOL;
            } else {
                
            }
            */
            
            $arr[] = $temp;
        }
        return $arr;
    }

    // -----------------------------------------------------------------------

    /**
     * Xử lý file.
     * @param $grid {array} Mảng các frame
     * @param $outputFolder {string} Thư mục chứa các ảnh được cắt ra output
     */
    public function splitFile(array $grid, string $outputFolder): void
    {
        $this->checkOutputFolder($outputFolder);

        // Tên file
        $baseName = basename($this->filePath);
        // Tên file mà không có đuôi mở rộng
        $fileName = str_replace('.' . $this->fileExt, '', $baseName);

        if (count($grid) < 2) {
            // Copy ảnh thôi
            copy($this->filePath, $outputFolder . $baseName);
        } else {
            $this->cropImages($grid, $fileName, $outputFolder);
        }
    }

    /**
     * Tạo folder nếu chưa có.
     * @param $outputFolder {string} Thư mục chứa các ảnh đầu ra
     */
    private function checkOutputFolder($outputFolder): void
    {
        if (!file_exists($outputFolder)) {
            mkdir($outputFolder);
        }
    }

    /**
     * Tách ảnh thành các file.
     * @param $grid {array} Mảng các frame
     * @param $fileName {string} Tên file, không bao gồm đuôi mở rộng
     * @param $outputFolder {string} Thư mục chứa ảnh đầu ra
     */
    private function cropImages(array $grid, string $fileName, string $outputFolder): void
    {
        $idx = 0;
        foreach ($grid as $rect) {
            $dimension = [
                'x' => $rect->left,
                'y' => $rect->top,
                'width' => $rect->right - $rect->left + 1,
                'height' => $rect->bottom - $rect->top + 1
            ];
            $cropedImage = imagecrop($this->img, $dimension);
            $outputPath = $outputFolder . $fileName . '-' . str_pad($idx + 1, 3, '0', STR_PAD_LEFT) . '.' . $this->fileExt;
            $this->writeImageToFile($cropedImage, $outputPath, $this->fileExt);
            imagedestroy($cropedImage);

            $idx++;
        }
    }

    /**
     * Ghi ảnh ra file.
     * @param $croppedImage {GdImage} Đối tượng ảnh nhỏ đã được cắt
     * @param $filePath {string} Đường dẫn file
     * @param $fileExt {string} Đuôi mở rộng
     */
    private function writeImageToFile(GdImage $croppedImage, string $filePath, string $fileExt): void
    {
        match ($fileExt) {
            'jpg', 'jpeg' => imagejpeg($croppedImage, $filePath),
            'gif' => imagegif($croppedImage, $filePath),
            'png' => imagepng($croppedImage, $filePath)
        };
    }
}
