from django.urls import path

from . import views

urlpatterns = [
    path('problem/<int:problem_id>', views.ProblemView.as_view(), name='get_problem'),
    path('problem/', views.ProblemView.as_view(), name='create_problem'),
    path('filter/category/<str:category>', views.FilterByCategoryView.as_view(), name='filter_problems_by_category'),
    path('filter/difficulty/<str:difficulty>', views.FilterByDifficultyView.as_view(), name='filter_problems_by_difficulty'),
    path('problems', views.ListProblems.as_view(), name='list_problems'),
    path('categories', views.ListCategories.as_view(), name='list_categories'),
    path('user/', views.user_create_view, name='user_create'),
    path('user/auth/', views.user_is_auth, name='check_auth'),
    path('user/login/', views.login_view, name='user_login'),
    path('user/logout/', views.logout_view, name='user_logout'),
    path('daemon/', views.start_daemon, name='daemon'),
]
