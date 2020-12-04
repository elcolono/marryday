"""
account views
"""
from accounts.api.serializers.common import UserSerializer
from accounts.models import User
from rest_framework import generics


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
