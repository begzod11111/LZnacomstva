from django.db import models
from slugify import slugify


class Gender(models.Model):
	name = models.CharField(max_length=100, unique=True)
	slug = models.SlugField(blank=True)

	def __str__(self):
		return self.name

	def save(self, *args, **kwargs):
		self.slug = slugify(self.name)
		super().save(*args, **kwargs)

	def get_absolute_url(self):
		pass
