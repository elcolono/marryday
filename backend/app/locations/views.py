from rest_framework import generics

from products.serializers import CitySerializer
from locations.models import City


class CityListView(generics.ListAPIView):
    queryset = City.objects.filter(is_active=True)
    serializer_class = CitySerializer
