# Generated by Django 3.1.5 on 2021-02-02 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0041_auto_20210202_2023'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='events_workshops',
            field=models.BooleanField(default=False, verbose_name='events & workshops'),
        ),
        migrations.AddField(
            model_name='location',
            name='fixdesk_month_office_address',
            field=models.BooleanField(default=False, verbose_name='office address'),
        ),
        migrations.AddField(
            model_name='location',
            name='flexdesk_day_office_address',
            field=models.BooleanField(default=False, verbose_name='office address'),
        ),
        migrations.AddField(
            model_name='location',
            name='flexdesk_hour_office_address',
            field=models.BooleanField(default=False, verbose_name='office address'),
        ),
        migrations.AddField(
            model_name='location',
            name='flexdesk_month_office_address',
            field=models.BooleanField(default=False, verbose_name='office address'),
        ),
        migrations.AddField(
            model_name='location',
            name='meetingroom_multimedia',
            field=models.BooleanField(default=False, verbose_name='multimedia'),
        ),
        migrations.AddField(
            model_name='location',
            name='meetingroom_onrequest',
            field=models.BooleanField(default=False, verbose_name='on request'),
        ),
        migrations.AddField(
            model_name='location',
            name='privatespace_month_office_address',
            field=models.BooleanField(default=False, verbose_name='office address'),
        ),
        migrations.AlterField(
            model_name='location',
            name='flexdesk_day_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Flexdesk day-price (net)'),
        ),
        migrations.AlterField(
            model_name='location',
            name='flexdesk_hour_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Flexdesk hour-price (net)'),
        ),
    ]