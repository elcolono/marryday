from rest_framework import serializers
from profiles.models import Vendor, Visitor


# Vendor
class VendorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = "__all__"


class VendorRetrieveUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = "__all__"
        read_only_fields = ["id", "user", "created_at", "created_by"]


# Visitor
class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = "__all__"
