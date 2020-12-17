'''
References:
	https://github.com/poketo/manga-rock-image-decoder
	https://github.com/poketo/poketo
	https://github.com/poketo
	https://www.reddit.com/r/codes/comments/7mdx70/need_help_decrypting_this_string/
	https://github.com/Xonshiz/comic-dl/

Usage:	
	for (( i = 1; i <= 20; i++ )) do python image_decoder.py mri/$i webp/$i; done
'''
import sys
import os


def decode_image(src, out):
	data = open(src, 'rb').read()
	n = len(data) + 7
	header = [82, 73, 70, 70, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, 87, 69, 66, 80, 86, 80, 56]
	data = map(lambda x: ord(x) ^ 101, data)
	open(out, 'wb').write(''.join(map(chr, header + data)))


def main():
	in_folder = sys.argv[1]
	out_folder = sys.argv[2] # in_folder + '_out'

	if not os.path.exists(out_folder):
		os.makedirs(out_folder)

	for f in os.listdir(in_folder):
		file_name = f.split('.')[0]
		src = in_folder + '/' + f
		out = out_folder + '/' + file_name + '.webp'
		print(out)
		decode_image(src, out)


main()
