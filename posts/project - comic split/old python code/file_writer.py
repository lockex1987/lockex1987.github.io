# -*- coding: utf-8 -*-


def write_files(origin, rows, frames, fimgs, prefix):
    #write_list(origin, rows, "output/row-%.2d.jpg")
    write_list(origin, frames, "output/" + prefix + "%.2d.jpg")
    #write_list(origin, fimgs, "output/img-%.2d.jpg")


def write_list(origin, arr, pattern):
    for i, dimension in enumerate(arr):
        file_name = pattern % (i + 1)
        origin.crop(dimension).save(file_name)
