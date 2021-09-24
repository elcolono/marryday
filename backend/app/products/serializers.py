from rest_framework import serializers
from products.models import Product, ProductImage, ProductCategory, ProductCategoryImage


# ProductImage
class ProductImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductImageRetrieveSerializer(serializers.ModelSerializer):
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
    images = ProductImageRetrieveSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""

    def to_internal_value(self, data):
        return data

    def to_representation(self, value):
        return value


class ProductRetrieveSerializer(serializers.ModelSerializer):
    images = ProductImageRetrieveSerializer(many=True)
    location = JSONSerializerField()

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


# ProductCategoryImage
class ProductCategoryImageRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategoryImage
        fields = '__all__'


# ProductCategory
class ProductCategoryListSerializer(serializers.ModelSerializer):
    images = ProductCategoryImageRetrieveSerializer(many=True)

    class Meta:
        model = ProductCategory
        fields = '__all__'


class ProductCategoryRetrieveSerializer(serializers.ModelSerializer):
    images = ProductCategoryImageRetrieveSerializer(many=True)
    products = ProductListSerializer(many=True)

    class Meta:
        model = ProductCategory
        fields = '__all__'
