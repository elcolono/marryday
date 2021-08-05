from django.urls import path
from products.views import ProductListCreateView, ProductImageCreateView, LocationRetrieveView, \
    MailchimpAudienceAPIVIEWSet, PipeDriveAPIVIEWSet

urlpatterns = [
    path("image/", ProductImageCreateView.as_view(), name="product-image-create"),
    path("<slug>/", LocationRetrieveView.as_view(), name="product-detail"),
    path("", ProductListCreateView.as_view(), name="product-list-create"),
    path("mailchimp-audience", MailchimpAudienceAPIVIEWSet.as_view(),
         name="mailchimp-add"),
    path("pipedrive-deal", PipeDriveAPIVIEWSet.as_view(),
         name="pipedrive-deal-add"),
]
