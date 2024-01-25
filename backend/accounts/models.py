from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _
from slugify import slugify

from accounts.managers import UserManager


# Create your models here.


class Account(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    slug = models.SlugField(unique=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    @cached_property
    def get_fullname(self):
        fullname = f'{self.last_name} {self.first_name}'
        return fullname
