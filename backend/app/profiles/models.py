import os
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

# Visitor


class Visitor(models.Model):
    user = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}"


# Vendor
class Vendor(models.Model):
    user = models.ForeignKey(
        'accounts.User', related_name="vendors", on_delete=models.CASCADE)
    vendor_name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, blank=True)

    # Contact
    address = models.CharField(max_length=150, null=True)
    street_number = models.CharField(max_length=150, null=True)
    city = models.ForeignKey(
        'locations.City', related_name="locations", on_delete=models.PROTECT, null=True)
    country = models.ForeignKey(
        'locations.Country', related_name="country_locations", on_delete=models.PROTECT, null=True)
    public_email = models.EmailField(null=True, blank=True)
    public_phone = models.CharField(max_length=150, null=True)

    # Geometry
    geometry = models.JSONField(null=True, blank=True)
    utc_offset = models.IntegerField(null=True)

    created_by = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.vendor_name)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return f"{self.user.email}"


# Locations
class Location(models.Model):
    vendor = models.ForeignKey('profiles.Vendor', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    longitude = models.CharField(max_length=300)
    latitude = models.CharField(max_length=300)
