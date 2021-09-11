from django.urls import path
from locations.views import GoogleAutocompleteAPIVIEWSet, GoogleGeocodeAPIVIEWSet, CityListView

urlpatterns = [
    # Cites
    path("cities/", CityListView.as_view(), name="city-list"),

    # Others
    path("google-autocomplete", GoogleAutocompleteAPIVIEWSet.as_view(), name="google-autocomplete"),
    path("google-geocode", GoogleGeocodeAPIVIEWSet.as_view(), name="google-geocode"),
]
