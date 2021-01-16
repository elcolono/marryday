from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from wagtailmenus.models import MainMenu, FlatMenu
from cms.rest import serializers
from cms.home.models import SubPage, HomePage
from cms.theme.models import ThemeSettings


# Main menu views
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


# Flat menu views
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


# Theme settings view
class ThemeSettingsAPIViewSet(APIView):
    """ COMMENTS """

    def get(self, request):
        """ GET theme settings"""
        try:
            main_menus = MainMenu.objects.all()
            flat_menus = FlatMenu.objects.all()
            theme_settings = ThemeSettings.objects.first()

        except MainMenu.DoesNotExist:
            return Response("Main Menus do not exist", status=status.HTTP_400_BAD_REQUEST)
        except ThemeSettings.DoesNotExist:
            return Response("Theme settings do not exist", status=status.HTTP_400_BAD_REQUEST)
        except FlatMenu.DoesNotExist:
            return Response("Flat Menues do not exist", status=status.HTTP_400_BAD_REQUEST)

        main_menus_serializer = serializers.MainMenuSerializer(
            main_menus, many=True)
        theme_settings_serializer = serializers.ThemeSettingsSerializer(
            theme_settings)
        flat_menus_serializer = serializers.FlatMenuSerializer(
            flat_menus, many=True)

        # return Response(serializer.data)
        return Response({
            "theme_settings": theme_settings_serializer.data,
            "main_menus": main_menus_serializer.data,
            "flat_menus": flat_menus_serializer.data
        })


class PageAPIViewSet(APIView):
    """ COMMENTS """

    def get(self, request, *args, **kwargs):
        slug = kwargs.get('slug')

        try:
            # if (slug == "home"):
            #     page_content = HomePage.objects.first()
            # else:
            #     page_content = SubPage.objects.get(slug=slug)
            main_menus = MainMenu.objects.all()
            flat_menus = FlatMenu.objects.all()
            theme_settings = ThemeSettings.objects.first()

        # except SubPage.DoesNotExist:
        #     return Response("SubPage does not exist", status=status.HTTP_400_BAD_REQUEST)
        except MainMenu.DoesNotExist:
            return Response("Main Menus do not exist", status=status.HTTP_400_BAD_REQUEST)
        except ThemeSettings.DoesNotExist:
            return Response("Theme settings do not exist", status=status.HTTP_400_BAD_REQUEST)
        except FlatMenu.DoesNotExist:
            return Response("Flat Menues do not exist", status=status.HTTP_400_BAD_REQUEST)

        # page_serializer = serializers.SubPageSerializer(page_content)
        main_menus_serializer = serializers.MainMenuSerializer(
            main_menus, many=True)
        theme_settings_serializer = serializers.ThemeSettingsSerializer(
            theme_settings)
        flat_menus_serializer = serializers.FlatMenuSerializer(
            flat_menus, many=True)


        # return Response(serializer.data)
        return Response({
            # "page_content": page_content,
            "theme_settings": theme_settings_serializer.data,
            "main_menus": main_menus_serializer.data,
            "flat_menus": flat_menus_serializer.data
        })
