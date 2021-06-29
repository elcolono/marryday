from rest_framework import serializers
from payments.models import Payment, PaymentAccount
from bookings.serializers import BookingRetrieveSerializer

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
