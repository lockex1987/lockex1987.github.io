#!/bin/sh

# Script nay phai duoc thuc thi o trong thu muc chua cac file *.ts
# Script se noi cac phan nho thanh mot phan lon co ten la all.ts
# Cau lenh: ./ts-joiner.sh


# Get length of segment in the current repo
seglen=`ls -la segment*.ts | wc -l`
if [ -z "$seglen" ]; then
    echo "Not segment file found"
    exit 1
fi

# Clean temp files
bin=`rm -f all.ts`

# Concat segments into one
a=0
while [ "$a" -lt $seglen ]
do
    echo $a
    bin=`cat segment$a.ts >> all.ts`
    a=`expr $a + 1`
done
