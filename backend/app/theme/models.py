from django.db import models

from wagtail.admin.edit_handlers import MultiFieldPanel, FieldPanel, FieldRowPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting
from wagtail.admin.edit_handlers import (ObjectList, TabbedInterface)
from wagtail.images.edit_handlers import ImageChooserPanel


@register_setting(icon='view')
class ThemeSettings(BaseSetting):
    """
    Theme Settings
    """
    # General settings
    about_short_description = models.TextField(
        blank=True,
        null=True,
        max_length=500,
        verbose_name='About short description',
    )
    about_address = models.CharField(
        blank=True,
        null=True,
        max_length=100,
        verbose_name='About address',
    )
    about_phone = models.CharField(
        blank=True,
        null=True,
        max_length=50,
        verbose_name='About phone',
    )
    about_email = models.EmailField(
        blank=True,
        null=True,
        max_length=50,
        verbose_name='About email',
    )
    # Branding settings
    logo = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name=('Logo Image'),
    )
    favicon = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name=('Favicon'),
    )

    panels = [
        ImageChooserPanel('logo'),
        ImageChooserPanel('favicon'),
        FieldPanel('about_short_description'),
        FieldPanel('about_address'),
        FieldPanel('about_phone'),
        FieldPanel('about_email'),
    ]

    class Meta:
        verbose_name = 'Theme'
