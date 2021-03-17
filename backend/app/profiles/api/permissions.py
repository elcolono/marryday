from rest_framework import permissions
from ..models import Company

class IsUpdateCompany(permissions.BasePermission):

    def has_permission(self, request, view):
        # can write custom code
        try:
            user_company = Company.objects.get(
                pk=view.kwargs['pk'])
        except:
            return False

        if request.user.companies.first() == user_company:
            return True

        return False
