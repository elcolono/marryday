"""
Testing Payment API Views
"""
from datetime import datetime
from django.utils import timezone

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import force_authenticate, APIRequestFactory

from payments.api.views import PaymentRetrieveView, UserPaymentAccounts
from payments.models import Payment
from cowork.models import Booking
from accounts.models import User


class TestPaymentViews(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@test.com',
            password='top_secret'
        )
        self.factory = APIRequestFactory()
        self.retrieve_payment_url = reverse('retrieve-payment', args=['uuid'])
        self.accounts_url = reverse('accounts')
        self.booking = Booking.objects.create(
            start=datetime.now(tz=timezone.utc), end=datetime.now(tz=timezone.utc))
        self.payment = Payment.objects.create(booking=self.booking)

    def test_retrieve_payment_details_GET(self):
        factory = self.factory
        view = PaymentRetrieveView.as_view()

        request = factory.get(self.retrieve_payment_url)
        force_authenticate(request, user=self.user)
        response = view(request, uuid=self.payment.uuid)
        response.render()

        self.assertEqual(response.status_code, 200)

    def test_payment_accounts_list_GET(self):
        factory = self.factory
        view = UserPaymentAccounts.as_view()

        # Make an authenticated request to the view
        request = factory.get(self.accounts_url)
        force_authenticate(request, user=self.user)
        response = view(request)

        self.assertEqual(response.status_code, 200)
