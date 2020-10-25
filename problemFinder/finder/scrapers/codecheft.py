import json
import array
from bs4 import BeautifulSoup
import requests
import time
from finder.entities import Problem, TestCase
import re
regex = re.compile('.*(Input|Output):?\s*([\w&.\-\s]*)\n?')
import sys

def Parser(data, difficulty):
    body = data['body'].split('###')
    size = len(body)
    if size < 5 : 
        return None
    categories = Categories(data['tags'])
    outputs, inputs, body = Content(body)
    test_cases = [TestCase(test_input=inputs, output=outputs)]
    return Problem(title=data['problem_name'], content=body, difficulty=difficulty, source='https://www.codechef.com/problems/' + 
    data['problem_code'], testcases=test_cases, categories=categories)

def Categories(categories):
    categories = categories.split(',')
    tags = []
    for i in categories:
        soup = BeautifulSoup(i, "html.parser")
        tags.append(soup.a.string)
    return tags

def Content(content):
    Output, Inputs, cont, body = 0,0,0, []
    for i in reversed(content):
        if (cont == 1): 
            body.insert(0,i)
        elif "Output" in i:
            result = regex.search(i.replace('`', '').replace('\r', '').replace('\t', ''))
            Output = result.group(2).strip()
        elif "Input" in i: 
            result = regex.search(i.replace('`', '').replace('\r', '').replace('\t', ''))
            Inputs =result.group(2).strip()
            cont = 1   
    return Output, Inputs, body

def codechef(difficulty, start, quantity):
    url = 'https://www.codechef.com/problems/' + difficulty
    page_response=  requests.get(url, timeout=2)
    soup = BeautifulSoup(page_response.text, 'lxml')
    table = soup.find('tbody').find_all('tr')
    url = "https://www.codechef.com/api/contests/PRACTICE" 

    cont = 0
    for i in range(start,len(table)):
        aux = table[i].td.div.a['href']
        url_aux = url + aux
        res = requests.get(url_aux)
        
        if res.status_code ==  200:
            if res.json()['status'] == 'error': continue   
            if Parser(res.json(),difficulty) == None: continue      
            else: 
                print (Parser(res.json(),difficulty))
                cont = cont + 1
                if cont == quantity: break
        else: print ("error")
        time.sleep(1)
#314 medium
#446 easy
#93 hard

    


