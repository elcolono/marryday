from django.db import models
from wagtailmetadata.models import MetadataPageMixin

from cms.flex.models import FlexPage
from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from wagtail.api import APIField


class HomePage(MetadataPageMixin, FlexPage):
    """
    HomePage model which inherits from Flexpage
    Hint: Here the home template is used which extends the flex_page template
    """
    subpage_types = ['blog.BlogIndexPage', 'home.SubPage',
                     'home.SignupPage', 'home.SigninPage', ]


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
    description = models.TextField(max_length=1055)
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.SET_NULL, related_name='+', null=True,
    )
    subpage_types = []
    parent_page_types = ['home.HomePage']

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
