from api.models.country import Country
from api.serializers.base_serializers import BaseDynamicSerializer


class CountrySerializer(BaseDynamicSerializer):

	class Meta:
		model = Country
		fields = '__all__'

	@staticmethod
	def get_model_absolute_url(obj):
		return obj.get_absolute_url()

