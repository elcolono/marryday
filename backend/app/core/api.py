# api.py

from wagtail.api.v2.views import PagesAPIViewSet, BaseAPIViewSet, PageSerializer
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.images.api.v2.views import ImagesAPIViewSet
from wagtail.documents.api.v2.views import DocumentsAPIViewSet

# Add Custom PagesAPIViewSet

# Custom Page API ViewSet to add "show in menus"
# http://127.0.0.1:8001/api/v2/pages/?show_in_menus=true
class CustomPagesAPIViewSet(PagesAPIViewSet):
    listing_default_fields = BaseAPIViewSet.listing_default_fields + [
        'title',
        'html_url',
        'slug',
        # 'show_in_menus',
        'first_published_at',
    ]


# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')

# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests
api_router.register_endpoint('pages', CustomPagesAPIViewSet)
api_router.register_endpoint('images', ImagesAPIViewSet)
api_router.register_endpoint('documents', DocumentsAPIViewSet)
# api_router.register_endpoint('generic', GenericViewSet)
