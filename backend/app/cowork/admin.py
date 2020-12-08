from django.contrib import admin
from .models import Location, RentObject, Booking
# Register your models here.


class RentObjectInline(admin.TabularInline):
    model = RentObject


class LocationAdmin(admin.ModelAdmin):
    search_fields = ('title', 'address', 'postcode', 'city')
    list_display = ('title', 'address', 'postcode', 'city')
    list_filter = ('title', 'address', 'postcode', 'city')
    inlines = [RentObjectInline]


class RentObjectAdmin(admin.ModelAdmin):
    search_fields = ('title', 'type', 'location')
    list_display = ('title', 'type', 'location')
    list_filter = ('title', 'type', 'location')


class BookingAdmin(admin.ModelAdmin):
    search_fields = ('rent_object', 'start', 'end')
    list_display = ('rent_object', 'start', 'end')
    list_filter = search_fields = ('rent_object', 'start', 'end')


admin.site.register(Location, LocationAdmin)
admin.site.register(RentObject, RentObjectAdmin)
admin.site.register(Booking, BookingAdmin)