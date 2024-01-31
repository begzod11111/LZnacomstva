from django.db import models
from datetime import date
from django.utils.translation import gettext_lazy as _
from rest_framework.authtoken.models import Token
from accounts.models import Account
from api.models.country import Country
from api.models.gender import Gender
from api.models.goal_meeting import GoalMeeting


# Create your models here.

class Profile(models.Model):
	user = models.OneToOneField(Account, related_name='profile', on_delete=models.CASCADE)
	age = models.IntegerField(blank=True, null=True)
	date_of_birth = models.DateField(blank=True, null=True)

	class HairColor(models.TextChoices):
		PREFER_NOT_ANSWER = 'Not Answer', _('Предпочитаю не отвечать')
		BLUE = 'Blue', _('Синий')
		BLACK = 'Black', _('Черный')
		WHITE = 'White', _('Белый')

	class EyeColors(models.TextChoices):
		PREFER_NOT_ANSWER = 'Not Answer', _('Предпочитаю не отвечать')
		BLUE = 'Blue', _('Синий')
		BLACK = 'Black', _('Черный')
		WHITE = 'White', _('Белый')

	eye_color = models.CharField(
		max_length=10,
		choices=EyeColors.choices,
		default=EyeColors.PREFER_NOT_ANSWER,
		db_index=True
	)
	hair_color = models.CharField(
		max_length=10,
		choices=HairColor.choices,
		db_index=True,
		default=HairColor.PREFER_NOT_ANSWER
	)

	height = models.PositiveIntegerField(blank=True, null=True)
	weight = models.PositiveIntegerField(blank=True, null=True)
	about_me = models.TextField(blank=True, null=True)

	def get_age(self):
		now_date = date.today()
		age = now_date - self.date_of_birth
		return age.days // 365

	def save(self, *args, **kwargs):
		if self.date_of_birth:
			self.age = self.get_age()
		super().save(*args, *kwargs)

	def __str__(self):
		return f'{self.user}-profile'
