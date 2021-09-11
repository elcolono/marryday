import requests
import json

from rest_framework import generics

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from django.conf import settings
from locations.serializers import CitySerializer
from locations.models import Country, State, City, District, Postcode


class CityListView(generics.ListAPIView):
    queryset = City.objects.filter(is_active=True)
    serializer_class = CitySerializer


# Google Places Views
class GoogleAutocompleteAPIVIEWSet(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request):
        input_data = request.query_params['input']
        response = requests.get(
            f'https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input_data}&types=address&key={settings.GOOGLE_PLACES_API_TOKEN}')
        content = json.loads(response.content)
        return Response(content)


class GoogleGeocodeAPIVIEWSet(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get_address_value_from_ype(address_components, address_type):
        for component in address_components:
            if component['types'][0] == address_type:
                return component
        return None

    def get_location_object(self, address_components, google_place):
        location_object = {}
        country = self.get_address_value_from_ype(address_components, "country")
        state = self.get_address_value_from_ype(address_components, "administrative_area_level_1")
        province = self.get_address_value_from_ype(address_components, "administrative_area_level_2")
        city = self.get_address_value_from_ype(address_components, "locality")
        postcode = self.get_address_value_from_ype(address_components, "postal_code")
        district = self.get_address_value_from_ype(address_components, "sublocality_level_1")
        street = self.get_address_value_from_ype(address_components, "route")
        street_number = self.get_address_value_from_ype(address_components, "street_number")
        geometry = google_place['geometry']

        if country is not None:
            country_obj, created = Country.objects.get_or_create(title=country['long_name'])
            location_object['country'] = country_obj.title

        if state is not None:
            state_obj, created = State.objects.get_or_create(title=state['long_name'])
            location_object['state'] = state_obj.title

        if province is not None:
            province_obj, created = State.objects.get_or_create(title=province['long_name'])
            location_object['province'] = province_obj.title

        if city is not None:
            city_obj, created = City.objects.get_or_create(title=city['long_name'])
            location_object['city'] = city_obj.title

        if district is not None:
            district_obj, created = District.objects.get_or_create(title=district['long_name'])
            location_object['district'] = district_obj.title

        if postcode is not None:
            postcode_obj, created = Postcode.objects.get_or_create(title=postcode['long_name'])
            location_object['postcode'] = postcode_obj.title

        if street is not None:
            location_object['street'] = street['long_name']

        if street_number is not None:
            location_object['street_number'] = street_number['long_name']

        if geometry is not None:
            location_object['geometry'] = geometry

        return location_object

    def get(self, request):
        place_id = request.query_params['place_id']
        response = requests.get(
            f'https://maps.googleapis.com/maps/api/place/details/json?placeid={place_id}&types=address&key={settings.GOOGLE_PLACES_API_TOKEN}')
        content = json.loads(response.content)
        google_place = content['result']
        address_components = content['result']['address_components']

        if not google_place or not address_components:
            return Response({"detail": "Could not fetch place detail data."})

        location_object = self.get_location_object(address_components, google_place)
        return Response(location_object)
