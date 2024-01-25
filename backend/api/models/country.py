from django.db import models
from imagekit.models import ProcessedImageField
from slugify import slugify


class Country(models.Model):
	name = models.CharField(max_length=100, unique=True)
	slug = models.SlugField(blank=True)
	flag = ProcessedImageField(
		upload_to='country/flags/',
		blank=True
	)

	def __str__(self):
		return self.name

	def save(self, *args, **kwargs):
		self.slug = slugify(self.name)
		super().save(*args, **kwargs)

	def get_absolute_url(self):
		pass
