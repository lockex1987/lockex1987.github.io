#!/bin/sh
PROCESSFILE='crawler-service.jar'
if ps ax | grep -v grep | grep $PROCESSFILE > /dev/null
then
	echo "$PROESSFILE is running, everything is fine"
else
	echo "$PROCESSFILE is not running"
	cd "/home/huyennv9/crawler-service/"
	java -jar "crawler-service.jar" >> crawler-service.log &
fi
