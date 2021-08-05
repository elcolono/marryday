""" Account models """
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager


class User(AbstractUser):
    """
    Custom User Model which subclasses AbstractUser
    Defines the attributes of a User
    """
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    is_visitor = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.email}'
