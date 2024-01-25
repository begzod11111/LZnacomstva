from django.db.models.functions import datetime
from django.utils.datetime_safe import strftime
from django.utils.functional import cached_property
from imagekit.models import ProcessedImageField
from django.db import models

from accounts.models import Account
from profiles.models import Profile


def directory_path_datatime(instance, filename):
	now = datetime.datetime.now()
	path_url = f'{instance.user._meta.model_name}/avatars'
	path_url += f'/user_{instance.user.email}/%m/%d/%Y{filename}'
	return strftime(now, path_url)


class Image(models.Model):
	user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='images')
	image = ProcessedImageField(
		upload_to=directory_path_datatime,
	)
	is_main = models.BooleanField(default=False)

	@cached_property
	def get_absolute_url(self):
		return self.image.url

	def save(self, *args, **kwargs):
		images_count = self.user.images.count()
		if images_count > 5:
			return
		elif not images_count:
			self.is_main = True
			super().save(*args, **kwargs)

	def __str__(self):
		return f'{self.user.email}- is_main{self.is_main}'
