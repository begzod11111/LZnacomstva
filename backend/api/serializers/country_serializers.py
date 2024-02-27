from api.models.country import Country
from api.serializers.base_serializers import BaseDynamicSerializer


class CountrySerializer(BaseDynamicSerializer):

	class Meta:
		model = Country
		fields = '__all__'

	@staticmethod
	def get_model_absolute_url(obj):
		return obj.get_absolute_url()

	def to_representation(self, instance):
		data = super().to_representation(instance)
		if self.fields.get('flag', False) and instance.flag:
			data['flag'] = self.get_absolute_media_url(instance.flag.url)
			return data
		return data
