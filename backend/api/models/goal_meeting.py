from django.urls import reverse
from django.utils.text import slugify
from django.db import models


class GoalMeeting(models.Model):
	name = models.CharField(max_length=200, unique=True)
	slug = models.SlugField(blank=True)

	def __str__(self):
		return self.name

	def save(self, *args, **kwargs):
		self.slug = slugify(self.name)
		super().save(*args, **kwargs)

	def get_absolute_url(self):
		return reverse('api:goal-meeting-detail', kwargs={'slug': self.slug})
