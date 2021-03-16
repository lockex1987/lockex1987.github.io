# Sửa các file content.opf, nav.xhtml, toc.ncx
rm mybook.epub
zip mybook.epub -DX0 mimetype
zip mybook.epub -rDX9 META-INF OEBPS
