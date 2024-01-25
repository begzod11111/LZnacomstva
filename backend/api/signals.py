import os
from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
from django.core.files.storage import default_storage
from api.models.image import Image


@receiver(pre_delete, sender=Image)
def delete_old_image(sender, instance, **kwargs):
    old_instance = Image.objects.get(pk=instance.pk)
    if old_instance.image:
        url = old_instance.image.path[:old_instance.image.path.rfind('\\')]
        default_storage.delete(old_instance.image.path)
        while url[url.rfind('\\') + 1:] != 'avatars':
            if os.listdir(url):
                return
            else:
                default_storage.delete(url)
                url = url[:url.rfind('\\')]


@receiver(pre_save, sender=Image)
def delete_old_image_on_change(sender, instance, **kwargs):
    if instance.pk:
        old_instance = Image.objects.get(pk=instance.pk)
        if old_instance.image and old_instance.image != instance.image:
            default_storage.delete(old_instance.image.path)
