import os.path
import zipfile
from BeautifulSoup import BeautifulSoup

epub = zipfile.ZipFile('my_ebook.epub', 'w')

# The first file must be named "mimetype"
epub.writestr("mimetype", "application/epub+zip")

# The filenames of the HTML are listed in html_files
html_files = ['001.html']

# We need an index file, that lists all other HTML files
# This index file itself is referenced in the META_INF/container.xml file
epub.writestr("META-INF/container.xml", '''<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/Content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>''');

# The index file is another XML file, living per convention
# in OEBPS/Content.xml
index_tpl = '''<package version="2.0"
  xmlns="http://www.idpf.org/2007/opf">
  <metadata/>
  <manifest>
    %(manifest)s
  </manifest>
  <spine toc="ncx">
    %(spine)s
  </spine>
</package>'''

manifest = ""
spine = ""
images = []

# Write each HTML file to the ebook, collect information for the index
for i, html in enumerate(html_files):
    basename = os.path.basename(html)
    manifest += '<item id="file_%s" href="%s" media-type="application/xhtml+xml"/>' % (i + 1, basename)
    spine += '<itemref idref="file_%s" />' % (i + 1)
    
    epub.write(html, 'OEBPS/' + basename)

    soup = BeautifulSoup(open(html).read())
    for img in soup.findAll('img'):
        if not img['src'].startswith('http://'):
            # Same problem again: We flatten layers, so this won't work
            # properly in the wild
            images.append('images/' + os.path.basename(img['src']))
            img['src'] = os.path.basename(img['src'])
    # likewise loop through links, objects, ..., then store the manipulated HTML
    #epub.writestr(str(soup), 'OEBPS/' + basename)

# Now we have to embed the found images as well:
for img in images:
    #epub.write(img, 'OEBPS/' + img)
    pass

# Finally, write the index
epub.writestr('OEBPS/Content.opf', index_tpl % { 'manifest': manifest, 'spine': spine, })
