"""
Payment Module
"""
import stripe
from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User

from .models import PaymentAccount, PaymentAccountUser


@receiver(post_save, sender=User)
def create_payment_account(sender, instance, created):
    """
    Creates an PaymentAccount
    """
    if created and instance.is_company:
        email = instance['email']
        # checking if customer with provided email already exists
        customer_data = stripe.Customer.list(email=email).data

        if len(customer_data) == 0:
            # creating customer
            customer = stripe.Customer.create(email=email)
        else:
            customer = customer_data[0]

        payment_account = PaymentAccount.objects.create(stripe=customer.id)
        payment_account_user = PaymentAccountUser.objects.create(
            user=instance, payment_account=payment_account)
        payment_account_user.save()