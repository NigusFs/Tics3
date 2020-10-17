from django.urls import path

from . import views

urlpatterns = [
    path('problem/<int:problem_id>', views.ProblemView.as_view(), name='get_problem'),
    path('problem/', views.ProblemView.as_view(), name='create_problem')
]
