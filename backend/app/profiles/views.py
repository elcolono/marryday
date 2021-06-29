from profiles.serializers.common import CompanySerializer, VisitorSerializer
from profiles.models import Vendor, Visitor
from profiles.permissions import IsUpdateCompany

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


# Company
class UserCompanyListView(generics.ListAPIView):
    queryset = Vendor.objects.all()
    serializer_class = CompanySerializer

    def get_queryset(self):
        """
        This view should return a list of all the companies
        for the currently authenticated user.
        """
        user = self.request.user
        return Vendor.objects.filter(user=user)


# Vendor
class CompanyView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsUpdateCompany]
    serializer_class = CompanySerializer
    queryset = Vendor.objects.all()


# Visitor
class VisitorListView(generics.ListCreateAPIView):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer


class VisitorView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VisitorSerializer
    queryset = Visitor.objects.all()
