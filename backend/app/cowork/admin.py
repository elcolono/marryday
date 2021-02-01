"""
Admin Settings
"""
from django.contrib import admin
from .models import Location, RentObject, Booking, LocationImage, CityImage, District, City, Province, State, Country, ForwardingContact, OpeningHours
# Register your models here.


class CityImageInline(admin.TabularInline):
    model = CityImage
    # min_num = 3


class LocationImageInline(admin.TabularInline):
    model = LocationImage
    # min_num = 3


class LocationImageAdmin(admin.ModelAdmin):
    search_fields = ('title', 'image')
    list_display = ('title', 'image')
    list_filter = ('title', 'image')


class RentObjectInline(admin.TabularInline):
    model = RentObject


class ForwardingContactsInline(admin.TabularInline):
    model = ForwardingContact


class OpeningHoursInline(admin.TabularInline):
    model = OpeningHours


class DistrictAdmin(admin.ModelAdmin):
    search_fields = ('is_active', 'title', 'locality')
    list_display = ('is_active', 'title', 'locality')
    list_filter = ('is_active', 'title', 'locality')


class CityAdmin(admin.ModelAdmin):
    search_fields = ('is_active', 'title', 'postcode', 'province')
    list_display = ('is_active', 'title', 'postcode', 'province')
    list_filter = ('is_active', 'title', 'postcode', 'province')
    inlines = [CityImageInline]


class ProvinceAdmin(admin.ModelAdmin):
    search_fields = ('is_active', 'title', 'state')
    list_display = ('is_active', 'title', 'state')
    list_filter = ('is_active', 'title', 'state')


class StateAdmin(admin.ModelAdmin):
    search_fields = ('is_active', 'title', 'Province')
    list_display = ('is_active', 'title', 'country')
    list_filter = ('is_active', 'title', 'country')


class CountryAdmin(admin.ModelAdmin):
    search_fields = ('is_active', 'title')
    list_display = ('is_active', 'title')
    list_filter = ('is_active', 'title')


class LocationAdmin(admin.ModelAdmin):
    search_fields = ('title', 'address')
    list_display = ('title', 'address', 'lat', 'lng',)
    list_filter = ('title', 'address')
    inlines = [OpeningHoursInline, RentObjectInline,
               LocationImageInline, ForwardingContactsInline]
    fieldsets = fieldsets = (
        ('General', {
            'fields': ('is_active', 'booking_type', 'title', 'lat', 'lng', 'description', 'website', 'slug')
        }),
        ('Contact', {
            'fields': ('address', 'street_number', 'district', 'city', 'province', 'country', 'formatted_address', 'public_phone', 'formatted_phone_number')
        }),
        ('Geometry', {
            'fields': ('geometry', 'utc_offset',)
        }),
        ('Opening Hours', {
            'fields': ('opening_hour_periods',)
        }),
        ('Amenities', {
            'fields': ('wifi', 'printer', 'plotter', 'air_condition', 'coffee', 'kitchen', 'locker', 'shower', 'parking', 'open_24_7', 'relaxation_area',)
        }),
        ('Pricing', {
            'fields': ('phone_hour_price', 'desktop_hour_price', 'meeting_hour_price',)
        }),
        ('Reviews', {
            'fields': ('reviews',)
        }),
        # ('Advanced options', {
        # 'classes': ('wide', 'extrapretty', 'collapse',),
        #     'fields': ('registration_required', 'template_name'),
        # }),
    )


class RentObjectAdmin(admin.ModelAdmin):
    search_fields = ('title', 'type', 'location')
    list_display = ('title', 'type', 'location')
    list_filter = ('title', 'type', 'location')


class BookingAdmin(admin.ModelAdmin):
    search_fields = ('rent_object', 'start', 'end',)
    list_display = ('location', 'rent_object', 'start', 'end',)
    list_filter = search_fields = (
        'rent_object', 'start', 'end',)


admin.site.register(Location, LocationAdmin)
admin.site.register(LocationImage, LocationImageAdmin)
admin.site.register(RentObject, RentObjectAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(District, DistrictAdmin)
admin.site.register(State, StateAdmin)
