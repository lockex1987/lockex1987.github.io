'''
dwebp file.webp -o file.png
'''
import os
import sys
import subprocess

root = sys.argv[1]
extension = '.webp'

pngpath = root + '/png'
if os.path.exists(pngpath):
    os.rmdir(pngpath)
os.makedirs(pngpath)

for folder in os.listdir(root + '/webp'):
    os.makedirs(root + '/png/' + folder)
    for filename in os.listdir(root + '/webp/' + folder):
        if filename.endswith(extension):
            imagename = filename.replace(extension, '.png')
            filepath = os.path.join(root, 'webp', folder, filename)
            imagepath = os.path.join(root, 'png', folder, imagename)
            subprocess.call(['dwebp',
                    filepath,
                    '-o', imagepath])
            # print(imagename)

