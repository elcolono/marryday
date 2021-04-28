"""
Testing Payment API Urls
"""
from django.test import SimpleTestCase
from django.urls import reverse, resolve
from payments.api.views import list_create_payment_accounts, PaymentRetrieveView


class TestAPIUrls(SimpleTestCase):

    # Payment Account
    def test_payment_account_url_is_resolved(self):
        url = reverse('list_create_payment_accounts')
        self.assertEqual(resolve(url).func, list_create_payment_accounts)

    # Payment
    def test_retrieve_payment_url_is_resolved(self):
        url = reverse('retrieve-payment', args=['some-uuid'])
        self.assertEqual(resolve(url).func.view_class, PaymentRetrieveView)
