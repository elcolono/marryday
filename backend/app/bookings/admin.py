"""
Admin Settings
"""
from django.contrib import admin
from .models import Booking


class BookingAdmin(admin.ModelAdmin):
    search_fields = ('product', 'start', 'end',)
    list_display = ('product', 'start', 'end',)
    list_filter = search_fields = ('product', 'start', 'end',)


admin.site.register(Booking, BookingAdmin)
