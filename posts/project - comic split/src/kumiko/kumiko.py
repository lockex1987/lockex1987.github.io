# coding=utf8
#!/usr/bin/env python


import sys, os, json, argparse, subprocess, hashlib
from kumikolib import Kumiko
from lib.html import HTML


parser = argparse.ArgumentParser(description='Kumiko CLI')

# Input/Output
parser.add_argument('-i', '--input', nargs='+', required=True, help='A file or folder name to parse')
parser.add_argument('-o', '--output', nargs=1, help='A file name to save json/html output to')
parser.add_argument('--rtl', action='store_true', help='Pass this option to number panels right-to-left')

# HTML reader page options
parser.add_argument('-b', '--browser', nargs=1, help='Opens given browser to read your comic page(s) panel-by-panel! (implies --html)', choices=['firefox','konqueror','chromium', 'sfive'])
parser.add_argument('--html', action='store_true', help='Generates an HTML file for reading')
parser.add_argument('--html-static-dir', nargs=1, help='When generating HTML, this will be the relative directory for javascript files: <script src="$static-dir/...">  (implies --html)')

# Configuration tweaks
parser.add_argument('--min-panel-size-ratio', nargs=1, type=float, help='Panels will be considered too small and exluded if they have a width < img.width * ratio or height < img/height * ratio (default is 1/15th)')

# Utilities
parser.add_argument('--debug-dir', nargs=1, help='Write debug files in this directory (image files with extra panel information and more)')
parser.add_argument('--progress', action='store_true', help='Prints progress information')



args = parser.parse_args()
k = Kumiko({
	'debug_dir': args.debug_dir[0] if args.debug_dir else False,
	'progress': args.progress,
	'rtl': args.rtl,
	'min_panel_size_ratio': args.min_panel_size_ratio[0] if args.min_panel_size_ratio else False
})

file_or_folder = args.input[0]
folder = None
html_file = None

# Folder
if len(args.input) == 1 and os.path.isdir(args.input[0]):
	folder = args.input[0]
	if folder[-1] == '/':
		folder = folder[0:-1]
	info = k.parse_dir(folder)
	html_file = os.path.join('tests/results',os.path.basename(folder)+'.html')

# File
elif len(args.input) == 1 and os.path.isfile(args.input[0]):
	f = args.input[0]
	folder = os.path.dirname(f)
	info = k.parse_images([f])
	html_file = os.path.join('tests/results',os.path.basename(f)+'.html')

# URL list
else:
	info = k.parse_url_list(args.input)
	filehash = hashlib.sha1(';'.join(sorted(args.input)).encode()).hexdigest()
	html_file = os.path.join('tests/results',filehash+'.html')

if len(info) == 0:
	print("--input (-i) is not a file, or directory, or URL list: '"+str(args.input)+"'")
	sys.exit(1)

info = json.dumps(info)


# Generate HTML
if args.html or args.browser or args.html_static_dir:
	images_dir = os.path.relpath(folder,'tests/results')+'/' if folder else 'urls'
	html = ''
	html += HTML.header(reldir = args.html_static_dir[0] if args.html_static_dir else '../../')
	html += HTML.reader(info,images_dir)
	html += HTML.footer
	
	if args.output:
		html_file = args.output[0]
	
	if args.browser or args.output:
		fh = open(html_file, 'w')
		fh.write(html)
		fh.close()
		print('Saved HTML file:',html_file)
	else:
		print(html)

# Or JSON info
else:
	if args.output:
		f = open(args.output[0], 'w')
		f.write(info)
		f.close()
	else:
		print(info)



if args.browser:
	subprocess.run([args.browser[0],html_file])
