from django.test import TestCase as DjangoTestCase

from .models import Problem, Category

class FilterViewTestCase(DjangoTestCase):
    def _build_problem(self, category="default", difficulty="hard"):
        problem = Problem.objects.create(
            title="Some Title", 
            content="some content",
            difficulty=difficulty,
            source="somepage.com/problem"
        )
        problem.categories.add(Category.objects.create(name=category))
        return problem

    def test_get_problems_filtered_by_category(self):
        dp_problems = [self._build_problem("DP") for _ in range(5)]
        response = self.client.get('/finder/filter/category/DP') 

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        dp_problems_count = 0
        for problem in response_data:
            for problem_category in problem["categories"]:
                if problem_category["name"] == "DP":
                    dp_problems_count += 1
       
        self.assertEqual(len(response_data), 5)
        self.assertEqual(dp_problems_count, 5)

    def test_get_problems_non_existant_category(self):
        response = self.client.get("/finder/filter/category/not_a_category")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_get_problems_filtered_by_difficulty(self):
        easy_problems = [self._build_problem(difficulty="easy") for _ in range(5)]
        response = self.client.get('/finder/filter/difficulty/easy') 

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        easy_problems_count = 0
        for problem in response_data:
            if problem["difficulty"] == "easy":
                easy_problems_count += 1
       
        self.assertEqual(len(response_data), 5)
        self.assertEqual(easy_problems_count, 5)

    def test_get_problems_non_existant_difficulty(self):
        response = self.client.get("/finder/filter/difficulty/not_existant_difficulty")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])
