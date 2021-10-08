from django.shortcuts import get_object_or_404

from profiles.serializers.common import VendorListSerializer, VendorRetrieveUpdateSerializer, VisitorSerializer
from profiles.models import Vendor, Visitor
from profiles.permissions import IsUpdateVendor

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


# Vendor
class VendorListView(generics.ListAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorListSerializer

    def get_queryset(self):
        """
        This view should return a list of all the companies
        for the currently authenticated user.
        """
        user = self.request.user
        return Vendor.objects.filter(user=user)


class VendorRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsUpdateVendor]
    serializer_class = VendorRetrieveUpdateSerializer
    queryset = Vendor.objects.all()


class VendorRetrieveUpdateFromUserView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VendorRetrieveUpdateSerializer
    queryset = Vendor.objects.all()

    def get_object(self):
        user_id = self.request.user.id
        return get_object_or_404(Vendor, user=user_id)


# Visitor
class VisitorListView(generics.ListCreateAPIView):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer


class VisitorRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VisitorSerializer
    queryset = Visitor.objects.all()
