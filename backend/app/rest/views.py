from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from wagtailmenus.models import MainMenu, FlatMenu
from rest import serializers
from home.models import SubPage

import mailchimp_marketing as MailchimpMarketing
from mailchimp_marketing.api_client import ApiClientError

import json


# Mailchimp Views
class MailchimpAudienceAPIVIEWSet(APIView):
    """ COMMENTS """

    def post(self, request):
        """ COMMENTS """
        mailchimp = MailchimpMarketing.Client()
        mailchimp.set_config({
            "api_key": settings.MAILCHIMP_API_KEY,
            "server": settings.MAILCHIMP_DATA_CENTER
        })
        list_id = settings.MAILCHIMP_EMAIL_LIST_ID

        email_address = request.data['email']
        member_info = {
            "email_address": email_address,
            "status": "subscribed",
            # "merge_fields": {
            #     "FNAME": "Prudence",
            #     "LNAME": "McVankab"
            # }
        }
        try:
            response = mailchimp.lists.add_list_member(list_id, member_info)
            print("response: {}".format(response))
        except ApiClientError as error:
            # print("An exception occurred: {}".format(error.text))
            json_error = json.loads(error.text)
            return Response({'error': json_error})
        return Response("Was successful")


# Menu Views
class MainMenuAPIViewSet(APIView):
    """ COMMENTS """

    def get(self, request):
        """ GET patient Profile"""
        try:
            main_menus = MainMenu.objects.all()
        except MainMenu.DoesNotExist:
            return Response("Main Menus do not exist", status=status.HTTP_400_BAD_REQUEST)
        serializer = serializers.MainMenuSerializer(main_menus, many=True)
        return Response(serializer.data)


class FlatMenuAPIViewSet(APIView):
    """ COMMENTS """

    def get(self, request):
        """ GET patient Profile"""
        try:
            flat_menus = FlatMenu.objects.all()
        except FlatMenu.DoesNotExist:
            return Response("Flat Menues do not exist", status=status.HTTP_400_BAD_REQUEST)
        serializer = serializers.FlatMenuSerializer(flat_menus, many=True)
        return Response(serializer.data)

# Subpage Views
# class SubpageAPIViewSet(APIView):
#     """ COMMENTS """
#     def get(self, request):
#         """ GET patient Profile"""
#         try:
#             subpage = SubPage.objects.first()
#         except MainMenu.DoesNotExist:
#             return Response("Page does not exist", status=status.HTTP_400_BAD_REQUEST)

#         serializer = serializers.SubPageSerializer(subpage)
#         return Response(serializer.data)
