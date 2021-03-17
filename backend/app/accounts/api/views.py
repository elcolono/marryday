"""
account views
"""
from accounts.api.serializers.common import UserSerializer
from accounts.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsUpdateUser

# class UserListView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


class UserView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsUpdateUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()
