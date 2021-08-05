from rest_framework import serializers
from products.models import Product, ProductImage


class ProductImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('title', 'image', 'product', 'is_thumbnail',)


class ProductImageRretrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('title', 'image', 'product', 'is_thumbnail',)


class ProductImageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('title', 'image', 'location',)


# Products
class ProductListCreateSerializer(serializers.ModelSerializer):
    preview_image = ProductImageListSerializer(required=False)

    class Meta:
        model = Product
        fields = ('title', 'slug', 'description', 'geometry',
                  'rating', 'preview_image',)


class ProductRetrieveSerializer(serializers.ModelSerializer):
    images = ProductImageRretrieveSerializer(many=True)
    prices = serializers.SerializerMethodField()
    amenities = serializers.SerializerMethodField()

    def get_amenities(self, obj):
        data = [
            {'type': 'wifi', 'label': 'Wifi', 'value': obj.wifi, 'icon': 'wifi'},
            {'type': 'printer', 'label': 'Drucker',
             'value': obj.printer, 'icon': 'print'},
            {'type': 'air_condition', 'label': 'Klimaanlage',
             'value': obj.air_condition, 'icon': 'fan'},
            {'type': 'coffee', 'label': 'Kaffee',
             'value': obj.coffee, 'icon': 'coffee'},
            {'type': 'locker', 'label': 'Schrank',
             'value': obj.storage, 'icon': 'lock'},
            {'type': 'shower', 'label': 'Dusche',
             'value': obj.shower, 'icon': 'shower'}
        ]
        return data

    def get_prices(self, obj):
        data = {
            'phone_hour': obj.phone_hour_price,
            'desktop_hour': obj.desktop_hour_price,
            'meeting_hour': obj.meeting_hour_price,
        }
        return data

    class Meta:
        model = Product
        fields = (
            'title', 'slug', 'booking_type', 'description', 'vicinity', 'formatted_address', 'opening_hour_periods',
            'geometry',
            'rating', 'amenities', 'website', 'images', 'prices')
