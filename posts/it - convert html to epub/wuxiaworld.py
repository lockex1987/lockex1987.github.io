#!/usr/bin/python
# coding: latin-1
import cfscrape
import re
from bs4 import BeautifulSoup
from ebooklib import epub

# Get the text at the set URL
scraper = cfscrape.create_scraper()

# Create the epub file
book = epub.EpubBook()

title = 'WDQK' # The title you want to give to the book
beginning = 1 # First chapter
end = 600 # Last chapter

for i in range(beginning, end+1):
    # Set the adress here
    strpage = scraper.get("http://www.wuxiaworld.com/wdqk-index/wdqk-chapter-"+str(i)+"/").content 
    
    # Modifies the HTML received
    soup = BeautifulSoup(strpage, 'html5lib')
    div = soup.select_one('div[itemprop="articleBody"]')
    for a in div.select("a"):
	    a.decompose()

    # Creates a chapter
    c1 = epub.EpubHtml(file_name='chap_'+str(i)+'.xhtml')
    c1.content = div.encode('ascii')
    book.add_item(c1)
    if i == debut:
        book.spine = ['nav', c1]
    else:
        book.spine.append(c1)
    print i

book.add_item(epub.EpubNcx())
book.add_item(epub.EpubNav())

# Defines CSS style
style = 'p {text-align: left;}'
nav_css = epub.EpubItem(uid="style_nav", file_name="style/nav.css", media_type="text/css", content=style)

# Adds CSS file
book.add_item(nav_css)

# Creates table of contents
book.toc = (c1)

epub.write_epub(title + '.epub', book, {})
