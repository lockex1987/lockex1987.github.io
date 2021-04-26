<?php

/*
https://www.php.net/manual/en/refs.crypto.php

*/
function demoHashPassword(): void
{
    $plainPassword = '123456aA@';
    $hashPassword = password_hash($plainPassword, PASSWORD_BCRYPT); // PASSWORD_DEFAULT hiện tại là PASSWORD_BCRYPT
    print_r( password_get_info( $hashPassword ) );
    echo $hashPassword . PHP_EOL;

    if (password_verify($plainPassword, $hashPassword)) {
        echo 'OK' . PHP_EOL;
    }
}

/**
 * Sử dụng openssl_encrypt và openssl_decrypt
 */
function demoEncryption1(): void
{
    $plainString = 'Welcome to GeeksforGeeks';
    echo 'Plain string: ' . $plainString . PHP_EOL;
  
    $cipher = 'BF-CBC'; // AES-128-CTR, BF-CBC
    $iv_length = openssl_cipher_iv_length($cipher);
    
    $options = 0;

    // $iv = '1234567891011121';
    // $key = 'GeeksforGeeks';

    // Sinh IV và khóa ngẫu nhiên
    $iv = random_bytes($iv_length);
    $key = openssl_digest(php_uname(), 'MD5', true);

    $encryptedString = openssl_encrypt(
        $plainString,
        $cipher,
        $key,
        $options,
        $iv
    );
    echo 'Encrypted string: ' . $encryptedString . PHP_EOL;
  
    $decryptedString = openssl_decrypt(
        $encryptedString,
        $cipher,
        $key,
        $options,
        $iv
    );
    echo 'Decrypted string: ' . $decryptedString . PHP_EOL;
}

function demoEncryption(): void
{
    $key = random_bytes(SODIUM_CRYPTO_SECRETBOX_KEYBYTES);
    $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
    $ciphertext = sodium_crypto_secretbox('This is a secret!', $nonce, $key);

    $encoded = base64_encode($nonce . $ciphertext);
    var_dump($encoded);

    $decoded = base64_decode($encoded);

    $nonce = mb_substr($decoded, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, '8bit');
    $ciphertext = mb_substr($decoded, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, null, '8bit');
    $plaintext = sodium_crypto_secretbox_open($ciphertext, $nonce, $key);
    var_dump($plaintext);
}

function demoHash(): void
{
    print_r(hash_algos());

    $my_password = 'maradona';
    $hashed_password_with_crypt = crypt($my_password, 'somesalt!');
    $options = [
        // 'salt' => 'fg28y2uhd2bjhgug6765jh', // not shorter than 22 characters
        'cost' => 12
    ];
    $hashed_password = password_hash($my_password, PASSWORD_BCRYPT, $options);

    echo 'Plain password:                                 ' . $my_password . PHP_EOL;
    echo 'Hashed with md5():                              ' . md5($my_password) . PHP_EOL;
    echo 'Hashed with sha1():                             ' . sha1($my_password) . PHP_EOL;
    echo 'Hashed with hash() - sha256 algorithm:          ' . hash('sha256', $my_password) . PHP_EOL;
    echo 'Hashed with crypt() - adding some salt:         ' . $hashed_password_with_crypt . PHP_EOL;
    echo 'Hashed with password_hash() - bcrypt algorithm: ' . $hashed_password . PHP_EOL;

    echo 'Check password with password_verify(): ' . PHP_EOL;
    if (password_verify($my_password, $hashed_password_with_crypt)) {
        echo 'OK!' . PHP_EOL;
    } else {
        echo 'KO!' . PHP_EOL;
    }
    if (password_verify($my_password, $hashed_password)) {
        echo 'OK!';
    } else {
        echo 'KO!';
    }
}

// demoHashPassword();
// demoEncryption1();
demoHash();
