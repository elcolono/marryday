"""
Testing Payment API Views
"""
from datetime import datetime
from django.utils import timezone

from django.test import TestCase
from django.urls import reverse

from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.test import force_authenticate, APIRequestFactory, APIClient

from payments.api.views import list_create_payment_accounts, get_delete_update_payment_account, PaymentRetrieveView, UserPaymentAccounts
from payments.models import PaymentAccount, PaymentAccountUser, Payment
from payments.api.serializers.common import PaymentAccountSerializer
from cowork.models import Booking
from accounts.models import User


class GetAllPaymentAccountsTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@test.com',
            password='secret'
        )
        self.factory = APIRequestFactory()
        self.client = APIClient()
        self.payment_account = PaymentAccount.objects.create(
            stripe_account='stripe-account-1',
            stripe_customer='stripe-customer-1'
        )
        self.payment_account_user = PaymentAccountUser.objects.create(
            payment_account=self.payment_account,
            user=self.user,
            role='admin'
        )

    def test_list_payment_accounts(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse('list_create_payment_accounts'))
        payment_accounts = PaymentAccount.objects.filter(
            paymentaccountuser__user=self.user)
        serializer = PaymentAccountSerializer(payment_accounts, many=True)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSinglePaymentAccountTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@test.com',
            password='secret'
        )
        self.client = APIClient()
        self.payment_account = PaymentAccount.objects.create(
            stripe_account='stripe-account-1',
            stripe_customer='stripe-customer-1'
        )
        self.payment_account_user = PaymentAccountUser.objects.create(
            payment_account=self.payment_account,
            user=self.user,
            role='admin'
        )

    def test_get_valid_payment_account(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse('get_delete_update_payment_account', kwargs={
            'pk': self.payment_account.pk}))
        payment_account = PaymentAccount.objects.get(
            pk=self.payment_account.pk)
        serializer = PaymentAccountSerializer(payment_account)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_payment_account(self):
        self.client.force_authenticate(user=self.user)
        invalid_pk = self.payment_account.pk - 1
        response = self.client.get(reverse('get_delete_update_payment_account', kwargs={
            'pk': invalid_pk}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_unauthenticated_payment_account(self):
        response = self.client.get(reverse('get_delete_update_payment_account', kwargs={
            'pk': self.payment_account.pk}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_unauthorized_payment_account(self):
        unauthorized_user = User.objects.create(
            email='user2@test.com',
            password='secret'
        )
        self.client.force_authenticate(user=unauthorized_user)
        response = self.client.get(reverse('get_delete_update_payment_account', kwargs={
            'pk': self.payment_account.pk}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class PaymentViewsTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@test.com',
            password='secret'
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
