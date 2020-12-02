from django.test import TestCase as DjangoTestCase
from django.contrib.auth.models import User, Group

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

class ProblemsTestCase(DjangoTestCase):
    def setUp(self):
        self.usr = User.objects.create_user(username="test", email="test@test.com", password="test")
        self.admin_group = Group.objects.create(name="admin")
        self.usr.groups.add(self.admin_group)

    def test_create_problem_without_login(self):
        response = self.client.post("/finder/problem/", {
            "title": "Problem 1",
            "content": "lorem ipsum dolor",
            "difficulty": "hard",
            "tests": [{"input_data": "123", "output_data": "1"}],
            "categories": ["DP", "Graphs"]
        })
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Problem.objects.all().count(), 0)
    
    def test_create_problem_when_logged_in(self):
        self.client.login(username="test", password="test")
        # self.client.post("/finder/user/login", {"username": "test", "password": "test"})
        response = self.client.post("/finder/problem/", {
            "title": "Problem 1",
            "content": "lorem ipsum dolor",
            "difficulty": "hard",
            "tests": [{"input_data": "123", "output_data": "1"}],
            "categories": [{"name": "DP"}, {"name": "Graphs"}]
        })
        print(response.json())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Problem.objects.all().count(), 1)
    