from django.contrib import admin
from .models import Location, RentObject, Booking, LocationImage, City
# Register your models here.


class LocationImageInline(admin.TabularInline):
    model = LocationImage
    # min_num = 3


class LocationImageAdmin(admin.ModelAdmin):
    search_fields = ('title', 'image')
    list_display = ('title', 'image')
    list_filter = ('title', 'image')


class RentObjectInline(admin.TabularInline):
    model = RentObject


class CityAdmin(admin.ModelAdmin):
    search_fields = ('title', 'postcode')
    list_display = ('title', 'postcode')
    list_filter = ('title', 'postcode')


class LocationAdmin(admin.ModelAdmin):
    search_fields = ('title', 'address')
    list_display = ('title', 'address', 'lat', 'lng',)
    list_filter = ('title', 'address')
    inlines = [RentObjectInline, LocationImageInline]
    fieldsets = fieldsets = (
        ('General', {
            'fields': ('is_active', 'title', 'address', 'city', 'lat', 'lng', 'description', 'slug',)
        }),
        ('Pricing', {
            'fields': ('phone_hour_price', 'desktop_hour_price', 'meeting_hour_price',)
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
    search_fields = ('rent_object', 'start', 'end', 'payment_intent_id')
    list_display = ('rent_object', 'start', 'end', 'payment_intent_id')
    list_filter = search_fields = (
        'rent_object', 'start', 'end', 'payment_intent_id')
    readonly_fields = ('payment_intent_id',)


admin.site.register(LocationImage, LocationImageAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(RentObject, RentObjectAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(City, CityAdmin)
