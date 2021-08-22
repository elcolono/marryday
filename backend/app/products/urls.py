from django.urls import path
from products.views import \
    VendorProductListCreateView, \
    ProductImageCreateView, \
    ProductImageRetrieveUpdateDestroy, \
    VendorProductRetrieveUpdateDestroyView, \
    MailchimpAudienceAPIVIEWSet, \
    PipeDriveAPIVIEWSet

urlpatterns = [
    path("<pk>/vendor/", VendorProductRetrieveUpdateDestroyView.as_view(),
         name="vendor-product-retrieve-update-destroy"),
    path("vendor", VendorProductListCreateView.as_view(), name="vendor-product-list-create"),

    path("image/", ProductImageCreateView.as_view(), name="product-image-create"),
    path("image/<pk>", ProductImageRetrieveUpdateDestroy.as_view(), name="product-image-retrieve-update-destroy"),

    path("mailchimp-audience", MailchimpAudienceAPIVIEWSet.as_view(),
         name="mailchimp-add"),
    path("pipedrive-deal", PipeDriveAPIVIEWSet.as_view(),
         name="pipedrive-deal-add"),
]
