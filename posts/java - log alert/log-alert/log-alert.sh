#!/bin/sh
PROCESSFILE='log-alert.jar'
if ps ax | grep -v grep | grep $PROCESSFILE > /dev/null
then
	echo "$PROESSFILE is running, everything is fine"
else
	echo "$PROCESSFILE is not running"
	cd "/opt/log-alert/"
	java -jar "log-alert.jar" >> log-alert.log &
fi
