# Sửa các file content.opf, nav.xhtml, toc.ncx
rm ../books/mybook.epub
zip ../books/mybook.epub -DX0 ../boilerplate/mimetype
zip ../books/mybook.epub -rDX9 ../boilerplate/META-INF ../boilerplate/OEBPS
