# Generated by Django 3.1.5 on 2021-02-01 18:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0037_auto_20210201_1735'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='district',
            name='postcode',
        ),
    ]