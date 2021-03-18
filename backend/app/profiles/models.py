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


# Companies
class Company(models.Model):
    user = models.ForeignKey(
        'accounts.User', related_name="companies", on_delete=models.CASCADE)
    company_name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, blank=True)

    created_by = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.company_name)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return f"{self.user.email}"


# Locations
class Location(models.Model):
    company = models.ForeignKey('profiles.Company', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    longitude = models.CharField(max_length=300)
    latitude = models.CharField(max_length=300)
