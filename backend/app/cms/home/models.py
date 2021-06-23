from django.db import models
from rest_framework.fields import Field
from rest_framework import serializers
from wagtailmetadata.models import MetadataPageMixin

from cms.flex.models import FlexPage

from wagtail.core import blocks
from wagtail.core.models import Page
from wagtail.core.fields import StreamField, RichTextField
from wagtail.core.templatetags.wagtailcore_tags import richtext
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from wagtail.api import APIField
from wagtail.admin.edit_handlers import PageChooserPanel


class APIPageChooserBlock(blocks.PageChooserBlock):
    # pass
    def get_api_representation(self, value, context=None):
        if value:
            return {
                'slug': value.slug,
            }


class RichTextSerializedField(Field):
    def to_representation(self, value):
        return richtext(value)


class HomePage(MetadataPageMixin, FlexPage):
    """
    HomePage model which inherits from Flexpage
    Hint: Here the home template is used which extends the flex_page template
    """
    subpage_types = ['blog.BlogIndexPage', 'home.SubPage',
                     'home.SignupPage', 'home.SigninPage', 'home.Page404',
                     'user_account.AccountIndexPage', ]


class SubPage(MetadataPageMixin, FlexPage):
    """
    SubPage model which inherits from Flexpage
    Hint: Here the subpage template is used which extends the flex_page template
    """
    subpage_types = ['blog.BlogIndexPage']
    parent_page_types = ['home.HomePage']


class SignupPage(MetadataPageMixin, Page):
    heading = models.CharField(max_length=255)
    description = models.TextField(max_length=1055)
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.SET_NULL, related_name='+', null=True,
    )
    subpage_types = []
    parent_page_types = ['home.HomePage']
    max_count = 1

    # Editor panels configuration

    content_panels = Page.content_panels + [
        FieldPanel('heading', classname="full"),
        FieldPanel('description', classname="full"),
        ImageChooserPanel('image'),
    ]

    # under content_panels:

    api_fields = [
        APIField('heading'),
        APIField('description'),
        APIField('image'),
    ]


class SigninPage(MetadataPageMixin, Page):
    heading = models.CharField(max_length=255)
    description = RichTextField()
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.SET_NULL, related_name='+', null=True,
    )
    subpage_types = []
    parent_page_types = ['home.HomePage']
    max_count = 1

    # Editor panels configuration

    content_panels = Page.content_panels + [
        FieldPanel('heading', classname="full"),
        FieldPanel('description', classname="full"),
        ImageChooserPanel('image'),
    ]

    # under content_panels:

    api_fields = [
        APIField('heading'),
        APIField('description', serializer=RichTextSerializedField()),
        APIField('image'),
    ]


class Page404(MetadataPageMixin, Page):
    heading = models.CharField(max_length=255)
    description = models.TextField(max_length=1055)
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.SET_NULL, related_name='+', null=True,
    )
    button_text = models.CharField(max_length=255)

    subpage_types = []
    parent_page_types = ['home.HomePage']
    max_count = 1

    # Editor panels configuration

    content_panels = Page.content_panels + [
        FieldPanel('heading', classname="full"),
        FieldPanel('description', classname="full"),
        ImageChooserPanel('image'),
        FieldPanel('button_text', classname="full"),
    ]

    # under content_panels:

    api_fields = [
        APIField('heading'),
        APIField('description'),
        APIField('image'),
        APIField('button_text'),
    ]
