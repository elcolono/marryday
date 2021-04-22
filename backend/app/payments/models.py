import stripe
from django.db import models
import uuid

# Create your models here.

PAYMENT_ACCOUNT_USER_ROLES = (
    ('admin', 'Admin'),
    ('editor', 'Editor'),
    ('viewer', 'Viewer')
)


def increment_invoice_number():
    last_invoice = Payment.objects.all().order_by('created_at').last()
    if not last_invoice:
        return '21-0001'
    invoice_no = last_invoice.invoice_no
    invoice_int = int(invoice_no.split('21-')[-1])
    width = 4
    new_invoice_int = invoice_int + 1
    formatted = (width - len(str(new_invoice_int))) * \
        "0" + str(new_invoice_int)
    new_invoice_no = '21-' + str(formatted)
    return new_invoice_no


class PaymentAccountUser(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    payment_account = models.ForeignKey(
        'payments.PaymentAccount', on_delete=models.CASCADE)
    role = models.CharField(choices=PAYMENT_ACCOUNT_USER_ROLES, max_length=100)


class PaymentAccount(models.Model):
    users = models.ManyToManyField(
        'accounts.User', through='PaymentAccountUser')
    stripe_customer = models.CharField(max_length=100, null=True, blank=True)
    stripe_account = models.CharField(max_length=100, null=True, blank=True)


class Payment(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    booking = models.ForeignKey('cowork.Booking', on_delete=models.CASCADE,)
    invoice_no = models.CharField(
        max_length=500, default=increment_invoice_number, null=True, blank=True)
    payment_intent_id = models.CharField(max_length=50, blank=True)
    invoice_date = models.DateTimeField(auto_now_add=True, null=True)
    amount = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
