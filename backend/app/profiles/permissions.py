from rest_framework import permissions
from profiles.models import Vendor


class IsUpdateVendor(permissions.BasePermission):

    def has_permission(self, request, view):
        # can write custom code
        try:
            user_vendor = Vendor.objects.get(
                pk=view.kwargs['pk'])
        except:
            return False

        if request.user.vendors.first() == user_vendor:
            return True

        return False

