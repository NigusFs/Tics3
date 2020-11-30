from django.http import JsonResponse, QueryDict
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
<<<<<<< HEAD
from django.contrib.auth.models import User, Group
=======
from django.contrib.auth.models import User
>>>>>>> add delete problem with authentification and change testcase scrapper of dmoj
from django.shortcuts import get_object_or_404
from django.views import View
from django.views.decorators.http import require_http_methods

from .models import Problem, TestCase, Category
<<<<<<< HEAD
from .tasks import start_scrapers
from .serializers import (
    CategorySerializer,
    ProblemSerializer,
    UserSerializer,
)

def user_is_admin(user):
    return user.groups.filter(name='admin').exists()
=======
from .serializers import ProblemSerializer
from .serializers import CategorySerializer
from .serializers import ProblemSerializer, UserSerializer

from rest_framework import status

#borrar esto- es inseguro
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
>>>>>>> add delete problem with authentification and change testcase scrapper of dmoj

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

    @method_decorator(csrf_exempt)
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

class ListProblems(View): 
    def get(self, request):
        list_problems = Problem.objects.all()
        problems_serializer = ProblemSerializer(list_problems, many=True)
        return JsonResponse(problems_serializer.data, safe=False, status=200)

@require_http_methods(["POST"])
def user_create_view(request):
    user_serializer = UserSerializer(data=request.POST)
    if user_serializer.is_valid():
        User.objects.create_user(
            username = request.POST['username'],
            password = request.POST['password'],
            email = request.POST['email']
        )
        return JsonResponse({
            'description': 'User created successfully !'
        }, status=201)
    else:
        return JsonResponse(user_serializer.errors, status=400)

@require_http_methods(["POST"])
def login_view(request):
    form = AuthenticationForm(data=request.POST)
    if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({
                'description': 'Succesfully Logged in ! :)'
            }, status=200)
    else:
        return JsonResponse(form.errors, status=400)
    return JsonResponse({'description': 'Could not Log in :('}, status=404)

def logout_view(request):
    logout(request)
    return JsonResponse({
        'description': 'Succesfully Logged out ! :)'
    }, status=200)


class ListCategories(View): 
    def get(self, request):
        list_categories = Category.objects.all()
        category_serializer = CategorySerializer(list_categories, many=True)
        return JsonResponse(category_serializer.data, safe=False, status=200)

@require_http_methods(["POST"])
def start_daemon(request):
    start_scrapers()
    return JsonResponse({
        'description': 'Finished ! :)'
    }, status=200)
