# Generated by Django 3.1.4 on 2021-01-09 20:44

import cowork.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0015_cityimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cityimage',
            name='image',
            field=models.FileField(upload_to=cowork.models.CityImage.update_filename),
        ),
        migrations.AlterField(
            model_name='locationimage',
            name='image',
            field=models.FileField(upload_to=cowork.models.LocationImage.update_filename),
        ),
    ]
