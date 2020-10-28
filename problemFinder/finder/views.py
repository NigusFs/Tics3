from django.http import JsonResponse, QueryDict
from django.shortcuts import get_object_or_404
from django.views import View

from .models import Problem, TestCase, Category
from .serializers import ProblemSerializer

class ProblemView(View):
    def get(self, request, problem_id):
        problem = get_object_or_404(Problem, pk=problem_id)
        problem_serializer = ProblemSerializer(problem)
        return JsonResponse(problem_serializer.data, status=200)

    def post(self, request):
        problem_serializer = ProblemSerializer(data=request.POST)
        if problem_serializer.is_valid():
            problem_serializer.save()
            return JsonResponse(problem_serializer.data, status=201)
        else:
            return JsonResponse(problem_serializer.errors, status=400)
    
    def put(self, request, problem_id):
        problem = get_object_or_404(Problem, pk=problem_id)
        problem_serializer = ProblemSerializer(problem, data=QueryDict(request.body), partial=True)
        if problem_serializer.is_valid():
            problem_serializer.save()
            return JsonResponse(problem_serializer.data, status=200)
        else:
            return JsonResponse(problem_serializer.errors, status=400)
    
    def delete(self, request, problem_id):
        problem = get_object_or_404(Problem, pk=problem_id)
        problem.delete()
        return JsonResponse({
            'description': "Problem deleted successfully :)"
        }, status=200)

class FilterByCategoryView(View):
    def get(self, request, category):
        problems = Problem.objects.filter(categories__name=category)
        problems_serializer = ProblemSerializer(problems, many=True)
        return JsonResponse(problems_serializer.data, safe=False, status=200)

class FilterByDifficultyView(View):
    def get(self, request, difficulty):
        problems = Problem.objects.filter(difficulty=difficulty)
        problems_serializer = ProblemSerializer(problems, many=True)
        return JsonResponse(problems_serializer.data, safe=False, status=200)


