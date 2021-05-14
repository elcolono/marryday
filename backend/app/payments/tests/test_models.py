""" Test payment models """
from accounts.models import User
from django.db import models
from django.test import TestCase
from payments.models import (PAYMENT_ACCOUNT_USER_ROLES, PaymentAccount,
                             PaymentAccountUser)


class PaymentAccountUserModelTest(TestCase):
    """ Test module for Payment Account User Model """

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@test.com',
            password='top_secret'
        )
        self.payment_account = PaymentAccount.objects.create(
            stripe_account='stripe-account-1', stripe_customer='stripe-customer-1')
        self.payment_account_user = PaymentAccountUser.objects.create(
            user=self.user,
            payment_account=self.payment_account,
            role='admin'
        )

    def test_user_related_model(self):
        related_model = self.payment_account_user._meta.get_field(
            'user').related_model
        self.assertEqual(related_model, User)

    def test_user_on_delete(self):
        on_delete = self.payment_account_user._meta.get_field(
            'user').remote_field.on_delete
        self.assertEqual(on_delete, models.CASCADE)

    def test_payment_account_related_model(self):
        related_model = self.payment_account_user._meta.get_field(
            'payment_account').related_model
        self.assertEqual(related_model, PaymentAccount)

    def test_payment_account_on_delete(self):
        on_delete = self.payment_account_user._meta.get_field(
            'payment_account').remote_field.on_delete
        self.assertEqual(on_delete, models.CASCADE)

    def test_role_choices(self):
        choices = self.payment_account_user._meta.get_field(
            'role').choices
        self.assertEqual(choices, PAYMENT_ACCOUNT_USER_ROLES)

    def test_role_max_length(self):
        max_length = self.payment_account_user._meta.get_field(
            'role').max_length
        self.assertEqual(max_length, 100)

    def test_user_roles_tuple(self):
        self.assertTupleEqual(PAYMENT_ACCOUNT_USER_ROLES, (
            ('admin', 'Admin'),
            ('editor', 'Editor'),
            ('viewer', 'Viewer')
        )
        )


class PaymentAccountModelTest(TestCase):
    """ Test module for Payment Account Model """

    def setUp(self):
        self.payment_account = PaymentAccount.objects.create(
            stripe_account='stripe-account-1', stripe_customer='stripe-customer-1')

    def test_stripe_account_label(self):
        field_label = self.payment_account._meta.get_field(
            'stripe_account').verbose_name
        self.assertEqual(field_label, 'stripe account')

    def test_stripe_customer_label(self):
        field_label = self.payment_account._meta.get_field(
            'stripe_customer').verbose_name
        self.assertEqual(field_label, 'stripe customer')

    def test_stripe_account_max_length(self):
        max_length = self.payment_account._meta.get_field(
            'stripe_account').max_length
        self.assertEqual(max_length, 100)

    def test_stripe_customer_max_length(self):
        max_length = self.payment_account._meta.get_field(
            'stripe_customer').max_length
        self.assertEqual(max_length, 100)

    def test_stripe_account_null(self):
        null = self.payment_account._meta.get_field(
            'stripe_account').null
        self.assertEqual(null, True)

    def test_stripe_customer_null(self):
        null = self.payment_account._meta.get_field(
            'stripe_customer').null
        self.assertEqual(null, True)

    def test_stripe_account_blank(self):
        blank = self.payment_account._meta.get_field(
            'stripe_account').blank
        self.assertEqual(blank, True)

    def test_stripe_customer_blank(self):
        blank = self.payment_account._meta.get_field(
            'stripe_customer').blank
        self.assertEqual(blank, True)
