<?php
$uri = $_SERVER['REQUEST_URI'];
$mp4Path = str_replace('.mp4x', '.mp4', $uri);
$srtPath = str_replace('.mp4x', '.srt', $uri);

// file_exists('dw-negative.png')
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta name="description" content="Media player"/>

	<title>Media player</title>

	<link rel="icon" href="/images/favicon.png"/>
	<link rel="stylesheet" href="/css/style.css"/>
</head>

<body class="py-3" style="background-color: #000;">
    <div class="media-container">
        <video id="myVideo" controls preload="metadata">
            <source src="<?php echo $mp4Path; ?>" type="video/mp4">
            <track label="English" kind="subtitles" srclang="en-US" src="<?php echo $srtPath; ?>" data-type="srt" default>
        </video>
    </div>


    <link rel="stylesheet" href="/posts/project%20-%20media%20player/css/media-player.css" />
    <script src="/posts/project%20-%20media%20player/js/media-player.js"></script>

    <script>
        try {
            createMediaPlayer(document.querySelector('#myVideo'));
        } catch (ex) {
            alert(ex.message);
        }
    </script>
</body>
</html>

