from django.contrib import admin
from api.models.country import Country


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    pass
