#!/bin/bash
random=$RANDOM
let "random %= 12"
#myDate=`date +%d`
#echo $myDate
gsettings set org.gnome.desktop.background picture-uri "file:///media/data/image/bg/$random.jpg"

