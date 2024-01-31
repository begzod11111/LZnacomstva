from api.serializers.base_serializers import BaseDynamicSerializer
from profiles.models import Profile


class ProfileSerializer(BaseDynamicSerializer):
	class Meta:
		model = Profile
		fields = '__all__'
