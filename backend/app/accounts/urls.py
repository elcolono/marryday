""" Account urls """
from django.urls import path, include

from .views import UserView

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/',
         include('rest_auth.registration.urls')),
    path('user/<int:pk>/', UserView.as_view(), name="user-detail"),
]
