""" Flex Page """

from wagtail.admin.edit_handlers import StreamFieldPanel, RichTextFieldPanel
from wagtail.core.models import Page
from wagtail.core.fields import StreamField, RichTextField
from wagtail.api import APIField

from .blocks import (PageHeadingSectionBlock, HeroSectionBlock, LogoCloudBlock, ServiceSectionBlock,
                     FeatureSectionBlock, CounterSectionBlock, TeamSectionBlock, CTASection, PricingSectionBlock, ContactSectionBlock,
                     ContentSectionBlock, TestimonialSectionBlock, HTMLSectionBlock, PortfolioSectionBlock, ComingSoonSectionBlock)


# Create your models here.


class FlexPage(Page):
    """
    Abstract Page Extension
    Define abstract to dont create own database table for this model - fields are created in the child class
    """
    seo_text = RichTextField(blank=True, null=True, verbose_name="SEO Text",)
    content = StreamField(
        [
            ('page_heading_section_block', PageHeadingSectionBlock()),
            ('hero_section_block', HeroSectionBlock()),
            ('logo_cloud_block', LogoCloudBlock()),
            ('service_section_block', ServiceSectionBlock()),
            ('feature_section_block', FeatureSectionBlock()),
            ('counter_section_block', CounterSectionBlock()),
            ('team_section_block', TeamSectionBlock()),
            ('cta_section_block', CTASection()),
            ('pricing_section_block', PricingSectionBlock()),
            ('content_section_block', ContentSectionBlock()),
            ('testimonial_section_block', TestimonialSectionBlock()),
            ('html_section_block', HTMLSectionBlock()),
            ('portfolio_section_block', PortfolioSectionBlock()),
            ('comingsoon_section_block', ComingSoonSectionBlock()),
            ('contact_section_block', ContactSectionBlock()),
        ],
        null=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        RichTextFieldPanel("seo_text"),
        StreamFieldPanel("content"),
    ]

    # under content_panels:
    api_fields = [
        APIField('seo_text'),
        APIField('content'),
    ]

    template = "flex/flex_page.html"

    class Meta:
        abstract = True
