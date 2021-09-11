"""products views"""
import json
import requests
from django.conf import settings

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser

from products.models import Product, ProductImage, ProductCategory
from products.permissions import IsProductOwner, IsProductImageOwner
from products.serializers import (
    ProductImageCreateSerializer, ProductImageRetrieveSerializer, ProductCreateSerializer, ProductListSerializer,
    ProductRetrieveSerializer, ProductUpdateSerializer, ProductDestroySerializer, ProductCategoryListSerializer)

from mailchimp_marketing.api_client import ApiClientError
import mailchimp_marketing as MailchimpMarketing


# Product Image
class ProductImageCreateView(generics.CreateAPIView):
    serializer_class = ProductImageCreateSerializer
    parser_classes = [MultiPartParser]


class ProductImageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsProductImageOwner]
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageRetrieveSerializer

    def destroy(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        super().destroy(request, *args, **kwargs)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Products
class ProductListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        if self.serializer_class:
            return self.serializer_class

        if self.request.method == 'POST':
            self.serializer_class = ProductCreateSerializer

        if self.request.method == 'GET':
            self.serializer_class = ProductListSerializer

        return self.serializer_class


class ProductPublicListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer


class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsProductOwner]
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.serializer_class:
            return self.serializer_class

        if self.request.method == 'GET':
            self.serializer_class = ProductRetrieveSerializer

        if self.request.method == 'PUT':
            self.serializer_class = ProductUpdateSerializer

        if self.request.method == 'DELETE':
            self.serializer_class = ProductDestroySerializer

        return self.serializer_class


# Product Category
class ProductCategoryTestListView(generics.ListAPIView):
    serializer_class = ProductCategoryListSerializer
    queryset = ProductCategory.objects.filter(is_active=True)


# Mailchimp Views
class MailchimpAudienceAPIVIEWSet(APIView):
    """ COMMENTS """

    def post(self, request):

        mailchimp_api_key = settings.MAILCHIMP_API_KEY
        mailchimp_data_center = settings.MAILCHIMP_DATA_CENTER
        mailchimp_email_list_id = settings.MAILCHIMP_EMAIL_LIST_ID
        # Check if payment data is complete
        if not mailchimp_api_key or not mailchimp_email_list_id or not mailchimp_email_list_id:
            return Response("Technical error", status=status.HTTP_400_BAD_REQUEST)

        try:
            """ COMMENTS """
            mailchimp = MailchimpMarketing.Client()
            mailchimp.set_config({
                "api_key": mailchimp_api_key,
                "server": mailchimp_data_center
            })
            list_id = mailchimp_email_list_id

            email_address = request.data['email']
            member_info = {
                "email_address": email_address,
                "status": "subscribed",
                # "merge_fields": {
                #     "FNAME": "Prudence",
                #     "LNAME": "McVankab"
                # }
            }
        except Exception as e:
            return Response({'error': str(e)})
        try:
            response = mailchimp.lists.add_list_member(list_id, member_info)
        except ApiClientError as error:
            # print("An exception occurred: {}".format(error.text))
            json_error = json.loads(error.text)
            return Response("Sie sind bereits angemeldet.", status=status.HTTP_400_BAD_REQUEST)
        return Response("Was successful")


# Pipedrive
class PipeDriveAPIVIEWSet(APIView):
    """ COMMENTS """

    def post(self, request):

        pipedrive_api_token = settings.PIPEDRIVE_API_TOKEN
        email_address = request.data['email']
        first_name = request.data['firstName']
        last_name = request.data['lastName']
        message_note = request.data['messageNote']

        if not pipedrive_api_token or not email_address or not first_name or not last_name:
            return Response("All data is required", status=status.HTTP_400_BAD_REQUEST)

        # Search for person
        response = requests.get(
            f'{settings.PIPEDRIVE_URL}persons/search?api_token={pipedrive_api_token}&exact_match=true&term={email_address}')
        content = json.loads(response.content)

        # if person not exist create person else get id from reqeust
        if not content['data']['items']:
            post_data = {
                'name': f'{first_name} {last_name}',
                'email': email_address
            }
            response = requests.post(
                f'{settings.PIPEDRIVE_URL}persons?api_token={pipedrive_api_token}', data=post_data)
            content = json.loads(response.content)
            person_id = content['data']['id']
        else:
            person_id = content['data']['items'][0]['item']['id']

        # Create deal
        post_data = {
            'title': f'{first_name} {last_name} deal',
            'person_id': person_id
        }
        response = requests.post(
            f'{settings.PIPEDRIVE_URL}deals?api_token={pipedrive_api_token}', data=post_data)
        content = json.loads(response.content)

        # Add note
        post_data = {
            'content': message_note,
            'deal_id': content['data']['id']
        }
        response = requests.post(
            f'{settings.PIPEDRIVE_URL}notes?api_token={pipedrive_api_token}', data=post_data)
        content = response.content

        return Response("Nachricht erfolgreich gesendet!")
