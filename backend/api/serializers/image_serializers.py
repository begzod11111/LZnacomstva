from api.models.image import Image
from api.serializers.base_serializers import BaseDynamicSerializer


class ImageSerializer(BaseDynamicSerializer):

	class Meta:
		model = Image
		fields = '__all__'

	def to_representation(self, instance):
		data = super().to_representation(instance)
		if self.fields.get('image', False) and instance.image:
			data['image'] = self.get_absolute_media_url(instance.image.url)
			return data
		return data
