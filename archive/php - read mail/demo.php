<?php

// Gmail Email Inbox using PHP with IMAP
if (! function_exists('imap_open')) {
	echo "IMAP is not configured.";
	exit();
} else {
	/* Connecting Gmail server with IMAP */
	// $mailbox = '{imap.gmail.com:993/imap/ssl}INBOX';
	$mailbox = '{mail.cyberspace.vn:995/pop3/ssl}INBOX';
	$username = 'huyennv9';
	$password = 'Freelancer@20';
	$connection = imap_open($mailbox, $username, $password)
		or die('Cannot connect to Gmail: ' . imap_last_error());
	
	/* Search Emails having the specified keyword in the email subject */
	// $emailData = imap_search($connection, 'SUBJECT "Article "');
	// $emailData = imap_search($connection, '');
	$emailData = imap_search($connection, 'SUBJECT "[JIRA] "');
	
	if (! empty($emailData)) {
		foreach ($emailData as $emailIdent) {
			$overview = imap_fetch_overview($connection, $emailIdent, 0);
			$message = imap_fetchbody($connection, $emailIdent, '1.1');
			$messageExcerpt = substr($message, 0, 150);
			$partialMessage = trim(quoted_printable_decode($messageExcerpt)); 
			$date = date("d F, Y", strtotime($overview[0]->date));
			echo $overview[0]->from . PHP_EOL;
			echo $overview[0]->subject . PHP_EOL;
			// echo $partialMessage;
			echo $date . PHP_EOL . PHP_EOL;
		}
	}
	imap_close($connection);
}
