# Generated by Django 3.1.13 on 2021-10-01 15:34

import cms.flex.blocks
from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields
import wagtail.images.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0017_auto_20210925_2005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='content',
            field=wagtail.core.fields.StreamField([('hero_with_search_bar', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('show_searchbar', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(required=True)), ('use_search', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('use_location_filter', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('use_product_category_filter', wagtail.core.blocks.BooleanBlock(default=True, required=False))])), ('service_section_block', wagtail.core.blocks.StructBlock([('grey_background', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Heading', label='Heading', max_length=100, required=True)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Subheading', label='Subheading', max_length=100, required=False)), ('layout', wagtail.core.blocks.ChoiceBlock(choices=[('service_with_icon', 'Services with Icons'), ('service_with_image', 'Services with Images')])), ('services', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.CharBlock(required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False)), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('topic_slider', wagtail.core.blocks.StructBlock([('grey_background', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('loop_slides', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Heading', label='Heading', max_length=100, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Subheading', label='Subheading', max_length=100, required=False)), ('button_link', cms.flex.blocks.APIPageChooserBlock(required=False)), ('button_text', wagtail.core.blocks.CharBlock(max_length=80, required=False))])), ('product_slider', wagtail.core.blocks.StructBlock([('grey_background', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('loop_slides', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Heading', label='Heading', max_length=100, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Subheading', label='Subheading', max_length=100, required=False)), ('button_link', cms.flex.blocks.APIPageChooserBlock(required=False)), ('button_text', wagtail.core.blocks.CharBlock(max_length=80, required=False))])), ('cta_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('video-1', 'Video CTA')])), ('image', cms.flex.blocks.APIImageChooserBlock(label='Background Image', required=False)), ('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('button_text', wagtail.core.blocks.CharBlock(default='Get in touch', label='Button text', max_length=20, required=False)), ('button_href', cms.flex.blocks.APIPageChooserBlock(required=False))])), ('testimonial_slider', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('testimonials', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False)), ('name', wagtail.core.blocks.CharBlock(max_length=100, required=False)), ('content', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('page_heading_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('without_background', 'Without background'), ('with_background', 'With background')])), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image')), ('primary_button_link', cms.flex.blocks.APIPageChooserBlock(required=False)), ('primary_button_text', wagtail.core.blocks.CharBlock(max_length=80, required=False)), ('secondary_button_link', cms.flex.blocks.APIPageChooserBlock(required=False)), ('secondary_button_text', wagtail.core.blocks.CharBlock(max_length=80, required=False))])), ('map_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False))])), ('hero_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('button_text', wagtail.core.blocks.CharBlock(default='Get in touch', label='Button text', max_length=100, required=False)), ('button_link', cms.flex.blocks.APIPageChooserBlock(label='Button link', required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(required=True))])), ('city_gallery_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Heading', label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=5000, required=False))])), ('logo_cloud_block', wagtail.core.blocks.StructBlock([('logos', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=True))])))])), ('feature_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('features', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.RawHTMLBlock(required=True, rows=5)), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('counter_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('counters', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.TextBlock(max_length=300, required=True)), ('count', wagtail.core.blocks.IntegerBlock(max_value=1000000, required=True)), ('unit', wagtail.core.blocks.CharBlock(max_length=30, required=True))])))])), ('team_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('members', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('position', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Portrait Image', required=False))])))])), ('pricing_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False)), ('pricings', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('price', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('suffix', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('items', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(required=True)), ('status', wagtail.core.blocks.BooleanBlock(default=True))])))])))])), ('content_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('centered', 'Centered'), ('two_columns_with_image', 'Two columns with image')])), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('content', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Content', max_length=10000, required=False))])), ('html_section_block', wagtail.core.blocks.StructBlock([('html', wagtail.core.blocks.RawHTMLBlock(label='HTML Code', max_length=10000, required=False))])), ('portfolio_section_block', wagtail.core.blocks.StructBlock([('custom_classes', wagtail.core.blocks.CharBlock(label='Classes', max_length=100, required=False)), ('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('projects', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.CharBlock(max_length=200, required=True)), ('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=True)), ('link', wagtail.core.blocks.URLBlock(max_length=100, required=True))])))])), ('comingsoon_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('timer', wagtail.core.blocks.DateTimeBlock(required=True))])), ('contact_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('contacts', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('type', wagtail.core.blocks.ChoiceBlock(choices=[('email', 'Email'), ('phone', 'Phone')])), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('content', wagtail.core.blocks.TextBlock(max_length=500, required=True)), ('data', wagtail.core.blocks.TextBlock(max_length=300, required=True))]))), ('content', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Content', max_length=400, required=False)), ('social', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.CharBlock(max_length=100, required=False)), ('link', wagtail.core.blocks.URLBlock(max_length=100, required=False))])))])), ('faq_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('padding_top', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('padding_bottom', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('faqs', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(max_length=1000, required=True)), ('content', wagtail.core.blocks.TextBlock(max_length=5000, required=True))])))])), ('login_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False))])), ('booking_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False))])), ('text_with_image_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('text_left', 'Text left'), ('text_right', 'Text right')])), ('padding_top', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('padding_bottom', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('grey_background', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=500, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=500, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=1500, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(required=True)), ('image_width', wagtail.core.blocks.IntegerBlock()), ('image_height', wagtail.core.blocks.IntegerBlock())]))], blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='subpage',
            name='content',
            field=wagtail.core.fields.StreamField([('hero_with_search_bar', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('show_searchbar', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(required=True)), ('use_search', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('use_location_filter', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('use_product_category_filter', wagtail.core.blocks.BooleanBlock(default=True, required=False))])), ('service_section_block', wagtail.core.blocks.StructBlock([('grey_background', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Heading', label='Heading', max_length=100, required=True)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Subheading', label='Subheading', max_length=100, required=False)), ('layout', wagtail.core.blocks.ChoiceBlock(choices=[('service_with_icon', 'Services with Icons'), ('service_with_image', 'Services with Images')])), ('services', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.CharBlock(required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False)), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('topic_slider', wagtail.core.blocks.StructBlock([('grey_background', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('loop_slides', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Heading', label='Heading', max_length=100, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Subheading', label='Subheading', max_length=100, required=False)), ('button_link', cms.flex.blocks.APIPageChooserBlock(required=False)), ('button_text', wagtail.core.blocks.CharBlock(max_length=80, required=False))])), ('product_slider', wagtail.core.blocks.StructBlock([('grey_background', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('loop_slides', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Heading', label='Heading', max_length=100, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Subheading', label='Subheading', max_length=100, required=False)), ('button_link', cms.flex.blocks.APIPageChooserBlock(required=False)), ('button_text', wagtail.core.blocks.CharBlock(max_length=80, required=False))])), ('cta_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('video-1', 'Video CTA')])), ('image', cms.flex.blocks.APIImageChooserBlock(label='Background Image', required=False)), ('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('button_text', wagtail.core.blocks.CharBlock(default='Get in touch', label='Button text', max_length=20, required=False)), ('button_href', cms.flex.blocks.APIPageChooserBlock(required=False))])), ('testimonial_slider', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('testimonials', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False)), ('name', wagtail.core.blocks.CharBlock(max_length=100, required=False)), ('content', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('page_heading_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('without_background', 'Without background'), ('with_background', 'With background')])), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image')), ('primary_button_link', cms.flex.blocks.APIPageChooserBlock(required=False)), ('primary_button_text', wagtail.core.blocks.CharBlock(max_length=80, required=False)), ('secondary_button_link', cms.flex.blocks.APIPageChooserBlock(required=False)), ('secondary_button_text', wagtail.core.blocks.CharBlock(max_length=80, required=False))])), ('map_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False))])), ('hero_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=80, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('button_text', wagtail.core.blocks.CharBlock(default='Get in touch', label='Button text', max_length=100, required=False)), ('button_link', cms.flex.blocks.APIPageChooserBlock(label='Button link', required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(required=True))])), ('city_gallery_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Heading', label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=5000, required=False))])), ('logo_cloud_block', wagtail.core.blocks.StructBlock([('logos', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=True))])))])), ('feature_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('features', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.RawHTMLBlock(required=True, rows=5)), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.TextBlock(max_length=300, required=True))])))])), ('counter_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('counters', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.TextBlock(max_length=300, required=True)), ('count', wagtail.core.blocks.IntegerBlock(max_value=1000000, required=True)), ('unit', wagtail.core.blocks.CharBlock(max_length=30, required=True))])))])), ('team_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('members', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('position', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Portrait Image', required=False))])))])), ('pricing_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False)), ('pricings', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('price', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('suffix', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('items', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(required=True)), ('status', wagtail.core.blocks.BooleanBlock(default=True))])))])))])), ('content_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('centered', 'Centered'), ('two_columns_with_image', 'Two columns with image')])), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('content', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Content', max_length=10000, required=False))])), ('html_section_block', wagtail.core.blocks.StructBlock([('html', wagtail.core.blocks.RawHTMLBlock(label='HTML Code', max_length=10000, required=False))])), ('portfolio_section_block', wagtail.core.blocks.StructBlock([('custom_classes', wagtail.core.blocks.CharBlock(label='Classes', max_length=100, required=False)), ('heading', wagtail.core.blocks.CharBlock(label='Heading', max_length=100, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('projects', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('description', wagtail.core.blocks.CharBlock(max_length=200, required=True)), ('image', wagtail.images.blocks.ImageChooserBlock(label='Image', required=True)), ('link', wagtail.core.blocks.URLBlock(max_length=100, required=True))])))])), ('comingsoon_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('timer', wagtail.core.blocks.DateTimeBlock(required=True))])), ('contact_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('contacts', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('type', wagtail.core.blocks.ChoiceBlock(choices=[('email', 'Email'), ('phone', 'Phone')])), ('heading', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('content', wagtail.core.blocks.TextBlock(max_length=500, required=True)), ('data', wagtail.core.blocks.TextBlock(max_length=300, required=True))]))), ('content', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Content', max_length=400, required=False)), ('social', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('icon', wagtail.core.blocks.CharBlock(max_length=100, required=False)), ('link', wagtail.core.blocks.URLBlock(max_length=100, required=False))])))])), ('faq_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Section', label='Heading', max_length=80, required=False)), ('padding_top', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('padding_bottom', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('faqs', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(max_length=1000, required=True)), ('content', wagtail.core.blocks.TextBlock(max_length=5000, required=True))])))])), ('login_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(label='Image', required=False))])), ('booking_section_block', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(label='Title', max_length=100, required=True)), ('description', wagtail.core.blocks.RichTextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=400, required=False))])), ('text_with_image_section_block', wagtail.core.blocks.StructBlock([('layout', wagtail.core.blocks.ChoiceBlock(choices=[('text_left', 'Text left'), ('text_right', 'Text right')])), ('padding_top', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('padding_bottom', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('grey_background', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(default='Super Awesome Feature', label='Feature', max_length=500, required=False)), ('subheading', wagtail.core.blocks.CharBlock(default='Super Awesome Hero Subheading', label='Subheading', max_length=500, required=False)), ('description', wagtail.core.blocks.TextBlock(default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.', label='Description', max_length=1500, required=False)), ('image', cms.flex.blocks.APIImageChooserBlock(required=True)), ('image_width', wagtail.core.blocks.IntegerBlock()), ('image_height', wagtail.core.blocks.IntegerBlock())]))], blank=True, null=True),
        ),
    ]