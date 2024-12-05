from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.text import slugify
from accounts.models import Account
from rest_framework.authtoken.models import Token
from profiles.models import Profile


@receiver(post_save, sender=Account)
def create_account(sender, instance=None, created=False, **kwargs):
	if created:
		instance.slug = slugify(f"{instance.email}-{instance.pk}", allow_unicode=True)
		profile = Profile(user=instance)
		profile.save()
		instance.save()
