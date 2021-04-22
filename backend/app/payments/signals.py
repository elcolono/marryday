"""
Payment Module
"""
import stripe

from django.http import JsonResponse
from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User

from .models import PaymentAccount, PaymentAccountUser


@receiver(post_save, sender=User)
def create_payment_account(sender, instance, created, **kwargs):
    # if created and instance.is_company:
    #     try:
    #         email = instance.email

    #         # country = instance.country
    #         account = stripe.Account.create(
    #             country='AT',
    #             type='custom',
    #             capabilities={
    #                 'card_payments': {
    #                     'requested': True,
    #                 },
    #                 'transfers': {
    #                     'requested': True,
    #                 },
    #             },
    #         )
    #         payment_account = PaymentAccount.objects.create(
    #             stripe_account=account.id)
    #         payment_account_user = PaymentAccountUser(
    #             user=instance, payment_account=payment_account, role='admin')
    #         payment_account_user.save()
    #     except Exception as e:
    #         instance.delete()

    if created and instance.is_visitor:
        email = instance.email
        customer_data = stripe.Customer.list(email=email).data

        if len(customer_data) == 0:
            customer = stripe.Customer.create(email=email)
        else:
            customer = customer_data[0]
