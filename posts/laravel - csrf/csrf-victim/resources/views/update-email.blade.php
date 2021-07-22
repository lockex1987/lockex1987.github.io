<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="TAoJ9p7uOI0xWTiHzY7m4u0LSPY0xSpDMwZcptNT" />
    <title>CSRF Demo</title>
</head>

<body>
    <h2>
        CSRF test on Origin
    </h2>

    <p>
        <a href="/fake-login">Fake login</a>
    </p>

    <form action="/user/email"
        method="POST">
        @csrf

        <label>
            Email mới:
        </label>

        <input name="email"
            value="lockex1987@gmail.com" />

        <button type="submit">
            Đổi email
        </button>
    </form>

    <script>
        // document.forms[0].submit();

        /*
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[]').attr('content')
            }
        });
        */
    </script>
</body>
</html>
