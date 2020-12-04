from django.db import models


class Problem(models.Model):
    title = models.CharField(max_length=150)
    content = models.CharField(max_length=20000)
    difficulty = models.CharField(max_length=15)
    source = models.CharField(max_length=200)


class TestCase(models.Model):
    problem = models.ForeignKey(Problem, related_name="tests", on_delete=models.CASCADE)
    input_data = models.CharField(max_length=2000)
    output_data = models.CharField(max_length=2000)


class Category(models.Model):
    problems = models.ManyToManyField(Problem, related_name="categories")
    name = models.CharField(max_length=25)
    class Meta:
        indexes = [
            models.Index(fields=["name"])
        ]

class JudgesDaemon(models.Model):
    judge_name = models.CharField(max_length=100)
    last_page = models.IntegerField(default=0)
    quantity = models.IntegerField(default=20)
    running = models.BooleanField(default=False)
