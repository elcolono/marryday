""" CMS User Account Models """
from django.db import models

from wagtail.api import APIField
from wagtail.core import blocks
from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel

from wagtailmetadata.models import MetadataPageMixin
from rest_framework.fields import Field


class APIPageChooserBlock(blocks.PageChooserBlock):
    # pass
    def get_api_representation(self, value, context=None):
        if value:
            return {
                'slug': value.slug,
            }


class AccountChildPageSerializer(Field):
    def to_representation(self, child_pages):
        return_pages = []
        for child in child_pages:
            page_dict = {
                'id': child.id,
                'title': child.title,
                'icon': child.icon,
                'short_description': child.short_description,
                'slug': child.slug,
            }
            return_pages.append(page_dict)
        return return_pages

        # Create your models here.


class AccountIndexPage(MetadataPageMixin, Page):

    heading = models.CharField(max_length=255)
    description = models.TextField(max_length=1055)

    cards = StreamField(
        [
            ('card', blocks.StructBlock([
                ("coming_soon", blocks.BooleanBlock(
                    default=False, required=False)),
                ("title", blocks.CharBlock(required=True, max_length=100)),
                ("link", APIPageChooserBlock()),
                ("icon", blocks.CharBlock(required=True, max_length=100)),
                ("content", blocks.TextBlock(required=True, max_length=500)),
            ]))
        ],
        null=True,
        blank=True,
    )

    subpage_types = ['user_account.AccountPage',
                     'user_account.AccountProfilePage', 'user_account.AccountPaymentPage']
    parent_page_types = ['home.HomePage']
    max_count = 1

    # Editor panels configuration

    content_panels = Page.content_panels + [
        FieldPanel('heading', classname="full"),
        FieldPanel('description', classname="full"),
        StreamFieldPanel('cards'),
    ]

    # under content_panels:

    api_fields = [
        APIField('heading'),
        APIField('description'),
        APIField('cards'),
        # APIField('childs', serializer=AccountChildPageSerializer(
        #     source='get_child_pages'))
    ]

    def get_child_pages(self):
        return self.get_children().specific().public().live()


class AccountPage(MetadataPageMixin, Page):

    heading = models.CharField(max_length=255)
    icon = models.CharField(max_length=255, null=True)

    short_description = models.TextField(max_length=1055, null=True)
    description = models.TextField(max_length=1055, null=True)

    subpage_types = []
    parent_page_types = ['user_account.AccountIndexPage']

    # Editor panels configuration

    content_panels = Page.content_panels + [
        FieldPanel('heading', classname="full"),
        FieldPanel('icon', classname="full"),
        FieldPanel('short_description', classname="full"),
        FieldPanel('description', classname="full"),

    ]

    # under content_panels:

    api_fields = [
        APIField('heading'),
        APIField('icon'),
        APIField('short_description'),
        APIField('description'),
    ]


class AccountProfilePage(MetadataPageMixin, Page):

    heading = models.CharField(max_length=255)
    description = models.TextField(max_length=1055, null=True)

    subpage_types = []
    parent_page_types = ['user_account.AccountIndexPage']

    # Editor panels configuration

    content_panels = Page.content_panels + [
        FieldPanel('heading', classname="full"),
        FieldPanel('description', classname="full"),
    ]

    # under content_panels:

    api_fields = [
        APIField('heading'),
        APIField('description'),
    ]


class AccountPaymentPage(MetadataPageMixin, Page):

    heading = models.CharField(max_length=255)
    description = models.TextField(max_length=1055, null=True)
    stripe_account_description = models.TextField(
        max_length=1055, null=True, blank=True)

    subpage_types = []
    parent_page_types = ['user_account.AccountIndexPage']

    # Editor panels configuration

    content_panels = Page.content_panels + [
        FieldPanel('heading', classname="full"),
        FieldPanel('description', classname="full"),
        FieldPanel('stripe_account_description', classname="full")
    ]

    # under content_panels:

    api_fields = [
        APIField('heading'),
        APIField('description'),
        APIField('stripe_account_description'),
    ]
