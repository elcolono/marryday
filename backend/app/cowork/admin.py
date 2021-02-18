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


class LocationAdmin(admin.ModelAdmin):
    readonly_fields = ('preview_image',)
    search_fields = ('title', 'is_active',  'address',
                     'province', 'city', 'state',)
    list_display = ('title', 'is_active',  'address',
                    'province', 'city', 'state',)
    list_filter = ('title', 'is_active',  'address',
                   'province', 'city', 'state',)
    inlines = [LocationImageInline]
    fieldsets = fieldsets = (
        ('General', {
            'fields': ('is_active', 'booking_type', 'title', 'slug', 'description', 'preview_image')
        }),
        ('Google Places', {
            'fields': ('business_status', 'google_reference', 'google_plus_code',)
        }),
        ('Contact', {
            'fields': ('address', 'street_number', 'district', 'city', 'province', 'country', 'formatted_address', 'vicinity', 'public_phone', 'formatted_phone_number', 'public_email', 'website')
        }),
        ('Geometry', {
            'fields': ('geometry',)
        }),
        ('Opening Hours', {
            'fields': ('opening_hour_periods', 'utc_offset',)
        }),
        # ('Fixdesk', {
        #     'classes': ('collapse',),
        #     'fields': ('fixdesk_month_price', 'fixdesk_month_contract_duration', 'fixdesk_month_onrequest', 'fixdesk_month_wifi', 'fixdesk_month_parking', 'fixdesk_month_access24_7',
        #                'fixdesk_month_meetingroom', 'fixdesk_month_printer', 'fixdesk_month_coffee', 'fixdesk_month_storage', 'fixdesk_month_office_address', )
        # }),
        ('Offers', {
            'fields': (

                ('flexdesk_month_price', 'flexdesk_month_contract_duration', 'flexdesk_month_onrequest', 'flexdesk_month_wifi', 'flexdesk_month_parking', 'flexdesk_month_access24_7',
                 'flexdesk_month_meetingroom', 'flexdesk_month_printer', 'flexdesk_month_coffee', 'flexdesk_month_storage', 'flexdesk_month_office_address',),

                ('flexdesk_day_price', 'flexdesk_day_contract_duration', 'flexdesk_day_onrequest', 'flexdesk_day_wifi', 'flexdesk_day_parking', 'flexdesk_day_access24_7',
                 'flexdesk_day_meetingroom', 'flexdesk_day_printer', 'flexdesk_day_coffee', 'flexdesk_day_storage', 'flexdesk_day_office_address',),

                ('flexdesk_hour_price', 'flexdesk_hour_contract_duration', 'flexdesk_hour_onrequest', 'flexdesk_hour_wifi', 'flexdesk_hour_parking', 'flexdesk_hour_access24_7',
                 'flexdesk_hour_meetingroom', 'flexdesk_hour_printer', 'flexdesk_hour_coffee', 'flexdesk_hour_storage', 'flexdesk_hour_office_address',),

                ('privatespace_month_price', 'privatespace_month_contract_duration', 'privatespace_month_onrequest', 'privatespace_month_wifi', 'privatespace_month_parking', 'privatespace_month_access24_7',
                 'privatespace_month_meetingroom', 'privatespace_month_printer', 'privatespace_month_coffee', 'privatespace_month_storage', 'privatespace_month_office_address',),

                ('meetingroom_hour_price', 'meetingroom_day_price',
                 'meetingroom_onrequest', 'meetingroom_multimedia',),

            )
        }),
        ('Amenities', {
            'fields': (
                ('wifi', 'parking', 'access24_7', 'meeting_room',
                 'printer', 'coffee', 'storage', 'office_address', 'events_workshops'),
                ('plotter', 'air_condition',
                 'shower', 'relaxation_area',)
            )
        }),
        # ('Pricing', {
        #     'fields': ('phone_hour_price', 'desktop_hour_price', 'meeting_hour_price',)
        # }),
        ('Reviews', {
            'fields': ('reviews', 'rating', 'user_ratings_total')
        }),
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
