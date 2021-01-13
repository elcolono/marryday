from rest_framework import serializers
from ...models import RentObject, Booking, Location, LocationImage, CityImage, Image, City, OpeningHours


# Images
class CityImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = CityImage
        fields = '__all__'


class LocationImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = LocationImage
        fields = '__all__'


# Cities
class CitySerializer(serializers.ModelSerializer):
    images = CityImageSerializer(many=True)

    class Meta:
        model = City
        fields = ('id', 'title', 'postcode', 'slug', 'images',)


# Opening hours
class OpeningHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHours
        fields = ('weekday', 'from_hour', 'to_hour',)


# Locations


class LocationSerializer(serializers.ModelSerializer):

    images = LocationImageSerializer(many=True)
    city = CitySerializer()
    prices = serializers.SerializerMethodField()
    opening_hours = OpeningHoursSerializer(many=True)

    def get_prices(self, obj):
        data = {
            'phone_hour': obj.phone_hour_price,
            'desktop_hour': obj.desktop_hour_price,
            'meeting_hour': obj.meeting_hour_price,
        }
        return data

    class Meta:
        model = Location
        fields = ('slug', 'title', 'address', 'city',
                  'lat', 'lng', 'images', 'description', 'prices', 'public_phone', 'opening_hours')


# Bookings
class BookingRetrieveSerializer(serializers.ModelSerializer):
    rent_object = serializers.StringRelatedField()
    location = LocationSerializer()

    class Meta:
        model = Booking
        fields = ('uuid', 'user', 'rent_object',
                  'start', 'end', 'location')


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('uuid', 'user', 'rent_object',
                  'start', 'end', 'location',)


# RentObjects
class RentObjectSerializer(serializers.ModelSerializer):
    rent_object_bookings = BookingRetrieveSerializer(many=True)

    class Meta:
        model = RentObject
        fields = ('id', 'title', 'type', 'location', 'rent_object_bookings',)
