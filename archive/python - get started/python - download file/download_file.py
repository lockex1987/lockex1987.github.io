try:
    from urllib.request import urlretrieve
    print("Python 3")
except Exception as ex:
    from urllib import urlretrieve
    print("Python 2")

import urllib2
import requests

url = 'http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg'
path = 'mqdefault.jpg'

def download_1(url, path):
    urlretrieve(url, path)

def download_2(url, path):
    data = urllib2.urlopen(url).read()
    with open(path, 'wb') as f:
        f.write(data)

def download_3(url, path):
    data = requests.get(url).content
    with open(path, 'wb') as f:
        f.write(data)

download_1(url, "1.jpg")
download_2(url, "2.jpg")
download_3(url, "3.jpg")

