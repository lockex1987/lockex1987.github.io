<?php








class ThumbnailCreator
{
    // Link image type to correct image loader and saver
    // - makes it easier to add additional types later on
    // - makes the function easier to read
    const IMAGE_HANDLERS = [
        IMAGETYPE_JPEG => [
            'load' => 'imagecreatefromjpeg',
            'save' => 'imagejpeg',
            'quality' => 100
        ],
        IMAGETYPE_PNG => [
            'load' => 'imagecreatefrompng',
            'save' => 'imagepng',
            'quality' => 0
        ],
        IMAGETYPE_GIF => [
            'load' => 'imagecreatefromgif',
            'save' => 'imagegif'
        ]
    ];

    /**
     * Tạo ảnh thumbnail bằng PHP.
     */
    public static function makeThumbnail($sourceImgPath, $destImgPath, $desiredWidth)
    {
        // Đọc ảnh và lấy kích thước
        $sourceImage = imagecreatefromjpeg($sourceImgPath);
        $width = imagesx($sourceImage);
        $height = imagesy($sourceImage);
        
        // Tính toán chiều cao mong muốn
        $desiredHeight = floor($height * ($desiredWidth / $width));
        
        // Tạo ảnh mới
        $destImage = imagecreatetruecolor($desiredWidth, $desiredHeight);
        
        // Copy từ ảnh nguồn
        imagecopyresampled(
            $destImage,
            $sourceImage,
            0, 0, 0, 0,
            $desiredWidth, $desiredHeight, $width, $height
        );
        
        // Ghi ra file
        imagejpeg($destImage, $destImgPath);
    }

    /**
     * Giải nén file bằng PHP thuần.
     */
    public static function extractNative($archivePath, $extractFolder)
    {
        
    }

    /**
     * Giải nén file ZIP bằng PHP thuần.
     */
    private static function extractZipArchive($archivePath, $sourceImgPath)
    {
        $archiveFile = new ZipArchive();
        if ($archiveFile->open($archivePath)) {
            $numFiles = $archiveFile->count();
            for ($i = 0; $i < $numFiles; $i++) {
                $entry = $archiveFile->getNameIndex($i);
                if (strpos($entry, '.jpg') !== false) {
                    $imageData = $archiveFile->getFromName($entry);

                    file_put_contents($sourceImgPath, $imageData);

                    // $imageObject = imagecreatefromstring($imageData);
                    // imagejpeg($imageObject, $sourceImgPath);

                    echo $entry . PHP_EOL;
                }
            }
            $archiveFile->close();
        }
    }

    /**
     * Giải nén file RAR bằng PHP thuần.
     */
    private static function extractRarArchive($archivePath, $sourceImgPath)
    {
        $archiveFile = RarArchive::open($archivePath);
        $entries = $archiveFile->getEntries();
        foreach ($entries as $entry) {
            if (strpos($entry, '/') !== false || strpos($entry, '\\') !== false) {
                echo $entry->getName()  . PHP_EOL;
                $entry->extract('', $sourceImgPath);
                break;
            }
        }
        $archiveFile->close();
    }

    public static function createThumbnailOfComic($archivePath, $desiredWidth, $desiredHeight = null)
    {
        $extractFolder = '../output/';

        $extension = strtolower(pathinfo($archivePath, PATHINFO_EXTENSION));
        $archiveName = strtolower(pathinfo($archivePath, PATHINFO_FILENAME));

        $sourceImgPath = '../data/' . $archiveName . '.jpg';
        $destImgPath = $extractFolder . '.' . $archiveName . '_thumbnail.jpg';

        switch ($extension) {
            case 'zip':
            case 'cbz':
                self::extractZipArchive($archivePath, $sourceImgPath);
                break;
            case 'rar':
            case 'cbr':
                self::extractRarArchive($archivePath, $sourceImgPath);
                break;
        }

        // ThumbnailCreator::makeThumbnail($sourceImgPath, $destImgPath, $desiredWidth);
        ThumbnailCreator::createThumbnail($sourceImgPath, $destImgPath, $desiredWidth, $desiredHeight);

        // Xóa file ảnh nguồn
        unlink($sourceImgPath);
    }

    /**
     * https://pqina.nl/blog/creating-thumbnails-with-php/
     * @param $src - a valid file location
     * @param $dest - a valid file target
     * @param $targetWidth - desired output width
     * @param $targetHeight - desired output height or null
     */
    public static function createThumbnail($src, $dest, $targetWidth, $targetHeight = null)
    {

        // 1. Load the image from the given $src
        // - see if the file actually exists
        // - check if it's of a valid image type
        // - load the image resource

        // get the type of the image
        // we need the type to determine the correct loader
        // Hàm exif_imagetype yêu cầu extension exif
        $type = exif_imagetype($src);

        // if no valid type or no handler found -> exit
        if (!$type || !self::IMAGE_HANDLERS[$type]) {
            return null;
        }

        // load the image with the correct loader
        $image = call_user_func(self::IMAGE_HANDLERS[$type]['load'], $src);

        // no image found at supplied location -> exit
        if (!$image) {
            return null;
        }


        // 2. Create a thumbnail and resize the loaded $image
        // - get the image dimensions
        // - define the output size appropriately
        // - create a thumbnail based on that size
        // - set alpha transparency for GIFs and PNGs
        // - draw the final thumbnail

        // get original image width and height
        $width = imagesx($image);
        $height = imagesy($image);

        // maintain aspect ratio when no height set
        if ($targetHeight == null) {

            // get width to height ratio
            $ratio = $width / $height;

            // if is portrait
            // use ratio to scale height to fit in square
            if ($width > $height) {
                $targetHeight = floor($targetWidth / $ratio);
            }
            // if is landscape
            // use ratio to scale width to fit in square
            else {
                $targetHeight = $targetWidth;
                $targetWidth = floor($targetWidth * $ratio);
            }
        }

        // create duplicate image based on calculated target size
        $thumbnail = imagecreatetruecolor($targetWidth, $targetHeight);

        // set transparency options for GIFs and PNGs
        if ($type == IMAGETYPE_GIF || $type == IMAGETYPE_PNG) {

            // make image transparent
            imagecolortransparent(
                $thumbnail,
                imagecolorallocate($thumbnail, 0, 0, 0)
            );

            // additional settings for PNGs
            if ($type == IMAGETYPE_PNG) {
                imagealphablending($thumbnail, false);
                imagesavealpha($thumbnail, true);
            }
        }

        // copy entire source image to duplicate image and resize
        imagecopyresampled(
            $thumbnail,
            $image,
            0,
            0,
            0,
            0,
            $targetWidth,
            $targetHeight,
            $width,
            $height
        );


        // 3. Save the $thumbnail to disk
        // - call the correct save method
        // - set the correct quality level

        // save the duplicate version of the image to disk
        return call_user_func(
            self::IMAGE_HANDLERS[$type]['save'],
            $thumbnail,
            $dest,
            self::IMAGE_HANDLERS[$type]['quality']
        );
    }
}





$sourceImgPath = '../data/infinite_frontier_1.jpg';
$destImgPath = '../output/.infinite_frontier_1_thumbnail.jpg';

$comicPath = '../data/infinite_frontier_1.cbz';
$desiredWidth = 160;
$desiredHeight = 160;

ThumbnailCreator::createThumbnailOfComic($comicPath, $desiredWidth, $desiredHeight);
