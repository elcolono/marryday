from django.urls import path
from profiles.views import *

urlpatterns = [
    # Vendor
    path("vendors/", VendorListView.as_view(), name="profile-vendor-list"),
    path("vendors/<int:pk>/", VendorRetrieveUpdateView.as_view(), name="profile-vendor-retrieve-update"),
    path("vendors/user/", VendorRetrieveUpdateFromUserView.as_view(),
         name="profile-vendor-retrieve-update-from-user"),

    # Visitor
    path("visitors/", VisitorListView.as_view(), name="profile-visitor-list"),
    path("visitors/<int:pk>/", VisitorRetrieveUpdateView.as_view(), name="profile-visitor-vendor-retrieve-update"),
]
