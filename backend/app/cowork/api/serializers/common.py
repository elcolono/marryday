from rest_framework import serializers
from ...models import RentObject, Booking, Location, LocationImage, CityImage, Image, City, District, OpeningHours


# Images
class CityImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = CityImage
        fields = ('title', 'image',)


class LocationImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = LocationImage
        fields = ('title', 'image',)


# Cities
class CitySerializer(serializers.ModelSerializer):
    images = CityImageSerializer(many=True)

    class Meta:
        model = City
        fields = ('id', 'title', 'postcode', 'slug', 'images',)


# Districts
class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ('id', 'title')


# Opening hours
class OpeningHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHours
        fields = ('weekday', 'from_hour', 'to_hour', 'open_24',)


# Locations
class LocationListSerializer(serializers.ModelSerializer):

    amenities = serializers.SerializerMethodField()
    preview_image = LocationImageSerializer()

    def get_amenities(self, obj):
        data = [
            {'type': 'wifi', 'label': 'Wifi', 'value': obj.wifi, 'icon': 'wifi'},
            {'type': 'printer', 'label': 'Drucker',
                'value': obj.printer, 'icon': 'print'},
            {'type': 'air_condition',  'label': 'Klimaanlage',
                'value': obj.air_condition, 'icon': 'fan'},
            {'type': 'coffee', 'label': 'Kaffee',
                'value': obj.coffee, 'icon': 'coffee'},
            {'type': 'locker', 'label': 'Schrank',
                'value': obj.storage, 'icon': 'lock'},
            {'type': 'shower',  'label': 'Dusche',
                'value': obj.shower, 'icon': 'shower'}
        ]
        return data

    class Meta:
        model = Location
        fields = ('title', 'slug', 'booking_type', 'vicinity', 'geometry',
                  'rating', 'amenities', 'preview_image',)


class LocationRetrieveSerializer(serializers.ModelSerializer):

    images = LocationImageSerializer(many=True)
    # prices = serializers.SerializerMethodField()
    amenities = serializers.SerializerMethodField()

    def get_amenities(self, obj):
        data = [
            {'type': 'wifi', 'label': 'Wifi', 'value': obj.wifi, 'icon': 'wifi'},
            {'type': 'printer', 'label': 'Drucker',
                'value': obj.printer, 'icon': 'print'},
            {'type': 'air_condition',  'label': 'Klimaanlage',
                'value': obj.air_condition, 'icon': 'fan'},
            {'type': 'coffee', 'label': 'Kaffee',
                'value': obj.coffee, 'icon': 'coffee'},
            {'type': 'locker', 'label': 'Schrank',
                'value': obj.storage, 'icon': 'lock'},
            {'type': 'shower',  'label': 'Dusche',
                'value': obj.shower, 'icon': 'shower'}
        ]
        return data

    # def get_prices(self, obj):
    #     data = {
    #         'phone_hour': obj.phone_hour_price,
    #         'desktop_hour': obj.desktop_hour_price,
    #         'meeting_hour': obj.meeting_hour_price,
    #     }
    #     return data

    class Meta:
        model = Location
        fields = ('title', 'slug', 'booking_type', 'description', 'vicinity', 'formatted_address', 'opening_hour_periods', 'geometry',
                  'rating', 'amenities', 'website', 'images',)


# Bookings
class BookingRetrieveSerializer(serializers.ModelSerializer):
    rent_object = serializers.StringRelatedField()
    location = LocationRetrieveSerializer()

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
