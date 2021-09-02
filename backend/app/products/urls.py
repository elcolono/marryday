from django.urls import path
from products.views import \
    ProductListCreateView, \
    ProductImageCreateView, \
    ProductImageRetrieveUpdateDestroy, \
    ProductRetrieveUpdateDestroyView, \
    MailchimpAudienceAPIVIEWSet, \
    PipeDriveAPIVIEWSet, \
    ProductCategoryTestListView

urlpatterns = [
    # ProductCategories
    path("category/", ProductCategoryTestListView.as_view(), name="product-category-list"),

    # ProductImages
    path("image/", ProductImageCreateView.as_view(), name="product-image-create"),
    path("image/<pk>", ProductImageRetrieveUpdateDestroy.as_view(), name="product-image-retrieve-update-destroy"),

    # Products
    path("<pk>/", ProductRetrieveUpdateDestroyView.as_view(), name="vendor-product-retrieve-update-destroy"),
    path("", ProductListCreateView.as_view(), name="vendor-product-list-create"),

    # Others
    path("mailchimp-audience", MailchimpAudienceAPIVIEWSet.as_view(), name="mailchimp-add"),
    path("pipedrive-deal", PipeDriveAPIVIEWSet.as_view(), name="pipedrive-deal-add"),

]
