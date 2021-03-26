<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Trang A</title>
</head>

<body>
    <p>Trang A</p>

    <script>
        window.addEventListener('message', (evt) => {
            if (!['http://csrf-malicious.to'].includes(evt.origin)) {
                return;
            }
            if (evt.data == 'get-token') {
                evt.source.postMessage('token:nat', evt.origin);
            }
        });
    </script>
</body>

</html>
