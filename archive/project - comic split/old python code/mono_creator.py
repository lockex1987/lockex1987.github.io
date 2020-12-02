# -*- coding: utf-8 -*-
from PIL.ImageEnhance import Contrast
from PIL.ImageOps import autocontrast


def create_mono_image(origin):
    # Cách 1
    #return origin.convert(mode="1")

    # we first change the contrast of the image (to remove noise in the gutters) and then digitize
    # them. This tells us how much to set the contrast to
    contrast = 0.8
    bwimg = origin.convert("L")
    # barrier (in terms of a scale from 1 to 255). Used in dividing the image into black and
    # white portions - if a color is < barrier then it is converted to black else white. The
    # numbers here come from trial and error!
    barrier = 210
    _digitize = lambda color: 0 if (color // barrier == 0) else 255
    return Contrast(autocontrast(bwimg, 10)).enhance(contrast).point(_digitize)
