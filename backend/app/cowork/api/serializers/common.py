from rest_framework import serializers
from ...models import RentObject, Booking, Location, LocationImage, Image, City

# Cities


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

# Images


class LocationImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = LocationImage
        fields = '__all__'

# Locations


class LocationSerializer(serializers.ModelSerializer):

    images = LocationImageSerializer(many=True)
    city = CitySerializer()

    class Meta:
        model = Location
        fields = ('slug', 'title', 'address', 'city',
                  'lat', 'lng', 'images', 'description')


# Bookings
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('user', 'rent_object', 'start', 'end',)


# RentObjects
class RentObjectSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True)

    class Meta:
        model = RentObject
        fields = ('id', 'title', 'type', 'location', 'bookings',)
