from django.db import models

# Create your models here.

RENT_OBJECT_TYPES = (
    ('phone', 'Phone'),
    ('desktop', 'Desktop'),
    ('meeting', 'Meeting')
)


class Location(models.Model):
    title = models.CharField(max_length=150)
    address = models.CharField(max_length=150)
    postcode = models.CharField(max_length=50)
    city = models.CharField(max_length=150)

    def __str__(self):
        return self.title


class RentObject(models.Model):
    title = models.CharField(max_length=150)
    type = models.CharField(max_length=150, choices=RENT_OBJECT_TYPES)
    location = models.ForeignKey(
        Location, related_name="locations", on_delete=models.PROTECT)

    def __str__(self):
        return self.title


class Booking(models.Model):
    rent_object = models.ForeignKey(
        RentObject, related_name="bookings", on_delete=models.PROTECT)
    start = models.DateTimeField()
    end = models.DateTimeField()
