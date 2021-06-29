from django.contrib import admin
from .models import Visitor, Vendor, Location
from django.template.defaultfilters import slugify


# Vendor
class CompanyAdmin(admin.ModelAdmin):
    # prepopulated_fields     = {'slug': ('title',)}
    autocomplete_fields = ('user',)
    search_fields = ('vendor_name',)
    readonly_fields = ('slug', 'created_by',)
    list_display = ('id', 'vendor_name', 'slug',)

    def save_model(self, request, obj, form, change):
        obj.slug = f"{slugify(form.cleaned_data['vendor_name'])}"
        if getattr(obj, 'created_by', None) is None:
            obj.created_by = request.user
        obj.save()

# Product


class LocationAdmin(admin.ModelAdmin):
    search_fields = ('title',)

# Visitor


class VisitorAdmin(admin.ModelAdmin):
    autocomplete_fields = ['user']

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'user', None) is None:
            obj.user = request.user
        obj.save()


# Register your models here.
admin.site.register(Visitor, VisitorAdmin)
admin.site.register(Vendor, CompanyAdmin)
admin.site.register(Location, LocationAdmin)
