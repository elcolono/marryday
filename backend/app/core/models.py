import uuid
from django.db import models


class Image(models.Model):
    def update_filename(instance, filename):
        pass

    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False,
    )
    is_thumbnail = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=500)

    # image = models.FileField(upload_to=update_filename)

    class Meta:
        abstract = True
