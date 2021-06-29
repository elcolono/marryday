from accounts.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from profiles.models import Visitor, Vendor


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    # print("Created: ", created)
    if created and instance.is_visitor:
        Visitor.objects.create(user=instance)
    if created and instance.is_company:
        Vendor.objects.create(user=instance, created_by=instance)
