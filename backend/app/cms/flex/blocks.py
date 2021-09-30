""" All blocks """
from wagtail.core import blocks
from wagtail.core.models import Page
from wagtail.images.blocks import ImageChooserBlock

from wagtail.images.models import Image as WagtailImage
from rest_framework import serializers


class RichTextBlock(blocks.RichTextBlock):
    def get_api_representation(self, value, context=None):
        return "anything i want"


class WagtailImageSerializer(serializers.ModelSerializer):
    # def __init__(self, width, *args, **kwargs):
    #     self.width = width
    #     super().__init__()

    url = serializers.SerializerMethodField()

    class Meta:
        model = WagtailImage
        fields = ['title', 'url']

    def get_url(self, obj):
        # return obj.get_rendition('fill-300x186|jpegquality-60').url
        # return obj.get_rendition('fill-960x720').url
        # return obj.get_rendition(self.width).url
        return obj.get_rendition('original').url


class APIImageChooserBlock(ImageChooserBlock):

    def get_api_representation(self, value, context=None):
        if value:
            # Width because of next/images not needed anymore
            # return WagtailImageSerializer(context=context, width=self.width).to_representation(value)
            return WagtailImageSerializer(context=context).to_representation(value)
        else:
            return ''


class APIPageChooserBlock(blocks.PageChooserBlock):
    # pass
    def get_api_representation(self, value, context=None):
        if value:
            return {
                'slug': value.slug,
            }


# Product Slider Block
class CityGalleryBlock(blocks.StructBlock):
    """ City Gallery Block"""
    heading = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Heading",
        default='Super Awesome Hero Heading',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=5000,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )

    class Meta:
        """ meta data """
        label = 'City Gallery Block'


# Product Slider Block
class TopicSliderBlock(blocks.StructBlock):
    """ Service Section Block """
    grey_background = blocks.BooleanBlock(
        default=True,
        required=False
    )
    loop_slides = blocks.BooleanBlock(
        default=True,
        required=False
    )
    heading = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Heading",
        default='Super Awesome Hero Heading',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Subheading",
        default='Super Awesome Subheading',
    )
    button_link = APIPageChooserBlock(
        required=False,
    )
    button_text = blocks.CharBlock(
        required=False,
        max_length=80,
    )

    class Meta:
        """ meta data """
        label = 'Topic Slider'


# Product Slider Block


class ProductSliderBlock(blocks.StructBlock):
    """ Service Section Block """
    grey_background = blocks.BooleanBlock(
        default=True,
        required=False
    )
    loop_slides = blocks.BooleanBlock(
        default=True,
        required=False
    )
    heading = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Heading",
        default='Super Awesome Hero Heading',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Subheading",
        default='Super Awesome Subheading',
    )
    button_link = APIPageChooserBlock(
        required=False,
    )
    button_text = blocks.CharBlock(
        required=False,
        max_length=80,
    )

    class Meta:
        """ meta data """
        label = 'Product Slider'


# Heading Section
class PageHeadingSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    layout = blocks.ChoiceBlock(
        choices=(
            ('without_background', 'Without background'),
            ('with_background', 'With background')
        ),
        default="without_background"
    )
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
        default='Super Awesome Section',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    image = APIImageChooserBlock(
        label='Image',
    )
    primary_button_link = APIPageChooserBlock(
        required=False,
    )
    primary_button_text = blocks.CharBlock(
        required=False,
        max_length=80,
    )
    secondary_button_link = APIPageChooserBlock(
        required=False,
    )
    secondary_button_text = blocks.CharBlock(
        required=False,
        max_length=80,
    )

    class Meta:
        """ Meta data """
        label = 'Page Heading Section'


# FAQ Section
class FAQSectionBlock(blocks.StructBlock):
    """ FAQ Block - Ued by each section """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
        default='Super Awesome Section',
    )
    padding_top = blocks.BooleanBlock(default=True, required=False)
    padding_bottom = blocks.BooleanBlock(default=True, required=False)
    faqs = blocks.ListBlock(
        blocks.StructBlock([
            ("heading", blocks.CharBlock(required=True, max_length=1000)),
            ("content", blocks.TextBlock(required=True, max_length=5000)),
        ])
    )

    class Meta:
        """ Meta data """
        label = 'FAQ Section'


# Contact Section
class ContactSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
        default='Super Awesome Section',
    )
    contacts = blocks.ListBlock(
        blocks.StructBlock([
            ("type", blocks.ChoiceBlock(required=True, choices=(
                ('email', 'Email'),
                ('phone', 'Phone'),
            ))),
            ("heading", blocks.CharBlock(required=True, max_length=100)),
            ("content", blocks.TextBlock(required=True, max_length=500)),
            ("data", blocks.TextBlock(required=True, max_length=300)),
        ])
    )
    content = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Content',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    social = blocks.ListBlock(
        blocks.StructBlock([
            ("icon", blocks.CharBlock(required=False, max_length=100)),
            ("link", blocks.URLBlock(required=False, max_length=100)),
        ])
    )

    class Meta:
        """ Meta data """
        label = 'Contact Section'


# Content Seciton Block
class ContentSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    layout = blocks.ChoiceBlock(
        choices=(
            ('centered', 'Centered'),
            ('two_columns_with_image', 'Two columns with image')
        )
    )
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
        default='Super Awesome Section',
    )
    content = blocks.RichTextBlock(
        required=False,
        max_length=10000,
        label='Content',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )

    class Meta:
        """ Meta data """
        label = 'Content Section'


# Text With Image
class TextWithImageSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    layout = blocks.ChoiceBlock(
        default='text_left',
        choices=(
            ('text_left', 'Text left'),
            ('text_right', 'Text right')
        )
    )
    padding_top = blocks.BooleanBlock(default=True, required=False)
    padding_bottom = blocks.BooleanBlock(default=True, required=False)
    grey_background = blocks.BooleanBlock(
        default=True,
        required=False
    )
    heading = blocks.CharBlock(
        required=False,
        max_length=500,
        label='Feature',
        default='Super Awesome Feature',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=500,
        label='Subheading',
        default='Super Awesome Hero Subheading',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=1500,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    image = APIImageChooserBlock(
        required=True,
    )
    image_width = blocks.IntegerBlock()
    image_height = blocks.IntegerBlock()

    class Meta:
        """ Meta data """
        label = 'Text With Image Section'


# Hero Section Block
class HeroWithSearchBarBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Feature',
        default='Super Awesome Feature',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=100,
        label='Subheading',
        default='Super Awesome Hero Subheading',
    )
    show_searchbar = blocks.BooleanBlock(
        default=True,
        required=False
    )
    image = APIImageChooserBlock(
        required=True,
    )
    use_search = blocks.BooleanBlock(
        default=True,
        required=False
    )
    use_location_filter = blocks.BooleanBlock(
        default=True,
        required=False
    )
    use_product_category_filter = blocks.BooleanBlock(
        default=True,
        required=False
    )

    class Meta:
        """ Meta data """
        label = 'Hero Product Search'


# Hero Section Block
class HeroSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Feature',
        default='Super Awesome Feature',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=100,
        label='Subheading',
        default='Super Awesome Hero Subheading',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    button_text = blocks.CharBlock(
        required=False,
        max_length=100,
        label='Button text',
        default='Get in touch',
    )
    button_link = APIPageChooserBlock(
        required=False,
        label='Button link'
    )
    image = APIImageChooserBlock(
        required=True,
    )

    class Meta:
        """ Meta data """
        label = 'Hero Section'


# Testimonial Section Block
class TestimonialSliderBlock(blocks.StructBlock):
    """ Testimonial Section Block  """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Feature',
        default='Super Awesome Feature',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=100,
        label='Subheading',
        default='Super Awesome Hero Subheading',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    testimonials = blocks.ListBlock(
        blocks.StructBlock([
            ("image", APIImageChooserBlock(required=False, label="Image")),
            ("name", blocks.CharBlock(required=False, max_length=100)),
            ("content", blocks.TextBlock(required=True, max_length=300)),
        ])
    )

    class Meta:
        """ Meta data """
        label = 'Testimonial Slider'


# Logo Cloud Blocks

class LogoCloudBlock(blocks.StructBlock):
    """ LogoCloud Block """
    logos = blocks.ListBlock(
        blocks.StructBlock([
            ("image", ImageChooserBlock(required=True, label="Image")),
        ])
    )

    class Meta:
        """ Meta data """
        label = 'Logo Cloud'


# Service Section Block

class ServiceSectionBlock(blocks.StructBlock):
    """ Service Section Block """
    grey_background = blocks.BooleanBlock(
        default=True,
        required=False
    )
    heading = blocks.CharBlock(
        required=True,
        max_length=100,
        label="Heading",
        default='Super Awesome Hero Heading',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Subheading",
        default='Super Awesome Subheading',
    )
    layout = blocks.ChoiceBlock(
        choices=(
            ('service_with_icon', 'Services with Icons'),
            ('service_with_image', 'Services with Images'),
        ),
        default='services_with_icon'
    )
    services = blocks.ListBlock(
        blocks.StructBlock([
            ("icon", blocks.CharBlock(required=False)),
            ('image', APIImageChooserBlock(
                required=False,
                label='Image',
            )),
            ("heading", blocks.CharBlock(required=True, max_length=100)),
            ("description", blocks.TextBlock(required=True, max_length=300)),
        ])
    )

    class Meta:
        """ meta data """
        label = 'Service Section'


# Feature Section Block

class FeatureSectionBlock(blocks.StructBlock):
    """ Feature Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    features = blocks.ListBlock(
        blocks.StructBlock([
            ("icon", blocks.RawHTMLBlock(required=True, rows=5)),
            ("heading", blocks.CharBlock(required=True, max_length=100)),
            ("description", blocks.TextBlock(required=True, max_length=300)),
        ])
    )

    class Meta:
        """ meta data """
        label = 'Feature Section'


# Team Section Block
class TeamSectionBlock(blocks.StructBlock):
    """ Team Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    members = blocks.ListBlock(
        blocks.StructBlock([
            ("name", blocks.CharBlock(required=True, max_length=100)),
            ("position", blocks.CharBlock(required=True, max_length=100)),
            ("image", APIImageChooserBlock(
                required=False,
                label='Portrait Image',
            )),
        ])
    )

    class Meta:
        """ meta data """
        label = 'Team Section'


# Coming Soon Section Block
class ComingSoonSectionBlock(blocks.StructBlock):
    """ Coming Soon Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    description = blocks.RichTextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    timer = blocks.DateTimeBlock(required=True)

    class Meta:
        """ meta data """
        label = 'Coming Soon Section'


# Login Section Block


class LoginSectionBlock(blocks.StructBlock):
    """ Login Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    description = blocks.RichTextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    image = APIImageChooserBlock(
        required=False,
        label='Image',
    )

    class Meta:
        """ meta data """
        label = 'Login Section'


# Booking Section Block


class BookingSectionBlock(blocks.StructBlock):
    """ Booking Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    description = blocks.RichTextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )

    class Meta:
        """ meta data """
        label = 'Booking Section'


# Counter Section Block


class CounterSectionBlock(blocks.StructBlock):
    """ Counter Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    description = blocks.RichTextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    counters = blocks.ListBlock(
        blocks.StructBlock([
            ("heading", blocks.TextBlock(required=True, max_length=300)),
            ("count", blocks.IntegerBlock(required=True, max_value=1000000)),
            ("unit", blocks.CharBlock(required=True, max_length=30)),
        ])
    )

    class Meta:
        """ meta data """
        label = 'Counter Section'


# CTA Section
class CTASection(blocks.StructBlock):
    """ CTA Section Block """
    layout = blocks.ChoiceBlock(
        choices=(
            ('video-1', 'Video CTA'),
        ),
        default='video-1',
    )
    image = APIImageChooserBlock(
        required=False,
        label='Background Image',
    )

    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    button_text = blocks.CharBlock(
        required=False,
        max_length=20,
        label='Button text',
        default='Get in touch',
    )
    # button_link = blocks.URLBlock(required=False, label='Button Link')
    button_href = APIPageChooserBlock(
        required=False,
    )

    class Meta:
        """ meta data """
        label = 'CTA Section'


# Pricing Section
class PricingSectionBlock(blocks.StructBlock):
    """ Pricing Section Block """
    heading = blocks.CharBlock(required=False, max_length=100, label="Heading")
    description = blocks.RichTextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    image = APIImageChooserBlock(
        required=False,
        label='Image',
    )
    pricings = blocks.ListBlock(
        blocks.StructBlock([
            ("heading", blocks.CharBlock(required=True, max_length=100)),
            ("price", blocks.CharBlock(required=True, max_length=100)),
            ("suffix", blocks.CharBlock(required=True, max_length=100)),
            ("description", blocks.RichTextBlock(
                required=False,
                max_length=400,
                label='Description',
                default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
            )),
            ("items", blocks.ListBlock(
                blocks.StructBlock([
                    ("name", blocks.CharBlock(required=True)),
                    ("status", blocks.BooleanBlock(default=True))
                ])))
        ])
    )

    class Meta:
        """ meta data """
        label = 'Pricing Section'


# Pricing Section
class HTMLSectionBlock(blocks.StructBlock):
    """ Pricing Section Block """
    html = blocks.RawHTMLBlock(
        required=False,
        max_length=10000,
        label="HTML Code",
    )

    class Meta:
        """ meta data """
        label = 'HTML Section'


# Blog Section
class PortfolioSectionBlock(blocks.StructBlock):
    """ Blog Section Block """
    custom_classes = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Classes"
    )
    heading = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Heading"
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    projects = blocks.ListBlock(
        blocks.StructBlock([
            ("title", blocks.CharBlock(required=True, max_length=100)),
            ("description", blocks.CharBlock(required=True, max_length=200)),
            ("image", ImageChooserBlock(required=True, label="Image")),
            ("link", blocks.URLBlock(required=True, max_length=100)),
        ])
    )

    class Meta:
        """ meta data """
        label = 'Portfolio Section'


# Map Section
class MapSectionBlock(blocks.StructBlock):
    """ Map Block"""
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
        default='Super Awesome Section',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )

    class Meta:
        """ Meta data """
        label = 'Map Section'
