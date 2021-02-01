from django.db import models
from django.contrib.postgres.fields import ArrayField
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


BOOKING_TYPES = (
    ('linking', 'Linking'),
    ('enquiry', 'Enquiry'),
    ('booking', 'Booking')
)


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
    country = models.ForeignKey(
        'cowork.Country', related_name="country_states", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class Province(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150, unique=True)
    slug = models.CharField(max_length=150, blank=True, null=True)
    state = models.ForeignKey(
        'cowork.State', related_name="state_provinces", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class City(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150)
    postcode = models.CharField(max_length=50, unique=True)
    slug = models.CharField(max_length=150, blank=True, null=True)
    province = models.ForeignKey(
        'cowork.Province', related_name="province_localities", on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name_plural = "Cities"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class District(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150)
    # postcode = models.CharField(
    #     max_length=50, unique=True, null=True, blank=True)
    slug = models.CharField(max_length=150, blank=True, null=True)
    locality = models.ForeignKey(
        'cowork.City', related_name="locality_districts", on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name_plural = "Districts"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class ForwardingContact(models.Model):
    email = models.EmailField(max_length=254)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    location = models.ForeignKey(
        'cowork.Location', related_name="forwarding_contacts", on_delete=models.CASCADE, null=True)


WEEKDAYS = [
    (1, ("Monday")),
    (2, ("Tuesday")),
    (3, ("Wednesday")),
    (4, ("Thursday")),
    (5, ("Friday")),
    (6, ("Saturday")),
    (7, ("Sunday")),
]


class OpeningHours(models.Model):

    weekday = models.IntegerField(choices=WEEKDAYS)
    from_hour = models.TimeField(blank=True, null=True)
    to_hour = models.TimeField(blank=True, null=True)
    open_24 = models.BooleanField(default=False)
    location = models.ForeignKey(
        'cowork.Location', related_name="opening_hours", on_delete=models.CASCADE)

    class Meta:
        ordering = ('weekday', 'from_hour')
        # unique_together = ('location', 'weekday', 'from_hour', 'to_hour')

    def __unicode__(self):
        return u'%s: %s - %s' % (self.get_weekday_display(),
                                 self.from_hour, self.to_hour)


class Location(models.Model):
    is_active = models.BooleanField(default=False)
    title = models.CharField(max_length=150, unique=True, null=True)
    address = models.CharField(max_length=150, null=True)
    street_number = models.CharField(max_length=150, null=True)
    district = models.ForeignKey(
        District, related_name="district_locations", on_delete=models.PROTECT, null=True, blank=True)
    city = models.ForeignKey(
        City, related_name="locations", on_delete=models.PROTECT, null=True)
    province = models.ForeignKey(
        Province, related_name="province_locations", on_delete=models.PROTECT, null=True)
    state = models.ForeignKey(
        State, related_name="state_locations", on_delete=models.PROTECT, null=True)
    country = models.ForeignKey(
        Country, related_name="country_locations", on_delete=models.PROTECT, null=True)
    formatted_address = models.CharField(max_length=1000, null=True)
    vicinity = models.CharField(max_length=1000, null=True)
    lat = models.DecimalField(
        decimal_places=4, max_digits=10, null=True, blank=True)
    lng = models.DecimalField(
        decimal_places=4, max_digits=10, null=True, blank=True)
    geometry = models.JSONField(null=True)
    reviews = models.JSONField(null=True)
    rating = models.FloatField(null=True)
    user_ratings_total = models.IntegerField(null=True)
    booking_type = models.CharField(
        max_length=150, choices=BOOKING_TYPES, default="linking")
    slug = models.CharField(max_length=150, blank=True, null=True)
    description = HTMLField(null=True, blank=True)
    phone_hour_price = models.DecimalField(
        decimal_places=2, blank=True, null=True, max_digits=10)
    desktop_hour_price = models.DecimalField(
        decimal_places=2, blank=True, null=True, max_digits=10)
    meeting_hour_price = models.DecimalField(
        decimal_places=2, blank=True, null=True, max_digits=10)
    public_phone = models.CharField(max_length=150, null=True)
    formatted_phone_number = models.CharField(max_length=150, null=True)
    website = models.URLField(max_length=150, blank=True, null=True)
    utc_offset = models.IntegerField(null=True)
    business_status = models.CharField(max_length=150, null=True)
    google_place_id = models.CharField(max_length=150, null=True, unique=True)
    google_reference = models.CharField(max_length=150, null=True, unique=True)
    google_plus_code = models.JSONField(null=True)
    opening_hour_periods = models.JSONField(null=True)
    wifi = models.BooleanField(default=False)
    printer = models.BooleanField(default=False)
    plotter = models.BooleanField(default=False)
    air_condition = models.BooleanField(default=False)
    coffee = models.BooleanField(default=False)
    kitchen = models.BooleanField(default=False)
    locker = models.BooleanField(default=False)
    shower = models.BooleanField(default=False)
    parking = models.BooleanField(default=False)
    open_24_7 = models.BooleanField(default=False)
    relaxation_area = models.BooleanField(default=False)

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

        # if(self.is_active is True and self.rent_objects.count() <= 0):
        #     raise ValidationError(
        #         'Please create at least 1 Rentobject before activation.')

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
    location = models.ForeignKey(
        Location, related_name="location_bookings", on_delete=models.PROTECT, null=True)
    rent_object = models.ForeignKey(
        RentObject, related_name="rent_object_bookings", on_delete=models.PROTECT, null=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    # payment_intent_id = models.CharField(max_length=50, blank=True)


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


class LocationImage(Image):
    def validate_image(fieldfile_obj):
        filesize = fieldfile_obj.file.size
        megabyte_limit = 5.0
        if filesize > megabyte_limit*1024*1024:
            raise ValidationError("Max file size is %sMB" %
                                  str(megabyte_limit))

    def update_filename(instance, filename):
        ext = filename.split('.')[-1]
        return f"locations/{instance.location_id}/{instance.title}.{ext}"

    image = models.FileField(upload_to=update_filename)
    location = models.ForeignKey(
        Location, related_name="images", on_delete=models.CASCADE)
    google_photo_reference = models.CharField(
        max_length=500, null=True, blank=True)


class CityImage(Image):
    def validate_image(fieldfile_obj):
        filesize = fieldfile_obj.file.size
        megabyte_limit = 5.0
        if filesize > megabyte_limit*1024*1024:
            raise ValidationError("Max file size is %sMB" %
                                  str(megabyte_limit))

    def update_filename(instance, filename):
        ext = filename.split('.')[-1]
        return f"cities/{instance.city_id}/{instance.title}.{ext}"
    image = models.FileField(upload_to=update_filename)
    city = models.ForeignKey(
        City, related_name="images", on_delete=models.PROTECT)
