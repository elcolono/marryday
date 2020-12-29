""" Urls """
from django.urls import path
from cms.rest import views

urlpatterns = [
    # Settings
    # path("main-menus", views.MainMenuAPIViewSet.as_view()),
    # path("flat-menus", views.FlatMenuAPIViewSet.as_view()),
    # path("theme-settings", views.ThemeSettingsAPIViewSet.as_view()),
    path("mailchimp-audience", views.MailchimpAudienceAPIVIEWSet.as_view()),

    path("page/<slug>", views.PageAPIViewSet.as_view()),
]
