import requests
from bs4 import BeautifulSoup as bs1
from typing import List
import re
import time

from finder.entities import Problem, TestCase

def extract_many(page=1) -> List[Problem] :
	headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'}
	response = requests.get("https://dmoj.ca/problems/?page={}".format(page),headers=headers)
	response.close()
	soup = bs1(response.content, 'html.parser')
	table_problems = str(soup.find("table"))
	list_code_problems=re.findall(r'\/problem\/([a-z A-Z 0-9]+)\"',table_problems)

	return [extract_problem(code_problem) for code_problem in list_code_problems ]

def extract_problem(code) -> Problem:
	url = 'https://dmoj.ca/problem/{}'.format(code)
	page = requests.get(url)
	page.close()
	soup = bs1(page.content, 'html.parser')

	titulo = soup.find("h2",{"style": "color:#393630; display: inline-block"}).text
	contenido_raw = soup.find("div",{"class": "content-description screen"}).text

	categoria =soup.find("div",{"class": "toggled"}).text.split(", ")
	test_case, many_test_cases=extract_testcase(contenido_raw)
	enunciado=extract_enunciado(contenido_raw, many_test_cases)
	dificultad = extract_dificultad(code)	
	
	time.sleep(1.5)
	return Problem(titulo, enunciado, dificultad, "DMOJ", test_case, categoria)


def extract_testcase(contenido_raw):
	test_case= []

	if  re.search(r'Sample Input\n(.+?)Sample Output',contenido_raw,re.DOTALL) != None:
		many_test_cases = False
		input_sample_case =  re.search(r'Sample Input\n(.+?)Sample Output',contenido_raw,re.DOTALL)[1].strip()
		output_sample_case =  re.search(r'\nSample Output\n(.+?)\n(Explanation|\n|Sample Explanation|Judge)',contenido_raw,re.DOTALL)[1].strip()
		test_case.append(TestCase(input_sample_case,output_sample_case))

	elif re.findall(r'Sample Input \d(.+?)Sample Output',contenido_raw,re.DOTALL) != None :
		many_test_cases = True
		input_sample_case =  re.findall(r'Sample Input \d(.+?)Sample Output',contenido_raw,re.DOTALL)
		output_sample_case = re.findall(r'\nSample Output \d(.+?)\n(Sample Input \d|\n|Explanation|Sample Explanation|Judge )',contenido_raw,re.DOTALL)
		
		for i in range(len(input_sample_case)):
			t1=TestCase(input_sample_case[i].strip(),output_sample_case[i][0])
			test_case.append(t1)
	else:
		many_test_cases = None

	return test_case, many_test_cases 

def extract_enunciado(contenido_raw,many_test_cases ):
	try :
		if many_test_cases:
			enunciado =  re.search(r'(.*)Sample Input 1',contenido_raw,re.DOTALL)[1].replace('\n', '\n\n ') #sacar el replace si no se quiere con tantos espacios
		else:
			enunciado =  re.search(r'(.*)Sample Input',contenido_raw,re.DOTALL)[1].replace('\n', '\n\n ') #sacar el replace si no se quiere con tantos espacios
	except:
		enunciado= contenido_raw

	return enunciado

def extract_dificultad(code):
	response = requests.get("https://dmoj.ca/api/v2/problem/{}".format(code))
	points_problem = response.json()['data']['object']['points']
	print(code)
	response.close()
	if  points_problem >=30:
		dificultad="Dificil"
	elif points_problem >=10:
		dificultad="Medio"
	else:
		dificultad="Facil"
	return dificultad


print(extract_problem("bohemianrhaksody"))
