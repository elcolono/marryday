"""
Admin Settings
"""
from django.contrib import admin
from .models import CityImage, District, City, Province, State, Country, Postcode


class CityImageInline(admin.TabularInline):
    model = CityImage
    # min_num = 3


class DistrictAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')


class CityAdmin(admin.ModelAdmin):
    readonly_fields = ('preview_image',)
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')
    inlines = [CityImageInline]


class ProvinceAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')


class StateAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')


class CountryAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')


class PostcodeAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')


# Register your models here.
admin.site.register(Province, ProvinceAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(District, DistrictAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(Postcode, PostcodeAdmin)
