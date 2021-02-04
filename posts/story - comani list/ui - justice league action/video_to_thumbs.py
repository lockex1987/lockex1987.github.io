'''
ffmpeg -i test.mp4 -ss 00:00:15 -vf scale=200:-1 -vframes 1 thumbnail.jpg
'''
import os
import sys
import subprocess

folder = sys.argv[1]
extension = ".mp4"
time = "00:00:50"
scale = "400:-1"

for filename in os.listdir(folder):    
    if filename.endswith(extension):
        #imagename = filename.replace(extension, "") + ".jpg"
        imagename = filename[0:2] + ".jpg"
        subprocess.call(['ffmpeg',
                '-i', os.path.join(folder, filename),
                '-ss', time,
                '-vf', 'scale=' + scale,
                '-vframes', '1',
                os.path.join(folder, imagename)])

