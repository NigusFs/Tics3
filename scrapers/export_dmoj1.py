import requests
from bs4 import BeautifulSoup as bs1
import re
from dataclasses import dataclass
from typing import List

@dataclass
class TestCase:
	test_input: str
	output : str

@dataclass
class Problem:
	title: str
	body: str
	dificulty: str
	source: str
	testcase: List[TestCase]
	category: List[str]

def extract_problem(url):
	#url = 'https://dmoj.ca/problem/boardgames'
	page = requests.get(url)

	soup = bs1(page.content, 'html.parser')

	titulo = soup.find("h2",{"style": "color:#393630; display: inline-block"}).text

	contenido_raw = soup.find("div",{"class": "content-description screen"}).text

	categoria =soup.find("div",{"class": "toggled"}).text.split(", ")

	test_case= []
	try:
		many_test_cases =False

		input_sample_case =  re.search(r'Sample Input\n(.*)Sample Output',contenido_raw,re.DOTALL)[1]
		output_sample_case =  re.search(r'Sample Output\n(.*)',contenido_raw,re.DOTALL)[1]
		test_case.append(TestCase(input_sample_case,output_sample_case))

	except:
		many_test_cases = True
		input_sample_case =  re.findall(r'Sample Input \d(.+?)Sample Output',contenido_raw,re.DOTALL)
		output_sample_case = re.findall(r'Sample Output \d(.+?)\n',contenido_raw,re.DOTALL)

		for i in range(len(input_sample_case)):
			t1=TestCase(input_sample_case[i],output_sample_case[i])
			test_case.append(t1)
		

	if many_test_cases:
		enunciado =  re.search(r'(.*)Sample Input 1',contenido_raw,re.DOTALL)[1].replace('\n', '\n\n ') #sacar el replace si no se quiere con tantos espacios
	else:
		enunciado =  re.search(r'(.*)Sample Input',contenido_raw,re.DOTALL)[1].replace('\n', '\n\n ') #sacar el replace si no se quiere con tantos espacios
	

	dificultad=" "

	return Problem(titulo,enunciado,dificultad,"DMOJ",test_case,categoria)
	

