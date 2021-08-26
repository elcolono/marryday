""" Account urls """
from django.urls import path, include
from allauth.socialaccount.providers.google import views as google_views

from .views import UserView, GoogleLogin, google_callback

urlpatterns = [
    path('', include('allauth.urls')),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/',
         include('rest_auth.registration.urls')),
    path('user/<int:pk>/', UserView.as_view(), name="user-detail"),

    # Google Social Login
    path('auth/google/', GoogleLogin.as_view(), name="google-login"),
    path('google/login/callback', google_callback, name='google_callback'),
    path('auth/google/url/', google_views.oauth2_login)
]
