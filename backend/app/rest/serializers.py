"""
Serializers
"""
from rest_framework import serializers
from home.models import SubPage
from wagtailmenus.models import FlatMenu, FlatMenuItem, MainMenu, MainMenuItem


class SubPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubPage
        fields = ('depth', 'title', 'slug')


class MainMenuItemSerializer(serializers.ModelSerializer):
    """ COMMENTS """
    link_page = SubPageSerializer()

    class Meta:
        model = MainMenuItem
        fields = '__all__'


class MainMenuSerializer(serializers.Serializer):
    """ COMMENTS """
    menu_items = MainMenuItemSerializer(many=True)

    class Meta:
        model = MainMenu
        fields = '__all__'


class FlatMenuItemSerializer(serializers.ModelSerializer):
    """ COMMENTS """
    link_page = SubPageSerializer()

    class Meta:
        model = FlatMenuItem
        fields = '__all__'


class FlatMenuSerializer(serializers.ModelSerializer):
    """ COMMENTS """
    menu_items = FlatMenuItemSerializer(many=True)

    class Meta:
        model = FlatMenu
        fields = '__all__'