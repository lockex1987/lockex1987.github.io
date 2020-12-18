#!/bin/sh

# Convert file ts sang file mp4
# Yeu cau co ffmpeg
#
# Example:
# Cau lenh: ./ts-to-mp4.sh all.ts trololo.mp4

# Get the input file name
input=$1
if [ -z "$input" ]; then
    input="all.ts"
fi

# Get the output file name
output=$2
if [ -z "$output" ]; then
    output="output.mp4"
fi

# Audio stream dung cau lenh nay
bin=`ffmpeg -i $input -strict -2 -bsf:a aac_adtstoasc -vcodec copy $output`

# Video stream dung cau lenh nay
# bin=`ffmpeg -i $input -map 0 -c copy $output`

echo $bin

# Delete temp files
# bin=`rm -f $input`
