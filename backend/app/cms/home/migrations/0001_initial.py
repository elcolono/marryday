# Generated by Django 3.1.4 on 2020-12-06 08:38

import cms.flex.blocks
from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.blocks
import wagtail.core.fields
import wagtail.images.blocks
import wagtailmetadata.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('wagtailimages', '0022_uploadedimage'),
        ('wagtailcore', '0045_assign_unlock_grouppagepermission'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
                ('seo_text', wagtail.core.fields.RichTextField(blank=True, null=True, verbose_name='SEO Text')),
                ('content', wagtail.core.fields.StreamField([('page_heading_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-960x720'))])), ('hero_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('button', wagtail.core.blocks.CharBlock(default='Get in touch', label='Button text', max_length=100, required=False)), ('button_link', wagtail.core.blocks.URLBlock(label='Button link', required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-960x720'))])), ('logo_cloud_block', wagtail.core.blocks.StructBlock([('logos', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=True))])))])), ('service_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('layout', wagtail.core.blocks.ChoiceBlock(choices=[('service_with_icon', 'Services with Icons'), ('service_with_image', 'Services with Images')])), ('services', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.CharBlock(required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-320x320')), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('feature_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('features', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.RawHTMLBlock(required=True, rows=5)), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('counter_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('counters', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.TextBlock(max_length=300, required=True)), ('count', wagtail.core.blocks.IntegerBlock(max_value=1000000, required=True)), ('unit', wagtail.core.blocks.CharBlock(max_length=30, required=True))])))])), ('team_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('members', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('position', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Portrait Image', required=False, width='fill-290x320'))])))])), ('cta_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('video-1', 'Video CTA')])), ('image', cms.flex.blocks.APIImageChooserBlock(label='Background Image', required=False, width='fill-1920x720')), ('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('button', wagtail.core.blocks.CharBlock(default='Get in touch', label='Button text', max_length=20, required=False)), ('button_link', wagtail.core.blocks.URLBlock(label='Button Link', required=False))])), ('pricing_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-290x320')), ('pricings', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('price', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('type', wagtail.core.blocks.ChoiceBlock(choices=[('hourly', 'Hourly'), ('monthly', 'Monthly'), ('unique', 'Unique')])), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False))])))])), ('content_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('centered', 'Centered'), ('two_columns_with_image', 'Two columns with image')])), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('content', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Content', max_length=10000, required=False))])), ('testimonial_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('testimonials', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=False)), ('name', wagtail.core.blocks.CharBlock(max_length=100, required=False)), ('category', wagtail.core.blocks.CharBlock(max_length=100, required=False)), ('content', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('html_section_block', wagtail.core.blocks.StructBlock([('html', wagtail.core.blocks.RawHTMLBlock(label='HTML Code', max_length=10000, required=False))])), ('portfolio_section_block', wagtail.core.blocks.StructBlock([('custom_classes', wagtail.core.blocks.CharBlock(label='Classes', max_length=100, required=False)), ('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('projects', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.CharBlock(max_length=200, required=True)), ('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=True)), ('link', wagtail.core.blocks.URLBlock(max_length=100, required=True))])))])), ('comingsoon_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-960x720')), ('timer', wagtail.core.blocks.DateTimeBlock(required=True))])), ('contact_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('contacts', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('type', wagtail.core.blocks.ChoiceBlock(choices=[('email', 'Email'), ('phone', 'Phone')])), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('data', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('faq_section_block', wagtail.core.blocks.StructBlock([('faqs', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(max_length=1000, required=True)), ('content', wagtail.core.blocks.TextBlock(max_length=5000, required=True))])))]))], blank=True, null=True)),
                ('search_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image', verbose_name='Search image')),
            ],
            options={
                'abstract': False,
            },
            bases=(wagtailmetadata.models.MetadataMixin, 'wagtailcore.page', models.Model),
        ),
        migrations.CreateModel(
            name='HomePage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
                ('seo_text', wagtail.core.fields.RichTextField(blank=True, null=True, verbose_name='SEO Text')),
                ('content', wagtail.core.fields.StreamField([('page_heading_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-960x720'))])), ('hero_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('button', wagtail.core.blocks.CharBlock(default='Get in touch', label='Button text', max_length=100, required=False)), ('button_link', wagtail.core.blocks.URLBlock(label='Button link', required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-960x720'))])), ('logo_cloud_block', wagtail.core.blocks.StructBlock([('logos', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=True))])))])), ('service_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('layout', wagtail.core.blocks.ChoiceBlock(choices=[('service_with_icon', 'Services with Icons'), ('service_with_image', 'Services with Images')])), ('services', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.CharBlock(required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-320x320')), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('feature_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('features', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.RawHTMLBlock(required=True, rows=5)), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('counter_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('counters', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.TextBlock(max_length=300, required=True)), ('count', wagtail.core.blocks.IntegerBlock(max_value=1000000, required=True)), ('unit', wagtail.core.blocks.CharBlock(max_length=30, required=True))])))])), ('team_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('members', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('position', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Portrait Image', required=False, width='fill-290x320'))])))])), ('cta_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('video-1', 'Video CTA')])), ('image', cms.flex.blocks.APIImageChooserBlock(label='Background Image', required=False, width='fill-1920x720')), ('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('button', wagtail.core.blocks.CharBlock(default='Get in touch', label='Button text', max_length=20, required=False)), ('button_link', wagtail.core.blocks.URLBlock(label='Button Link', required=False))])), ('pricing_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-290x320')), ('pricings', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('price', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('type', wagtail.core.blocks.ChoiceBlock(choices=[('hourly', 'Hourly'), ('monthly', 'Monthly'), ('unique', 'Unique')])), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False))])))])), ('content_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('centered', 'Centered'), ('two_columns_with_image', 'Two columns with image')])), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('content', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Content', max_length=10000, required=False))])), ('testimonial_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('testimonials', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=False)), ('name', wagtail.core.blocks.CharBlock(max_length=100, required=False)), ('category', wagtail.core.blocks.CharBlock(max_length=100, required=False)), ('content', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('html_section_block', wagtail.core.blocks.StructBlock([('html', wagtail.core.blocks.RawHTMLBlock(label='HTML Code', max_length=10000, required=False))])), ('portfolio_section_block', wagtail.core.blocks.StructBlock([('custom_classes', wagtail.core.blocks.CharBlock(label='Classes', max_length=100, required=False)), ('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('projects', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.CharBlock(max_length=200, required=True)), ('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=True)), ('link', wagtail.core.blocks.URLBlock(max_length=100, required=True))])))])), ('comingsoon_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False, width='fill-960x720')), ('timer', wagtail.core.blocks.DateTimeBlock(required=True))])), ('contact_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('contacts', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('type', wagtail.core.blocks.ChoiceBlock(choices=[('email', 'Email'), ('phone', 'Phone')])), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('data', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('faq_section_block', wagtail.core.blocks.StructBlock([('faqs', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(max_length=1000, required=True)), ('content', wagtail.core.blocks.TextBlock(max_length=5000, required=True))])))]))], blank=True, null=True)),
                ('search_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image', verbose_name='Search image')),
            ],
            options={
                'abstract': False,
            },
            bases=(wagtailmetadata.models.MetadataMixin, 'wagtailcore.page', models.Model),
        ),
    ]
