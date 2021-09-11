import uuid

from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError


class Country(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150, unique=True)
    slug = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Countries"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class State(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150, unique=True)
    slug = models.CharField(max_length=150, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class Province(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150, unique=True)
    slug = models.CharField(max_length=150, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class City(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150)
    slug = models.CharField(max_length=150, blank=True, null=True)
    preview_image = models.OneToOneField(
        'locations.CityImage', on_delete=models.CASCADE, related_name='city_preview_image', null=True, blank=True)

    class Meta:
        verbose_name_plural = "Cities"

    def save(self, *args, **kwargs):
        city_images = self.images.all()
        for image in city_images:
            if image.is_thumbnail:
                self.preview_image = image

        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class District(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150)
    slug = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Districts"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class Postcode(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150)
    slug = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Postcodes"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class Image(models.Model):
    def update_filename(instance, filename):
        pass

    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False,
    )
    is_thumbnail = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=500)

    # image = models.FileField(upload_to=update_filename)

    class Meta:
        abstract = True


class CityImage(Image):
    def validate_image(fieldfile_obj):
        filesize = fieldfile_obj.file.size
        megabyte_limit = 5.0
        if filesize > megabyte_limit * 1024 * 1024:
            raise ValidationError("Max file size is %sMB" %
                                  str(megabyte_limit))

    def update_filename(instance, filename):
        ext = filename.split('.')[-1]
        return f"cities/{instance.city_id}/{instance.title}.{ext}"

    image = models.FileField(upload_to=update_filename)
    city = models.ForeignKey(
        City, related_name="images", on_delete=models.PROTECT)
