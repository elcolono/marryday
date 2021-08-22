from rest_framework import serializers
from products.models import Product, ProductImage


# ProductImage
class ProductImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('title', 'image', 'product', 'is_thumbnail',)


class ProductImageRretrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductImageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


# Product
class ProductCreateSerializer(serializers.ModelSerializer):
    preview_image = ProductImageListSerializer(required=False)

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['id', 'user', 'slug']


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductRetrieveSerializer(serializers.ModelSerializer):
    images = ProductImageRretrieveSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['user', 'slug']


class ProductDestroySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title']
