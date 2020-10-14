from django.db import models


class Problem(models.Model):
    title = models.CharField(max_length=25)
    content = models.CharField(max_length=1000)
    difficulty = models.CharField(max_length=15)
    source = models.CharField(max_length=200)


class TestCase(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    input_data = models.CharField(max_length=1000)
    output_data = models.CharField(max_length=1000)


class Category(models.Model):
    problems = models.ManyToManyField(Problem)
    name = models.CharField(max_length=25)
    class Meta:
        indexes = [
            models.Index(fields=["name"])
        ]


class JudgesDaemon(models.Model):
    codeforces_last_page = models.IntegerField(default=1)