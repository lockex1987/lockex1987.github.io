import re

data = '''
<photo-url>1.jpg</photo-url>
<photo-url>2.jpg</photo-url>
<photo-url>3.jpg</photo-url>
<photo-url>4.jpg</photo-url>
<photo-url>5.jpg</photo-url>
<photo-url>6.jpg</photo-url>
'''

regex = r"<photo-url>(.+?)</photo-url>"
imagelist = re.findall(regex, data)
print(type(imagelist))
print(imagelist)
