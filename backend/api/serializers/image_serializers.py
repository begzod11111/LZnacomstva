from api.models.image import Image
from api.serializers.base_serializers import BaseDynamicSerializer


class ImageSerializer(BaseDynamicSerializer):

	class Meta:
		model = Image
		fields = '__all__'
