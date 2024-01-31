from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _
from slugify import slugify

from accounts.managers import UserManager
from api.models.country import Country
from api.models.gender import Gender
from api.models.goal_meeting import GoalMeeting


# Create your models here.


class Account(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    slug = models.SlugField(unique=True, blank=True)
    goal_meeting = models.ForeignKey(
        GoalMeeting,
        on_delete=models.SET_NULL,
        null=True,
        db_index=True,
        related_name='accounts'
    )
    gender = models.ForeignKey(
        Gender,
        on_delete=models.SET_NULL,
        null=True,
        db_index=True,
        related_name='accounts'
    )
    country = models.ForeignKey(
        Country,
        on_delete=models.SET_NULL,
        null=True,
        related_name='accounts'
    )
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    @cached_property
    def get_fullname(self):
        fullname = f'{self.last_name} {self.first_name}'
        return fullname

    def get_absolute_url(self):
        return reverse('api:account-detail', kwargs={'slug': self.slug})
