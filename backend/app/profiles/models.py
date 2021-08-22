from django.db import models
from django.utils.text import slugify


# Visitor
class Visitor(models.Model):
    # General
    user = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}"


# Vendor
class Vendor(models.Model):
    # General
    user = models.ForeignKey(
        'accounts.User', related_name="vendors", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Basic
    vendor_name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, blank=True)


    # Geometry
    geometry = models.JSONField(null=True, blank=True)
    utc_offset = models.IntegerField(null=True)

    created_by = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, editable=False)

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
