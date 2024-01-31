import rest_framework.serializers
from rest_framework import viewsets
from rest_framework.fields import SerializerMethodField

from api.models.country import Country
from api.serializers.account_serializers import AccountSerializer
from api.serializers.country_serializers import CountrySerializer
from api.views.base_viewsets import BaseViewSet


class CountryViewSet(BaseViewSet, viewsets.ModelViewSet):
	queryset = Country.objects.all()
	serializer_class = CountrySerializer
	lookup_field = 'slug'

	def get_serializer_fields(self):
		if self.action == 'retrieve':
			return 'name', 'accounts', 'flag'
		elif self.action == 'list':
			return 'name', 'model_absolute_url'
		return None

	def get_serializer_relations(self):
		if self.action == 'retrieve':
			return {
				'accounts': AccountSerializer(dynamic_fields=('email', ), many=True),
			}
		elif self.action == 'list':
			return {
				'model_absolute_url': SerializerMethodField()
			}
		return None
