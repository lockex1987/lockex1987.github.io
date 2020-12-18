# -*- coding: utf-8 -*-
# pip install Pillow
# https://github.com/charlesthk/python-resize-image
from PIL import Image
import resizeimage

# Kích thước mới
maxwidth = 200
maxheight = 100
size = (maxwidth, maxheight)

# Mở file
img = Image.open("photo.jpg")

(w, h) = img.size
print("The original image's size is: %dx%d" % (w, h))

# Tạo thumbnail
# Giữ nguyên ratio (tỷ lệ chiều rộng và chiều cao)
# Hàm thumbnail thay đổi luôn đối tượng đang sử dụng, không tạo ảnh mới
#img.thumbnail(size)
#img.thumbnail(size, Image.ANTIALIAS)

# Hàm này không giữ tỷ lệ
# Nó scale ảnh sao cho phù hợp với kích thước mới
resized = img.resize((200, 200))
#resized = img.resize(size, Image.ANTIALIAS)
w, h = resized.size
print("The resized image's size is: %dx%d" % (w, h))
#resized.show()

# Ghi file
#img.save('photo_new_1.jpg', 'JPEG')
#resized.save('photo_new_2.jpg', 'JPEG')

resizeimage.resize_crop(img, size).save('output-crop.jpg')
resizeimage.resize_cover(img, size).save('output-cover.jpg')
resizeimage.resize_contain(img, size).save('output-contain.jpg', img.format)
resizeimage.resize_width(img, maxwidth).save('output-width.jpg')
resizeimage.resize_height(img, maxheight).save('output-height.jpg')
resizeimage.resize_thumbnail(img, size).save('output-thumbnail.jpg')
resizeimage.resize('thumbnail', img, size).save('output-thumbnail-2.jpg')
