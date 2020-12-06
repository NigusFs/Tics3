from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Category, Problem, TestCase

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ['input_data', 'output_data']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class ProblemSerializer(serializers.ModelSerializer):
    tests = TestCaseSerializer(many=True)
    categories = CategorySerializer(many=True)
    class Meta:
        model = Problem
        fields = [
            'pk',
            'title',
            'content',
            'difficulty',
            'tests',
            'categories'
        ]
    
    def create(self, validated_data):
        tests = validated_data.pop('tests')
        categories = validated_data.pop('categories')
        problem = Problem.objects.create(**validated_data)
        for test in tests:
            TestCase.objects.create(problem=problem, **test)
        for category in categories:
            print(category)
            cat, created = Category.objects.get_or_create(**category)
            if created:
                cat.save()
            problem.categories.add(cat)
        return problem
    
    # def update(self, instance, validated_data):
    #     print(validated_data)
    #     instance = Problem.objects.get(validated_data.pk)
    #     instance.tests = validated_data.pop('tests', instance.tests)
    #     instance.categories = validated_data.pop('categories', instance.categories)
    #     for test in tests:
    #         TestCase.objects.create(problem=problem, **test)
    #     for category in categories:
    #         print(category)
    #         cat, created = Category.objects.get_or_create(**category)
    #         if created:
    #             cat.save()
    #         problem.categories.add(cat)
    #     return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user