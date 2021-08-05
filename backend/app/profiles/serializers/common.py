from rest_framework import serializers
from profiles.models import Vendor, Visitor


# Company
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ("id", "user", "vendor_name", "slug")

    # def to_representation(self, instance):
    #     self.fields['user'] =  UserSerializer(read_only=True)
    #     return super(CompanySerializer, self).to_representation(instance)


# Visitor
class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = ("id", "user",)
