from rest_framework import serializers

from profiles.serializers.nested import VendorSerializer
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    vendors = VendorSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'vendors')
