""" Account views """
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import User
from .permissions import IsUpdateUser
from .serializers.common import UserSerializer


class UserView(generics.RetrieveUpdateAPIView):
    """ Generic User view for retrieving, updating a model instance """
    permission_classes = [IsAuthenticated, IsUpdateUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()
