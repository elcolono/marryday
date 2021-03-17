from rest_framework import serializers
from ...models import Company, Visitor


# Company
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ("id", "user", "company_name", "slug")

    # def to_representation(self, instance):
    #     self.fields['user'] =  UserSerializer(read_only=True)
    #     return super(CompanySerializer, self).to_representation(instance)


# Visitor
class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = ("id", "user",)
