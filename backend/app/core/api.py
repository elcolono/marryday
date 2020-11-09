# api.py

from wagtail.api.v2.views import PagesAPIViewSet, BaseAPIViewSet, PageSerializer
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.images.api.v2.views import ImagesAPIViewSet
from wagtail.documents.api.v2.views import DocumentsAPIViewSet
from rest_framework.views import APIView
from wagtailmenus.models import MenuPage
from rest_framework.response import Response
from rest_framework import status


# Add Custom APIViewSets
# class SettingsAPIViewSet(APIView):
#     """ COMMENTS """
#     def get(self, request):
#         """ GET patient Profile"""
#         try:
#             test = MenuPage.objects.all()
#         except MenuPage.DoesNotExist:
#             return Response("Settings does not exist", status=status.HTTP_400_BAD_REQUEST)

#         # serializer = serializers.PatientProfileSerializer(patient)
#         return Response("false")


# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')

# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests
api_router.register_endpoint('pages', PagesAPIViewSet)
api_router.register_endpoint('images', ImagesAPIViewSet)
api_router.register_endpoint('documents', DocumentsAPIViewSet)
# api_router.register_endpoint('settings', SettingsAPIViewSet)
# api_router.register_endpoint('generic', GenericViewSet)
