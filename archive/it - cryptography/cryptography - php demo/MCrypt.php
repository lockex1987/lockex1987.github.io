<?php

class MCrypt
{
	// Key, là dãy các bit, có độ dài 256 bit hoặc 128 bit
	// Nên lưu ở đâu đó, không phải tạo mỗi lần
	private $key;

	// Tên thuật toán
	private $cipher;

	public function __construct($key, $cipher = 'aes-128-cbc')
    {
		$this->key = $key;
        $this->cipher = $cipher;
	}

	public static function generateKey($cipher = 'aes-128-cbc')
    {
        return openssl_random_pseudo_bytes($cipher == 'aes-128-cbc' ? 16 : 32);
	}

	function encrypt($plainText)
	{
		$encryptedText = openssl_encrypt(
			$plainText,
			$this->cipher,
			$this->key,
			OPENSSL_RAW_DATA
		);
		return $encryptedText;
	}

	function encryptWithIv($plainText)
	{
		// Tạo initial vector
		// Cần có ở bước decrypt
		// The 0 gives us the default options, but can
		// be changed to OPENSSL_RAW_DATA or OPENSSL_ZERO_PADDING
		$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->cipher));
		$encryptedText = openssl_encrypt(
			$plainText,
			$this->cipher,
			$this->key,
			0,
			$iv
		);
		$hash = hash_hmac('sha256', $encryptedText, $this->key, true);
		return $iv . $hash . $encryptedText;
		// return $encryptedText . ':' . base64_encode($iv);
	}

	function decrypt($encryptedText)
	{
		return openssl_decrypt(
			$encryptedText,
			$this->cipher,
			$this->key,
			OPENSSL_RAW_DATA
		);
	}

	function decryptWithIv($payload)
	{
		$iv = substr($payload, 0, 16);
		$hash = substr($payload, 16, 32);
		$encryptedText = substr($payload, 48);

		if (hash_hmac('sha256', $encryptedText, $this->key, true) !== $hash) {
			return null;
		}

		return openssl_decrypt(
			$encryptedText,
			$this->cipher,
			$this->key,
			0,
			$iv
		);
	}
}



// $secret = base64_encode(MCrypt::generateKey());
$secret = 'ECSvtzzGQgx0pNB9m/EgXg==';
$key = base64_decode($secret);
$mcrypt = new MCrypt($key, 'aes-128-ecb');

$originalText = 'Nguyen Anh Tuan';
$payload = base64_encode($mcrypt->encrypt($originalText));
$decryptedText = $mcrypt->decrypt(base64_decode($payload));

// echo OPENSSL_RAW_DATA . "\n";
// echo OPENSSL_ZERO_PADDING . "\n";
// echo $secret . "\n";

// echo $originalText . "\n";
// echo $payload . "\n";
// echo $decryptedText . "\n";


for ($i = 0; $i < 100; $i++) {
	echo '"' . base64_encode($mcrypt->encrypt($i)) . '",' . "\n";
}

