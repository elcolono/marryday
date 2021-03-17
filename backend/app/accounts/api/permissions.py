from rest_framework import permissions
from ..models import User


class IsUpdateUser(permissions.BasePermission):

    def has_permission(self, request, view):
        # can write custom code
        try:
            user = User.objects.get(
                pk=view.kwargs['pk'])
        except:
            return False

        if request.user == user:
            return True

        return False
