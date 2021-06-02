<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cấu hình kết nối
$host = 'mail.cyberspace.vn';
$port = 465; // 587
$protocol = 'ssl'; // 'tls'
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
$subject = 'Here is the subject';
$recipient = 'huyennv9@cyberspace.vn';
$body = 'This is the HTML message body <b>in bold!</b>';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug   = 1; // để giá trị càng cao thì càng nhiều log
    $mail->isSMTP();
    $mail->Host        = $host;
	$mail->Port        = $port;
	$mail->SMTPSecure  = $protocol;
    $mail->SMTPAuth    = true;
    $mail->Username    = $username;
    $mail->Password    = $password;
	$mail->SMTPOptions = $mailOptions;

    // Recipients
    $mail->setFrom($username, $sender);
    //$mail->addAddress('joe@example.net', 'Joe User');
    $mail->addAddress($recipient);
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    // Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $body;
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo "Message has been sent\n";
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}\n";
}

