from rest_framework import serializers
from ...models import Payment
from cowork.api.serializers.common import BookingRetrieveSerializer

# Payment


class PaymentSerializer(serializers.ModelSerializer):
    booking = BookingRetrieveSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
