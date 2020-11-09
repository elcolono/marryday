""" Urls """
from django.urls import path
from api import views

urlpatterns = [
    # Settings
    path("main-menus", views.MainMenuAPIViewSet.as_view()),
    path("flat-menus", views.FlatMenuAPIViewSet.as_view()),

    # path("subpage", views.SubpageAPIViewSet.as_view(), name="subpage"),
]
