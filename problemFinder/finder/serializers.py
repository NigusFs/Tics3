from django.contrib.auth.models import User
from rest_framework import serializers

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
    tests = TestCaseSerializer(TestCase, many=True)
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'password']
