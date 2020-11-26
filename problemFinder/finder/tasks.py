from finder.models import JudgesDaemon, Problem, TestCase, Category
from finder.scrapers.codeforces import get_problems_by_page_number
from finder.scrapers.codecheft import codechef
from finder.scrapers.dmoj import extract_many

def start_scrapers():
    judges = JudgesDaemon.objects.all()
    for judge in judges:
        if judge.name == "codeforces":
            problems = get_problems_by_page_number(judge.last_page+1)
        elif judge.name == "dmoj":
            problems = extract_many(1) # fix this value
        elif judge.name == "codechef":
            problems = codechef(judge.difficulty, judge.last_page+1, judge.quantity)
        for problem in problems:
            new_problem = Problem.objects.create(
                title=problem.title,
                content=problem.content,
                difficulty=problem.difficulty,
                source=problem.source
            )
            new_problem.save()
            for test in problem.testcases:
                new_problem_tests = TestCase.objects.create(
                    input_data=problem.test_input,
                    output_data=problem.output
                )
                new_problem_tests.save()
                new_problem.tests.add(new_problem_tests)
            for category in problem.categories:
                new_problem_category, _ = Category.objects.get_or_create(
                    name=category
                )
                new_problem.categories.add(new_problem_category)
            # log the amount of new problems added
        judge.last_page = judge.last_page+1
        judge.save()
