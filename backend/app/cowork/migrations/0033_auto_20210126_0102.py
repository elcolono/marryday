# Generated by Django 3.1.5 on 2021-01-26 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0032_openinghours_open_24'),
    ]

    operations = [
        migrations.AlterField(
            model_name='openinghours',
            name='from_hour',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='openinghours',
            name='to_hour',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='openinghours',
            unique_together=set(),
        ),
    ]