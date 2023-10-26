"""
booking models
"""
import uuid
from django.db import models


class Booking(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(
        'accounts.User', related_name="bookings", on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(
        'products.Product', related_name="product_bookings", on_delete=models.CASCADE, null=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    # payment_intent_id = models.CharField(max_length=50, blank=True)
