<!DOCTYPE html>


<?php
    // Đọc cấu hình từ file .env
    $config = parse_ini_file('../.env', false, INI_SCANNER_RAW);
    $ROOT_API = $config['ROOT_API'];
    $ANM_ROOT_URL = $config['ANM_ROOT_URL'];

    /**
     * Tự viết hàm mix.
     */
    function mix($path)
    {
        $manifestPath = 'mix-manifest.json';
        if (! file_exists($manifestPath)) {
            echo 'The Mix manifest does not exist.';
            return;
        }

        $manifests = [];
        $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        $manifest = $manifests[$manifestPath];
        // print_r($manifest);

        if (! isset($manifest[$path])) {
            echo "Unable to locate Mix file: {$path}.";
            return;
        }

        return $manifest[$path];
    }
?>


<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">

    <title>Platform</title>

    <!-- Hệ thống nhạy cảm, ẩn logo -->
    <!--link rel="shortcut icon" href="/images/logo.png"-->

    <!-- libs.css đang thiếu button-group mà Summernote sử dụng, cần thêm cả bootstrap gốc -->
    <!--link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" /-->
    <link rel="stylesheet" href="/libs/libs.1586158775789.css">
    
    <link rel="stylesheet" href="<?php echo mix('/css/style.css') ?>">
</head>

<body>
    <div id="app">
    </div>
    
    <script src="/libs/libs.1591346019433.js"></script>

    <!-- Offline exporting của Highcharts (bị lỗi font khi export PDF nên không dùng) -->
    <!--script src="/libs/offline-exporting.src.js"></script-->

    <!-- NAT carousel -->
    <link rel="stylesheet" href="/libs/nat-carousel/nat-carousel.css">
    <script src="/libs/nat-carousel/nat-carousel.js"></script>

    <script>
        // Đường dẫn API
        const ROOT_API = '<?php echo $ROOT_API ?>';

        // Đường dẫn của hệ thống An ninh mạng
        const ANM_ROOT_URL = '<?php echo $ANM_ROOT_URL ?>';
    </script>

    <script src="<?php echo mix('/js/script.js') ?>"></script>

    <!-- YouTube API -->
    <script async defer src="https://www.youtube.com/iframe_api"></script>

    <!-- Facebook API -->
    <script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"></script>
</body>
</html>
