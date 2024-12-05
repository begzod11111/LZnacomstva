from django.db import models
from django.urls import reverse
from django.utils.functional import cached_property
from imagekit.models import ProcessedImageField
from django.utils.text import slugify


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
		self.slug = slugify(self.name, allow_unicode=True)
		super().save(*args, **kwargs)

	def get_absolute_url(self):
		return reverse('api:country-detail', kwargs={'slug': self.slug})
