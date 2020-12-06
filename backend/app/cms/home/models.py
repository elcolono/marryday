
from wagtailmetadata.models import MetadataPageMixin

from cms.flex.models import FlexPage


class HomePage(MetadataPageMixin, FlexPage):
    """
    HomePage model which inherits from Flexpage
    Hint: Here the home template is used which extends the flex_page template
    """
    subpage_types = ['blog.BlogIndexPage', 'home.SubPage']


class SubPage(MetadataPageMixin, FlexPage):
    """
    SubPage model which inherits from Flexpage
    Hint: Here the subpage template is used which extends the flex_page template
    """
    subpage_types = ['blog.BlogIndexPage']
    parent_page_types = ['home.HomePage']
