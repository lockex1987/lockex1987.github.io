# -*- coding: utf-8 -*-
import sys
import ntpath
from comic_page import ComicPage
import file_writer as fw


if __name__ == '__main__':
    # Lấy ảnh từ tham số vào và xử lý
    if len(sys.argv) < 2:
        print "Usage: %s <image file>" % sys.argv[0]
        sys.exit(1)

    file_path = sys.argv[1]
    c = ComicPage(file_path)
    fw.write_files(c.origin, c.rows, c.frames, c.fimgs, ntpath.basename(file_path).split('.')[0] + "-")
