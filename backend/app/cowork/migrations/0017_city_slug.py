# Generated by Django 3.1.4 on 2021-01-09 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0016_auto_20210109_2044'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='slug',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]