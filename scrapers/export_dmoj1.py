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

def extract_many(pages) -> List[Problem] :
	current_page=0 #get current page (guardarla en un txt ? xd)
	recolected_problems=[]
	count_problems=pages*50
	count=0
	list_problem = requests.get("https://dmoj.ca/api/problem/list").json() #ocupa  memoria (carga la info basica de los 3400 problemas)
	for code_problem in list_problem:
		recolected_problems.append(extract_problem(code_problem))
		count+=1
		if count > count_problems:
			#store last page visited
			last_page_visited=current_page+pages
			#safe last_page_visited (insisto en un text)
			return recolected_problems
			break

def extract_problem(code) -> Problem:
	url = 'https://dmoj.ca/problem/{}'.format(code)
	page = requests.get(url)

	soup = bs1(page.content, 'html.parser')

	titulo = soup.find("h2",{"style": "color:#393630; display: inline-block"}).text

	contenido_raw = soup.find("div",{"class": "content-description screen"}).text

	categoria =soup.find("div",{"class": "toggled"}).text.split(", ")

	test_case= []
	try:
		many_test_cases =False

		input_sample_case =  re.search(r'Sample Input\n(.*)Sample Output',contenido_raw,re.DOTALL)[1].strip()
		output_sample_case =  re.search(r'Sample Output\n(.*)',contenido_raw,re.DOTALL)[1].strip()
		test_case.append(TestCase(input_sample_case,output_sample_case))

	except:
		many_test_cases = True
		input_sample_case =  re.findall(r'Sample Input \d(.+?)Sample Output',contenido_raw,re.DOTALL)
		output_sample_case = re.findall(r'Sample Output \d(.+?)\n',contenido_raw,re.DOTALL)

		for i in range(len(input_sample_case)):
			t1=TestCase(input_sample_case[i].strip(),output_sample_case[i].strip())
			test_case.append(t1)
		

	if many_test_cases:
		enunciado =  re.search(r'(.*)Sample Input 1',contenido_raw,re.DOTALL)[1].replace('\n', '\n\n ') #sacar el replace si no se quiere con tantos espacios
	else:
		enunciado =  re.search(r'(.*)Sample Input',contenido_raw,re.DOTALL)[1].replace('\n', '\n\n ') #sacar el replace si no se quiere con tantos espacios
	
	points_problem = requests.get("https://dmoj.ca/api/v2/problem/{}".format(code)).json()['data']['object']['points']

	if  points_problem >40:
		dificultad="Dificil"
	elif points_problem >20:
		dificultad="Medio"
	else:
		dificultad="Facil"

	return Problem(titulo,enunciado,dificultad,"DMOJ",test_case,categoria)
	
number_pages=0.1
print(extract_many(number_pages))
