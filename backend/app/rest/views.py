from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from wagtailmenus.models import MainMenu, FlatMenu
from rest import serializers
from home.models import SubPage

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
