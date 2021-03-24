<?php

/**
 * Gọi SOAP, có thêm header.
 */
function setHeaders()
{
	$wsdl = 'http://yoururl.com/service.asmx?WSDL';
	$client = new SoapClient($wsdl);
	$apiAuth = [
		'UserName' => 'username',
		'Password' => 'password'
	];
	$header = new SoapHeader('http://tempuri.org/', 'AuthHeader', $apiAuth);
	$client->__setSoapHeaders($header);
	$data = $client->myMethodName($myMethodParameter);
	print_r($data);
}


/**
 * Kiểm tra username và password có chính xác hay không.
 * Gọi SSO của Viettel.
 * Chú ý phải enable SOAP extension ở file php.ini.
 * @param string $username Tên đăng nhập
 * @param string $password Mật khẩu
 * @return int 0 - Thành công, 1 - Thất bại, 2 - Lỗi gọi web service
 */
function authen(string $username, string $password): int
{
	// libxml_disable_entity_loader(false);

	try {
		$wsdl = 'http://10.60.7.126:8660/passportv3/passportWS?wsdl';
		$client = new SoapClient($wsdl);

		// Gọi method authen do dự án passportv3 định nghĩa
		$params = [
			'userName' => $username,
			'password' => $password,
			'domainCode' => 'KGM_ANTISPAM_SMS'
		];
		$result = $client->authen($params);
		var_dump($result);
		$status = $result->return->errorCode->code;

		// 0 là thành công, 1 là thất bại
		$status = ($status == 0) ? 0 : 1;
		return $status;
	} catch (SoapFault $fault) {
		// error_log('Call SSO fault: ' . $fault->getMessage());
		return 2;
	}
}


// Gọi hàm kiểm tra
echo 'Authen: ' . authen('huyennv9', 'fasdfasd') . PHP_EOL;
