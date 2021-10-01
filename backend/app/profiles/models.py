from django.core.exceptions import ValidationError
from django.db import models


# Visitor
class Visitor(models.Model):
    # General
    user = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}"


# Vendor
class Vendor(models.Model):
    def validate_image(self):
        filesize = self.file.size
        megabyte_limit = 5.0
        if filesize > megabyte_limit * 1024 * 1024:
            raise ValidationError("Max file size is %sMB" % str(megabyte_limit))

    def update_filename(self, filename):
        ext = filename.split('.')[-1]
        return f"profiles/{self.id}/{self.user.first_name}-{self.user.last_name}.{ext}"

    user = models.ForeignKey(
        'accounts.User', related_name="vendors", on_delete=models.CASCADE)
    image = models.ImageField(null=True, upload_to=update_filename)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, editable=False)

    def __str__(self):
        return f"{self.user.email}"
