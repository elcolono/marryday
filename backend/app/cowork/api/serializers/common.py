from rest_framework import serializers
from ...models import RentObject, Booking, Location


# Locations
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'title', 'address', 'postcode', 'city',)


# Bookings
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('start', 'end',)


# RentObjects
class RentObjectSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True)

    class Meta:
        model = RentObject
        fields = ('title', 'type', 'location', 'bookings',)
