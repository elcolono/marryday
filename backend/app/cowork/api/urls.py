from django.urls import path
from cowork.api.views import RentObjectListView, LocationListView

urlpatterns = [
    # RentObjects
    path("rentobjects/", RentObjectListView.as_view(), name="rentobject-list"),
    # Locations
    path("locations/", LocationListView.as_view(), name="location-list"),
]
