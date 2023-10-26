""" Blog Models """
from django.db import models
from django import forms

# New imports added for ParentalKey, Orderable, InlinePanel, ImageChooserPanel

from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.api import APIField
from wagtail import blocks
from wagtail.models import Page, Orderable
from wagtail.fields import RichTextField, StreamField
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.images.blocks import ImageChooserBlock
from wagtail.search import index

from wagtail.snippets.models import register_snippet
from wagtailmetadata.models import MetadataPageMixin

from rest_framework.fields import Field


class BlogChildPageSerializer(Field):
    def to_representation(self, child_pages):
        return_posts = []
        for child in child_pages:
            post_dict = {
                'id': child.id,
                'title': child.title,
                'slug': child.slug,
            }
            return_posts.append(post_dict)
        return return_posts

        # Create your models here.


class BlogIndexPage(MetadataPageMixin, Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]
    api_fields = [
        APIField('intro'),
        APIField('posts', serializer=BlogChildPageSerializer(
            source='get_child_pages'))
    ]
    subpage_types = ['blog.BlogPage']
    parent_page_types = ['home.HomePage']

    def get_child_pages(self):
        return self.get_children().public().live()


class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey(
        'BlogPage', on_delete=models.CASCADE, related_name='tagged_items')


class BlogPage(MetadataPageMixin, Page):
    date = models.DateField("Post date")
    heading = models.CharField(max_length=500, null=True, blank=True,)
    intro = models.TextField(max_length=1000)
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.SET_NULL, related_name='+', null=True,
    )
    content = StreamField([
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
    ])
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    categories = ParentalManyToManyField('blog.BlogCategory', blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('content'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
        FieldPanel('image'),
        FieldPanel('content'),
        MultiFieldPanel([
            FieldPanel('date'),
            FieldPanel('tags'),
            FieldPanel('categories', widget=forms.CheckboxSelectMultiple),
        ], heading='Blog information'),
    ]

    api_fields = [
        APIField('date'),
        APIField('heading'),
        APIField('intro'),
        APIField('image'),
        APIField('content'),
        APIField('tags'),
        APIField('categories'),
    ]


@ register_snippet
class BlogCategory(models.Model):
    name = models.CharField(max_length=255)

    panels = [
        FieldPanel('name'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'blog categories'
