# Generated by Django 3.1.4 on 2021-01-12 18:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0022_auto_20210112_1745'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='location_bookings', to='cowork.location'),
        ),
    ]
