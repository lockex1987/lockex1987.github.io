<?php
echo php_uname() . "\n";
echo PHP_OS . "\n";

/*
Some possible outputs:
    Linux localhost 2.4.21-0.13mdk #1 Fri Mar 14 15:08:06 EST 2003 i686
    Linux

    FreeBSD localhost 3.2-RELEASE #15: Mon Dec 17 08:46:02 GMT 2001
    FreeBSD

    Windows NT XN1 5.1 build 2600
    WINNT
*/

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    echo 'This is a server using Windows' . "\n";
} else if (strtoupper(substr(PHP_OS, 0, 5)) === 'LINUX') {
    echo 'This is a server using Linux' . "\n";
} else {
	echo 'Unknown' . "\n";
}
