""" Flex Page """

from wagtail.admin.edit_handlers import StreamFieldPanel, RichTextFieldPanel
from wagtail.core.models import Page
from wagtail.core.fields import StreamField, RichTextField
from wagtail.api import APIField

from .blocks import (PageHeadingSectionBlock, MapSectionBlock, HeroSectionBlock, HeroWithSearchBarBlock,
                     LogoCloudBlock, ServiceSectionBlock,
                     FeatureSectionBlock, CounterSectionBlock, TeamSectionBlock, CTASection, PricingSectionBlock,
                     ContactSectionBlock, TextWithImageSectionBlock,
                     ContentSectionBlock, TestimonialSectionBlock, HTMLSectionBlock, PortfolioSectionBlock,
                     ComingSoonSectionBlock,
                     FAQSectionBlock, LoginSectionBlock, BookingSectionBlock, ProductSliderBlock, CityGalleryBlock,
                     TopicSliderBlock)


# Create your models here.


class FlexPage(Page):
    """
    Abstract Page Extension
    Define abstract to dont create own database table for this model - fields are created in the child class
    """
    seo_text = RichTextField(blank=True, null=True, verbose_name="SEO Text", )
    content = StreamField(
        [
            ('hero_with_search_bar', HeroWithSearchBarBlock()),
            ('service_section_block', ServiceSectionBlock()),
            ('topic_slider', TopicSliderBlock()),
            ('product_slider', ProductSliderBlock()),

            ('page_heading_section_block', PageHeadingSectionBlock()),
            ('map_section_block', MapSectionBlock()),
            ('hero_section_block', HeroSectionBlock()),
            ('city_gallery_section_block', CityGalleryBlock()),
            ('logo_cloud_block', LogoCloudBlock()),
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
            ('faq_section_block', FAQSectionBlock()),
            ('login_section_block', LoginSectionBlock()),
            ('booking_section_block', BookingSectionBlock()),
            ('text_with_image_section_block', TextWithImageSectionBlock()),
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

    class Meta:
        abstract = True
