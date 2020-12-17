import os, sys, fnmatch, base64, cStringIO
from PIL import Image
from io import BytesIO


size = (42, 42)
matches = []

for root, dirnames, filenames in os.walk(sys.argv[1]):
    for filename in fnmatch.filter(filenames, '*.jpg'):
        matches.append(os.path.join(root, filename))
#print matches

for infile in matches:
    outfile = os.path.splitext(infile)[0] + "_thumbnail.jpg"
    if infile != outfile:
        #.convert('LA')
        im = Image.open(infile)
        original_size = im.size
        im.thumbnail(size, Image.ANTIALIAS)
        #im.save(outfile, "JPEG")
        

        buffered = BytesIO()
        #buffered = cStringIO.StringIO()
        im.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue())
        #print(len(img_str))

        ratio = original_size[1] * 100.0 / original_size[0]
        print(ratio)

        with open(outfile + ".txt", "w") as imageFile:
            imageFile.write('''
            <picture class="placeholder" style="max-width: %dpx; max-height: %dpx; padding-bottom: %f%%;">
                <img class="preview" data-src="%s" src="data:image/jpeg;base64,%s"/>
            </picture>
            ''' % (original_size[0], original_size[1], ratio, infile, img_str))

# find <DIRECTORY> -type f -name '*_thumbnail.jpg' -exec rm {} +
# Black and white to reduce size
# https://opentechlabs.blogspot.com/2016/09/convert-image-to-base64-encoding-python.html
# https://stackoverflow.com/questions/31826335/how-to-convert-pil-image-image-object-to-base64-string?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa