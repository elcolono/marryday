from django.urls import path
from cowork.api.views import RentObjectListView, LocationListView, LocationRetrieveView, BookingCreateView, BookingRetrieveView, CheckInListView, CityListView, send_test_mail, MailchimpAudienceAPIVIEWSet, PipeDriveAPIVIEWSet

urlpatterns = [
    # Cites
    path("mail/", send_test_mail, name="test-mail"),
    # Cites
    path("cities/", CityListView.as_view(), name="city-list"),
    # Bookings
    path("bookings/", BookingCreateView.as_view(), name="booking-create"),
    path("booking/<uuid>", BookingRetrieveView.as_view(), name="booking-detail"),
    # RentObjects
    path("rentobjects/", RentObjectListView.as_view(), name="rentobject-list"),
    # Locations
    path("location/<slug>", LocationRetrieveView.as_view(), name="location-detail"),
    path("locations/", LocationListView.as_view(), name="location-list"),
    # Locations
    path("checkins/", CheckInListView.as_view(), name="checkin-list"),
    # Mailchimp
    path("mailchimp-audience", MailchimpAudienceAPIVIEWSet.as_view(),
         name="mailchimp-add"),
    # Pipedrive
    path("pipedrive-deal", PipeDriveAPIVIEWSet.as_view(),
         name="pipedrive-deal-add"),
]
