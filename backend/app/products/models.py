import uuid

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify
from tinymce.models import HTMLField
from core.models import Image


class ForwardingContact(models.Model):
    email = models.EmailField(max_length=254)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    location = models.ForeignKey(
        'products.Product', related_name="forwarding_contacts", on_delete=models.CASCADE, null=True)


class ProductImage(Image):
    def validate_image(field_file_obj):
        filesize = field_file_obj.file.size
        megabyte_limit = 5.0
        if filesize > megabyte_limit * 1024 * 1024:
            raise ValidationError("Max file size is %sMB" %
                                  str(megabyte_limit))

    def update_filename(instance, filename):
        ext = filename.split('.')[-1]
        return f"products/{instance.product_id}/{instance.title}.{ext}"

    image = models.FileField(upload_to=update_filename)
    product = models.ForeignKey(
        'products.Product', related_name="images", on_delete=models.CASCADE)


class Product(models.Model):
    # General
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=False)
    slug = models.CharField(max_length=150, blank=True, null=True, unique=True)

    # Basics
    title = models.CharField(max_length=150, null=True, unique=True)
    description = HTMLField(null=True, blank=True)

    # Details
    details = models.JSONField(blank=True, null=True)

    # Location
    address = models.CharField(max_length=150, null=True)
    street_number = models.CharField(max_length=150, null=True)
    public_email = models.EmailField(null=True, blank=True)
    public_phone = models.CharField(max_length=150, null=True)

    # Geometry
    geometry = models.JSONField(null=True, blank=True)
    utc_offset = models.IntegerField(null=True)

    # Reviews
    reviews = models.JSONField(null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    user_ratings_total = models.IntegerField(null=True, blank=True)

    # Booking
    day_price = models.DecimalField(
        decimal_places=2, blank=True, null=True, max_digits=10)

    # Images
    preview_image = models.OneToOneField(
        'products.ProductImage',
        on_delete=models.CASCADE,
        related_name='location_preview_image',
        null=True,
        blank=True
    )

    def clean(self):
        rent_objects = self.rent_objects.all()
        if any(obj.type == 'phone' for obj in rent_objects) and not self.phone_hour_price:
            raise ValidationError(
                'You have created an "Phone" rent object so please insert a phone price.')

        if self.is_active is True and self.images.count() < 3:
            raise ValidationError(
                'Please insert at least 3 Product Images before activation.')

    def save(self, *args, **kwargs):
        location_images = self.images.all()
        for image in location_images:
            if image.is_thumbnail:
                self.preview_image = image

        if self.slug is None:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title
