from rest_framework import generics, permissions
from ..models import RentObject, Location
from .serializers.common import RentObjectSerializer, LocationSerializer


# Locations
class LocationListView(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


# RentObjects
class RentObjectListView(generics.ListCreateAPIView):
    # queryset = RentObject.objects.all()
    serializer_class = RentObjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filtering against `location` & `type` query parameter in the URL.
        """
        queryset = RentObject.objects.all()
        location = self.request.query_params.get('location', None)
        type = self.request.query_params.get('type', None)

        if location is not None:
            queryset = queryset.filter(location=location)
        if type is not None:
            queryset = queryset.filter(type=type)
        return queryset
