import requests

r = requests.get('http://localhost:8080/v1/search?type=artist&q=snoop')
print(r.json())
