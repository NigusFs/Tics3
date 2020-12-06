from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('finder/', include('finder.urls')),
    path('auth/', obtain_auth_token),
]
