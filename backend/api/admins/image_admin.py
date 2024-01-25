from django.contrib import admin
from api.models.image import Image


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass
