"""
Testing Payment API Urls
"""
from django.test import SimpleTestCase
from django.urls import reverse, resolve
from payments.api.views import PaymentRetrieveView, UserPaymentAccounts, create_custom_account


class TestAPIUrls(SimpleTestCase):

    # Payment
    def test_retrieve_payment_url_is_resolved(self):
        url = reverse('retrieve-payment', args=['some-uuid'])
        self.assertEqual(resolve(url).func.view_class, PaymentRetrieveView)

    # Payment Account
    def test_accounts_url_is_resolved(self):
        url = reverse('accounts')
        self.assertEqual(resolve(url).func.view_class, UserPaymentAccounts)

    # Stripe Custom Account
    def test_create_custom_account_url_is_resolved(self):
        url = reverse('create-custom-account')
        self.assertEqual(resolve(url).func, create_custom_account)
