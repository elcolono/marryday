""" Account permissions """
from rest_framework import permissions

from .models import User


class IsUpdateUser(permissions.BasePermission):
    """ Permission class checks if user is owner of requested user details.

    Args:
        permissions.BasePermission (class):
        A base class from which all permission classes should inherit.
    """

    def has_permission(self, request, view):
        try:
            user = User.objects.get(
                pk=view.kwargs['pk'])
        except:
            return False

        if request.user == user:
            return True

        return False
