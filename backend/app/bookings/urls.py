from django.urls import path
from .views import BookingCreateView, BookingRetrieveView, send_test_mail

urlpatterns = [
    path("mail/", send_test_mail, name="test-mail"),
    path("bookings/", BookingCreateView.as_view(), name="booking-create"),
    path("booking/<uuid>", BookingRetrieveView.as_view(), name="booking-detail"),
]
