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


class Location(models.Model):
    is_active = models.BooleanField(default=True)
    title = models.CharField(max_length=150, unique=True)
    address = models.CharField(max_length=150)
    postcode = models.CharField(max_length=50)
    city = models.CharField(max_length=150)
    lat = models.DecimalField(decimal_places=4, max_digits=10, null=True)
    lng = models.DecimalField(decimal_places=4, max_digits=10, null=True)
    slug = models.CharField(max_length=150, blank=True, null=True)
    description = HTMLField(null=True, blank=True)

    def clean(self):
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

    def __str__(self):
        return self.title


class Booking(models.Model):
    user = models.ForeignKey(
        'accounts.User', related_name="bookings", on_delete=models.PROTECT, null=True)
    rent_object = models.ForeignKey(
        RentObject, related_name="bookings", on_delete=models.PROTECT)
    start = models.DateTimeField()
    end = models.DateTimeField()


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
