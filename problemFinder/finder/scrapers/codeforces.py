import logging
import re
import requests

from bs4 import BeautifulSoup
from typing import List
from urllib import error, request

from finder.entities import Problem, TestCase

logger = logging.getLogger(__name__)

def _get_difficulty(rating: int):
    if rating < 1400:
        return "easy"
    elif rating < 1800:
        return "medium"
    return "hard"

def get_problems_url_by_topic(topic):
    url = f"http://codeforces.com/problemset?tags={topic}"
    try:
        response = request.urlopen(url)
    except error.HTTPError as err:
        logger.info("Found and error trying to open URL:%s %s"%(url, err))

    html = response.read()
    html = html.decode('utf-8')

    problems_url = re.findall(r'/problemset/problem/[0-9]+/[a-z A-Z 0-9]+', html)

    # passing the urls to a set to get rid of duplicates
    return set(problems_url)

def get_problems_url_by_page_number(page):
    url = f"https://codeforces.com/problemset/page/{page}"
    try:
        response = request.urlopen(url)
    except error.HTTPError as err:
        logger.info("Found and error trying to open URL:%s %s"%(url, err))

    html = response.read()
    html = html.decode('utf-8')

    problems_url = re.findall(r'/problemset/problem/[0-9]+/[a-z A-Z 0-9]+', html)

    # passing the url to a set to get rid of duplicates
    return set(problems_url)

def get_problems_by_page_number(page) -> List[Problem]:
    problem_urls = get_problems_url_by_page_number(page)
    return [get_problem_statement(url) for url in problem_urls]

def get_problem_statement(url) -> Problem:
    url = "http://codeforces.com" + url
    try:
        response = request.urlopen(url)
        res = requests.get(url)
        soup = BeautifulSoup(res.content, 'html.parser')
    except error.HTTPError as err:
        logger.info("Found and error trying to open URL:%s %s"%(url, err))
        return None

    title_regex = r'<div class=\"header\"><div class=\"title\">(.*)</div><div class=\"time-limit\">'

    html = response.read()
    html = html.decode('utf-8')
    
    print(url)
    inputs = []
    outputs = []
    web_test_cases = soup.find_all("div", class_=re.compile("([in|out]+put)"))
    for test_case in web_test_cases:
        if not test_case.pre:
            continue
        if test_case.div.text.lower() == "input":
            inputs.append(test_case.pre.text.strip())
        else:
            outputs.append(test_case.pre.text.strip())
    assert len(inputs) == len(outputs) # the amount of inputs and outputs must be the same

    title = re.findall(title_regex, html)[0]
    difficulty = ""
    categories = []
    web_categories = soup.find_all("span", class_="tag-box")
    for category in web_categories:
        if not category.text:
            continue
        if category['title'].lower() == "difficulty":
            difficulty = _get_difficulty(int(category.text.strip()[1:]))
        else:
            categories.append(category.text.strip())

    problem_statement = soup.find("div", class_="problem-statement")
    content = problem_statement.find("div", class_=None).text
    input_specification = problem_statement.find("div", class_="input-specification")
    input_specification = "\nInput\n"+"\n".join([paragraph.text for paragraph in input_specification.select("div > p")]) if input_specification else ""
    output_specification = problem_statement.find("div", class_="output-specification")
    output_specification = "\nOutput\n"+"\n".join([paragraph.text for paragraph in output_specification.select("div > p")]) if output_specification else ""
    content += input_specification + output_specification
    
    test_cases = [TestCase(input_data=inputs[i], output_data=outputs[i]) for i in range(len(inputs))]
    return Problem(title=title, content=content, difficulty=difficulty, source=url, testcases=test_cases, categories=categories)
