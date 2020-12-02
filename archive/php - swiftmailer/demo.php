<?php
require_once 'vendor/autoload.php';

// Cấu hình kết nối
$host = 'mail.cyberspace.vn';
$port = 465;
$protocol = 'ssl';
$username = 'huyennv9@cyberspace.vn';
$password = '';
$sender = 'Nguyễn Văn Huyên';
$mailOptions = [
	'ssl' => [
		'allow_self_signed' => true,
		'verify_peer' => false
	]
];

// Cấu hình thông tin gửi
$subject = 'Wonderful Subject 2';
$recipient = 'huyennv9@cyberspace.vn';
$body = 'Here is the message itself 2';

// Tạo đối tượng Transport
$transport = (new Swift_SmtpTransport($host, $port, $protocol))
    ->setUsername($username)
    ->setPassword($password)
	->setStreamOptions($mailOptions);

	
// Tạo đối tượng Mailer từ đối tượng Transport
$mailer = new Swift_Mailer($transport);

// Tạo đối tượng Message
$message = (new Swift_Message($subject))
	->setFrom([$username => $sender])
    ->setTo([$recipient])
    ->setBody($body);

// Gửi mail
$result = $mailer->send($message);
