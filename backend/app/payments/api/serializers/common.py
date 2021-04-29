from rest_framework import serializers
from ...models import Payment, PaymentAccount
from cowork.api.serializers.common import BookingRetrieveSerializer

# Payment


class PaymentSerializer(serializers.ModelSerializer):
    booking = BookingRetrieveSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'


class PaymentAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentAccount
        fields = ['id', 'stripe_customer', 'stripe_account']
