"""
Admin Settings
"""
from django.contrib import admin
from .models import Product, ProductImage, ProductCategory, ForwardingContact, ProductCategoryImage


# Register your models here.


class LocationImageInline(admin.TabularInline):
    model = ProductImage
    # min_num = 3


class ProductImageAdmin(admin.ModelAdmin):
    search_fields = ('title', 'image')
    list_display = ('uuid', 'title', 'image')
    list_filter = ('title', 'image')


class ForwardingContactsInline(admin.TabularInline):
    model = ForwardingContact


# Product Admin
class ProductAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active',)
    list_display = ('id', 'title', 'is_active', 'user',)
    list_filter = ('title', 'is_active', 'user',)
    inlines = [LocationImageInline]


class ProductCategoryImageInline(admin.TabularInline):
    model = ProductCategoryImage


class ProductCategoryAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')
    inlines = [ProductCategoryImageInline]


class RentObjectAdmin(admin.ModelAdmin):
    search_fields = ('title', 'location')
    list_display = ('title', 'location')
    list_filter = ('title', 'location')


class BookingAdmin(admin.ModelAdmin):
    search_fields = ('rent_object', 'start', 'end',)
    list_display = ('location', 'rent_object', 'start', 'end',)
    list_filter = search_fields = ('rent_object', 'start', 'end',)


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(ProductCategory, ProductCategoryAdmin)
