import pypub
epub = pypub.Epub('My First Epub')
#chapter = pypub.create_chapter_from_url('https://en.wikipedia.org/wiki/EPUB')
chapter = pypub.create_chapter_from_file('001.html')
epub.add_chapter(chapter)
epub.create_epub('OUTPUT_DIRECTORY')
