""" All blocks """
from wagtail.core.blocks import StructBlock, ChoiceBlock
from wagtail.images.blocks import ImageChooserBlock

from wagtail_color_panel.blocks import NativeColorBlock

from .choices import choices


# Section Blocks
class HeroSectionBlock(StructBlock):
    """ Section Base Block - Ued by each section """
    heading = CharBlock(
        required=True,
        max_length=80,
        label='Feature',
        default='Super Awesome Feature',
    )
    section_subheading = CharBlock(
        required=False,
        max_length=100,
        label='Subheading',
        default='Super Awesome Hero Subheading',
    )
    description = TextBlock(
        required=True,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    image = ImageChooserBlock(
        required=False,
        label='Image',
    )
