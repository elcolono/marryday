# Generated by Django 3.1.4 on 2021-01-16 15:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0026_auto_20210116_1009'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='openinghours',
            unique_together={('location', 'weekday', 'from_hour', 'to_hour')},
        ),
    ]