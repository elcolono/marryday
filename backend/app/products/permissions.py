from rest_framework import permissions

from products.models import Product
from profiles.models import Vendor


class IsProductOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            product = Product.objects.get(pk=view.kwargs['pk'])
        except:
            return False

        if request.user == product.user:
            return True

        return False
