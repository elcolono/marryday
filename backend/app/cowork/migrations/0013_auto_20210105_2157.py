# Generated by Django 3.1.4 on 2021-01-05 21:57

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0012_auto_20210105_2120'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='id',
        ),
        migrations.AddField(
            model_name='booking',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='booking',
            name='payment_intent_id',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
