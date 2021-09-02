"""
Admin Settings
"""
from django.contrib import admin
from .models import Product, ProductImage, ProductCategory, ForwardingContact


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


class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ('preview_image',)
    search_fields = ('title', 'is_active', 'address')
    list_display = ('id', 'title', 'is_active', 'address')
    list_filter = ('title', 'is_active', 'address')
    inlines = [LocationImageInline]
    fieldsets = fieldsets = (
        ('General', {
            'fields': ('is_active', 'user', 'category', 'title', 'slug', 'description', 'details',)
        }),
        ('Contact', {
            'fields': ('address', 'street_number', 'public_email', 'public_phone',)
        }),
        ('Geometry', {
            'fields': ('geometry', 'utc_offset',)
        }),
        ('Reviews', {
            'fields': ('reviews', 'rating', 'user_ratings_total',)
        }),
        ('Booking', {
            'fields': ('day_price',)
        }),
        ('Images', {
            'fields': ('preview_image',)
        }),
    )


class ProductCategoryAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')


class RentObjectAdmin(admin.ModelAdmin):
    search_fields = ('title', 'location')
    list_display = ('title', 'location')
    list_filter = ('title', 'location')


class BookingAdmin(admin.ModelAdmin):
    search_fields = ('rent_object', 'start', 'end',)
    list_display = ('location', 'rent_object', 'start', 'end',)
    list_filter = search_fields = (
        'rent_object', 'start', 'end',)


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(ProductCategory, ProductCategoryAdmin)
