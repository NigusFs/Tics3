import requests
from bs4 import BeautifulSoup as bs1
import re

url = 'https://dmoj.ca/problem/16bitswonly'
page = requests.get(url)

soup = bs1(page.content, 'html.parser')

titulo = soup.find("h2",{"style": "color:#393630; display: inline-block"}).text

contenido_raw = soup.find("div",{"class": "content-description screen"}).text

#print(contenido_raw)
enunciado =  re.search(r'(.*)Sample Input',contenido_raw,re.DOTALL)[1].replace('\n', '\n\n ')
input_sample_case =  re.search(r'Sample Input\n(.*)Sample Output',contenido_raw,re.DOTALL)[1]
output_sample_case =  re.search(r'Sample Output\n(.*)',contenido_raw,re.DOTALL)[1]

print(enunciado)