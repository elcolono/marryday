from rest_framework import serializers

from products.serializers import ProductRetrieveSerializer
from .models import Booking


class BookingRetrieveSerializer(serializers.ModelSerializer):
    rent_object = serializers.StringRelatedField()
    product = ProductRetrieveSerializer()

    class Meta:
        model = Booking
        fields = ('uuid', 'user', 'rent_object',
                  'start', 'end', 'location')


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('uuid', 'user', 'rent_object',
                  'start', 'end', 'location',)
