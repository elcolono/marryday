# Generated by Django 3.1.5 on 2021-02-18 06:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0046_auto_20210210_2145'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='preview_image',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='city_preview_image', to='cowork.cityimage'),
        ),
    ]