from django.contrib import admin
from api.models.gender import Gender


@admin.register(Gender)
class GenderAdmin(admin.ModelAdmin):
    pass
