# Generated by Django 3.1.4 on 2021-01-09 20:21

import cowork.models
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0014_auto_20210106_1942'),
    ]

    operations = [
        migrations.CreateModel(
            name='CityImage',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('is_thumbnail', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=100)),
                ('image', models.FileField(upload_to=cowork.models.Image.update_filename)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='images', to='cowork.city')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]