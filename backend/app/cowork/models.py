from django.db import models
import uuid
from django.utils.text import slugify
from datetime import datetime
from django.core.exceptions import ValidationError
from tinymce.models import HTMLField

RENT_OBJECT_TYPES = (
    ('phone', 'Phone'),
    ('desktop', 'Desktop'),
    ('meeting', 'Meeting')
)


class City(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150, unique=True)
    postcode = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "Cities"

    def __str__(self):
        return self.title


class Location(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150, unique=True)
    address = models.CharField(max_length=150)
    city = models.ForeignKey(
        City, related_name="locations", on_delete=models.PROTECT, null=True)
    lat = models.DecimalField(decimal_places=4, max_digits=10, null=True)
    lng = models.DecimalField(decimal_places=4, max_digits=10, null=True)
    slug = models.CharField(max_length=150, blank=True, null=True)
    description = HTMLField(null=True, blank=True)
    phone_hour_price = models.DecimalField(
        decimal_places=2, blank=True, null=True, max_digits=10)
    desktop_hour_price = models.DecimalField(
        decimal_places=2, blank=True, null=True, max_digits=10)
    meeting_hour_price = models.DecimalField(
        decimal_places=2, blank=True, null=True, max_digits=10)

    def clean(self):
        rent_objects = self.rent_objects.all()
        if any(obj.type == 'phone' for obj in rent_objects) and not self.phone_hour_price:
            raise ValidationError(
                'You have created an "Phone" rent object so please insert a phone price.')

        if any(obj.type == 'desktop' for obj in rent_objects) and not self.desktop_hour_price:
            raise ValidationError(
                'You have created an "Desktop" rent object so please insert a desktop price.')

        if any(obj.type == 'meeting' for obj in rent_objects) and not self.meeting_hour_price:
            raise ValidationError(
                'You have created an "Meeting" rent object so please insert a meeting price.')

        if(self.is_active is True and self.images.count() < 3):
            print(self.images.count())
            raise ValidationError(
                'Please insert at least 3 Location Images before activation.')

        if(self.is_active is True and self.rent_objects.count() <= 0):
            raise ValidationError(
                'Please create at least 1 Rentobject before activation.')

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    # def clean(self):
    #     if any(self.errors):
    #         # Don't bother validating the formset unless each form is valid on its own
    #         return
    #     count = 0
    #     for

    def __str__(self):
        return self.title


class RentObject(models.Model):
    title = models.CharField(max_length=150)
    type = models.CharField(max_length=150, choices=RENT_OBJECT_TYPES)
    location = models.ForeignKey(
        Location, related_name="rent_objects", on_delete=models.PROTECT)

    # def clean(self):
    #     location = self.location_set.get()
    #     raise ValidationError(
    #         'Rent Object Error.')

    def __str__(self):
        return f"{self.title} ({self.location})"


class Booking(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(
        'accounts.User', related_name="bookings", on_delete=models.PROTECT, null=True, blank=True)
    rent_object = models.ForeignKey(
        RentObject, related_name="bookings", on_delete=models.PROTECT)
    start = models.DateTimeField()
    end = models.DateTimeField()
    payment_intent_id = models.CharField(max_length=50, blank=True)


class Image(models.Model):
    def update_filename(instance, filename):
        ext = filename.split('.')[-1]
        return f"locations/{instance.location_id}/{instance.title}.{ext}"

    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False,
    )
    is_thumbnail = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to=update_filename)

    class Meta:
        abstract = True


class LocationImage(Image):
    location = models.ForeignKey(
        Location, related_name="images", on_delete=models.PROTECT)
