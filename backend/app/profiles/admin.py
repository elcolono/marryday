from django.contrib import admin
from .models import Visitor, Vendor


# Vendor
class VendorAdmin(admin.ModelAdmin):
    autocomplete_fields = ('user',)


# Visitor
class VisitorAdmin(admin.ModelAdmin):
    autocomplete_fields = ['user']

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'user', None) is None:
            obj.user = request.user
        obj.save()


# Register your models here.
admin.site.register(Visitor, VisitorAdmin)
admin.site.register(Vendor, VendorAdmin)
