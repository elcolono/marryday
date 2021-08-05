from django.urls import path

urlpatters = [
    # Cites
    path("cities/", CityListView.as_view(), name="city-list"),
]
