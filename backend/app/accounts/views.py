""" Account views """
import urllib.parse

from dj_rest_auth.registration.serializers import SocialLoginSerializer
from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

from dj_rest_auth.registration.views import SocialLoginView

from .models import User
from .permissions import IsUpdateUser
from .serializers.common import UserSerializer


class UserView(generics.RetrieveUpdateAPIView):
    """ Generic User view for retrieving, updating a User model instance """
    permission_classes = [IsAuthenticated, IsUpdateUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

    @property
    def callback_url(self):
        # use the same callback url as defined in your GitHub app, this url
        # must be absolute:
        return self.request.build_absolute_uri(reverse('google_callback'))


def google_callback(request):
    params = urllib.parse.urlencode(request.GET)
    return redirect(f'{settings.CLIENT_DOMAIN}login?{params}')
