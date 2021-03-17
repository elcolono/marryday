from .serializers.common import CompanySerializer, VisitorSerializer
from ..models import Company, Visitor
from .permissions import IsUpdateCompany

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics, permissions, filters

from django_filters.rest_framework import DjangoFilterBackend


# Company
class UserCompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_queryset(self):
        """
        This view should return a list of all the companies
        for the currently authenticated user.
        """
        user = self.request.user
        return Company.objects.filter(user=user)


# Company
class CompanyView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsUpdateCompany]
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


# Visitor
class VisitorListView(generics.ListCreateAPIView):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer


class VisitorView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VisitorSerializer
    queryset = Visitor.objects.all()




# Company
# class CompanyListView(generics.ListCreateAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['user', ]
