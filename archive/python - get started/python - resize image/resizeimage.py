'''
Resize image
* `resize_crop` crop the image with a centered rectangle of the specified size.
* `resize_cover` resize the image to fill the specified area, crop as needed (same behavior as `background-size: cover`).
* `resize_contain` resize the image so that it can fit in the specified area, keeping the ratio and without crop (same behavior as `background-size: contain`). 
* `resize_height` resize the image to the specified height adjusting width to keep the ratio the same.
* `resize_width` resize the image to the specified width adjusting height to keep the ratio the same.
* `resize_thumbnail` resize image while keeping the ratio trying its best to match the specified size.
* `resize(method, image, size)` resize image with the specified method : 'crop', 'cover', 'contain', 'width', 'height' or 'thumbnail'.
'''
import math
import sys
from PIL import Image


def resize_crop(image, size):
    image = image.copy()
    ow, oh = image.size
    nw, nh = size
    left = (ow - nw) / 2
    top = (oh - nh) / 2
    right = ow - left
    bottom = oh - top
    rect = [int(round(x)) for x in (left, top, right, bottom)]
    left, top, right, bottom = rect
    crop = image.crop((left, top, right, bottom))
    return crop


def resize_cover(image, size):
    img = image.copy()
    ow, oh = image.size
    nw, nh = size
    ratio = max(nw / float(ow), nh / float(oh))
    new_size = (
        int(round(ow * ratio)),
        int(round(oh * ratio))
    )
    img = img.resize(new_size, Image.LANCZOS)
    img = resize_crop(img, size)
    return img


def resize_contain(image, size):
    nw, nh = size
    img = image.copy()
    img.thumbnail(size, Image.LANCZOS)
    ow, oh = img.size
    mode = 'RGB' # RGBA or RGB (JPEG => RGB, PNG => RGBA)
    background = Image.new(mode, size, (255, 255, 255, 0))
    img_position = (
        int(round((nw - ow) / 2)),
        int(round((nh - oh) / 2))
    )
    background.paste(img, img_position)
    return background


def resize_width(image, new_width):
    ow, oh = image.size
    img = image.copy()
    new_height = int(math.floor(new_width / float(ow) * oh))
    img.thumbnail((new_width, new_height), Image.LANCZOS)
    return img


def resize_height(image, new_height):
    ow, oh = image.size
    img = image.copy()
    new_width = int(math.floor(new_height / float(oh) * ow))
    img.thumbnail((new_width, new_height), Image.LANCZOS)
    return img


def resize_thumbnail(image, size):
    img = image.copy()
    img.thumbnail(size, Image.LANCZOS)
    return img


def resize(method, image, size):
    if method not in ['crop', 'cover', 'contain', 'width', 'height', 'thumbnail']:
        raise ValueError(u"method argument should be one of 'crop', 'cover', 'contain', 'width', 'height' or 'thumbnail'")
    return getattr(sys.modules[__name__], 'resize_%s' % method)(image, size)
