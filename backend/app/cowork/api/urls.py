from django.urls import path
from cowork.api.views import RentObjectListView, LocationListView, LocationRetrieveView, BookingCreateView, CheckInListView, CityListView

urlpatterns = [
    # Cites
    path("cities/", CityListView.as_view(), name="city-list"),
    # Bookings
    path("bookings/", BookingCreateView.as_view(), name="booking-create"),
    # RentObjects
    path("rentobjects/", RentObjectListView.as_view(), name="rentobject-list"),
    # Locations
    path("location/<slug>", LocationRetrieveView.as_view(), name="location-detail"),
    path("locations/", LocationListView.as_view(), name="location-list"),
    # Locations
    path("checkins/", CheckInListView.as_view(), name="checkin-list"),
]
