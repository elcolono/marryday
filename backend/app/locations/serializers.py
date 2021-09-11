from rest_framework import serializers

from .models import CityImage, District, City


class CityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityImage
        fields = ('title', 'image',)


class CitySerializer(serializers.ModelSerializer):
    preview_image = CityImageSerializer()

    class Meta:
        model = City
        fields = ('id', 'title', 'postcode', 'slug', 'preview_image',)


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ('id', 'title')
