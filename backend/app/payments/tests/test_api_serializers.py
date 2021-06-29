from django.test import TestCase
from payments.serializers import PaymentAccountSerializer
from payments.models import PaymentAccount


class PaymentAccountSerializerTest(TestCase):

    def setUp(self):
        self.payment_account = PaymentAccount.objects.create(
            stripe_customer='stripe-customer-1', stripe_account='stripe-account-1')
        self.serializer = PaymentAccountSerializer(
            instance=self.payment_account)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(
            ['id', 'stripe_customer', 'stripe_account']))
