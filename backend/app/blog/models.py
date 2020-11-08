from django.db import models
from django import forms

# New imports added for ParentalKey, Orderable, InlinePanel, ImageChooserPanel

from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.core import blocks
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField, StreamField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel, StreamFieldPanel
from wagtail.images.blocks import ImageChooserBlock
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.search import index

from wagtail.snippets.models import register_snippet
from wagtailmetadata.models import MetadataPageMixin


# Create your models here.
class BlogTagIndexPage(MetadataPageMixin, Page):
    parent_page_types = ['home.HomePage']

    def get_context(self, request):

        # Filter by tag
        tag = request.GET.get('tag')
        blogpages = BlogPage.objects.filter(tags__name=tag)

        # Update template context
        context = super().get_context(request)
        context['blogpages'] = blogpages
        return context


class BlogIndexPage(MetadataPageMixin, Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]
    subpage_types = ('blog.BlogPage',)
    parent_page_types = ('home.HomePage',)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        blogpages = self.get_children().live().order_by('-first_published_at')
        context['blogpages'] = blogpages
        return context

    class Meta:
        verbose_name = "Blog page"


class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey(
        'BlogPage', on_delete=models.CASCADE, related_name='tagged_items')


class BlogPage(MetadataPageMixin, Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
        ('person', blocks.StructBlock([
            ('first_name', blocks.CharBlock()),
            ('surname', blocks.CharBlock()),
            ('photo', ImageChooserBlock(required=False)),
            ('biography', blocks.RichTextBlock()),
        ], icon='user')),
    ])
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    categories = ParentalManyToManyField('blog.BlogCategory', blank=True)
    author = ParentalKey('blog.BlogAuthor', blank=True, null=True, on_delete=models.SET_NULL)

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
        StreamFieldPanel('body'),
        InlinePanel('gallery_images', label="Gallery images"),
        MultiFieldPanel([
            FieldPanel('date'),
            FieldPanel('tags'),
            FieldPanel('categories', widget=forms.CheckboxSelectMultiple),
            SnippetChooserPanel('author'),
        ], heading='Blog information'),
    ]
    parent_page_types = ['blog.BlogIndexPage']

    def main_image(self):
        gallery_item = self.gallery_images.first()
        if gallery_item:
            return gallery_item.image
        else:
            return None
    
    def get_context(self, request):
        context = super().get_context(request)
        blogpages = BlogPage.objects.live().not_page(self).order_by('-first_published_at')
        tag_cloud = BlogPageTag.objects.all()
        context['blogpages'] = blogpages
        context['tag_cloud'] = tag_cloud
        return context




class BlogPageGalleryImage(Orderable):
    page = ParentalKey(BlogPage, on_delete=models.CASCADE,
                       related_name='gallery_images')
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )
    caption = models.CharField(blank=True, max_length=250)

    panels = [
        ImageChooserPanel('image'),
        FieldPanel('caption'),
    ]

@register_snippet
class BlogAuthor(ClusterableModel):
    name = models.CharField(max_length=255)
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )
    description = models.TextField(max_length=500)

    panels = [
        FieldPanel('name'),
        FieldPanel('description'),
        ImageChooserPanel('image'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'blog authors'


@register_snippet
class BlogCategory(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ForeignKey(
        'wagtailimages.Image', null=True, blank=True,
        on_delete=models.SET_NULL, related_name='+'
    )

    panels = [
        FieldPanel('name'),
        ImageChooserPanel('icon'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'blog categories'
