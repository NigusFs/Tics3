import requests
from bs4 import BeautifulSoup as bs1

url = 'https://dmoj.ca/problem/16bitswonly'
page = requests.get(url)

soup = bs1(page.content, 'html.parser')

titulo = soup.find("h2",{"style": "color:#393630; display: inline-block"}).text

contenido_raw = soup.find("div",{"class": "content-description screen"}).text


input =  re.search(r'Sample Input\n(.*)Sample Output',contenido,re.DOTALL).[1]
output =  re.search(r'Sample Output\n(.*)',contenido,re.DOTALL).[1]
