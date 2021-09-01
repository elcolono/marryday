""" Account urls """
from django.urls import path, include
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView

from allauth.socialaccount.providers.google import views as google_views

from .views import UserView, GoogleLogin, google_callback, forgot_password

urlpatterns = [
    path('', include('allauth.urls')),
    path('auth/', include('dj_rest_auth.urls')),

    # Registration
    path('auth/registration/', include('rest_auth.registration.urls')),

    # Password Reset
    # Custom 'send-custom-reset' endpoint because of 'invalid UID' ERROR from default route
    # With the help of https://stackoverflow.com/questions/67956157/django-rest-auth-uid-invalid-value-error
    path('forgot-password/', forgot_password),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # Get User
    path('user/<int:pk>/', UserView.as_view(), name="user-detail"),

    # Google Social Login
    path('auth/google/', GoogleLogin.as_view(), name="google-login"),
    path('google/login/callback', google_callback, name='google_callback'),
    path('auth/google/url/', google_views.oauth2_login)
]
