"""
Admin Settings
"""
from django.contrib import admin
from .models import CityImage, District, City, Province, State, Country


class CityImageInline(admin.TabularInline):
    model = CityImage
    # min_num = 3


class DistrictAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active', 'locality')
    list_display = ('title', 'is_active', 'locality')
    list_filter = ('title', 'is_active',  'locality')


class CityAdmin(admin.ModelAdmin):
    readonly_fields = ('preview_image',)
    search_fields = ('title', 'is_active',  'postcode', 'province')
    list_display = ('title', 'is_active', 'postcode', 'province')
    list_filter = ('title', 'is_active', 'postcode', 'province')
    inlines = [CityImageInline]


class ProvinceAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active', 'state')
    list_display = ('title', 'is_active', 'state')
    list_filter = ('title', 'is_active',  'state')


class StateAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active',  'Province')
    list_display = ('title', 'is_active',  'country')
    list_filter = ('title', 'is_active',  'country')


class CountryAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')


# Register your models here.
admin.site.register(Province, ProvinceAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(District, DistrictAdmin)
admin.site.register(State, StateAdmin)
