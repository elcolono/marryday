from django.urls import path
from cowork.api.views import RentObjectListView, LocationListView, BookingCreateView

urlpatterns = [
    # Bookings
    path("bookings/", BookingCreateView.as_view(), name="booking-create"),
    # RentObjects
    path("rentobjects/", RentObjectListView.as_view(), name="rentobject-list"),
    # Locations
    path("locations/", LocationListView.as_view(), name="location-list"),
]
