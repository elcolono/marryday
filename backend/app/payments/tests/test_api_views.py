"""
Testing Payment API Views
"""

from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from payments.models import PaymentAccount, PaymentAccountUser
from payments.serializers import PaymentAccountSerializer
from accounts.models import User


class GetAllPaymentAccountsTest(TestCase):

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


class CreateStripeCustomAccountTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='user@test.com',
            password='secret'
        )
        self.unauthorized_user = User.objects.create_user(
            email='user2@test.com',
            password='secret'
        )
        self.payment_account = PaymentAccount.objects.create(
            stripe_account='',
            stripe_customer=''
        )
        self.invalid_payment_account = PaymentAccount.objects.create(
            stripe_account='existing-id-123',
            stripe_customer=''
        )
        self.payment_account_user = PaymentAccountUser.objects.create(
            payment_account=self.payment_account,
            user=self.user,
            role='admin'
        )

    def test_create_stripe_account_with_invalid_payment_account(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(
            reverse('create_stripe_custom_account'), data={
                'country': 'at',
                'payment_account_pk': self.invalid_payment_account.pk,
            })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_stripe_account_with_unauthorized_user(self):
        self.client.force_authenticate(user=self.unauthorized_user)

        response = self.client.post(
            reverse('create_stripe_custom_account'), data={
                'country': 'at',
                'payment_account_pk': self.payment_account.pk,
            })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_stripe_custom_account_with_wrong_country_code(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(
            reverse('create_stripe_custom_account'), data={
                'country': 'at34',
                'payment_account_pk': self.payment_account.pk,
            })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_stripe_custom_account_contains_expected_fields(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(
            reverse('create_stripe_custom_account'), data={
                'country': 'at',
                'payment_account_pk': self.payment_account.pk,
            })

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.client.delete(reverse('delete-stripe-account',
                                   kwargs={'pk': response.data.id}))


class CreateStripeCustomAccountLinks(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='user@test.com',
            password='secret'
        )
        self.unauthorized_user = User.objects.create_user(
            email='user2@test.com',
            password='secret'
        )
        self.payment_account = PaymentAccount.objects.create(
            stripe_account='',
            stripe_customer=''
        )
        self.invalid_payment_account = PaymentAccount.objects.create(
            stripe_account='existing-id-123',
            stripe_customer=''
        )

    # def test_create_valid_stripe_account_links(self):
    #     self.client.force_authenticate(user=self.user)

    #     response = self.client.post(reverse('create_stripe_account_links'))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
