from profiles.serializer import ProfileSerializer
from .account_serializers import AccountSerializer
from .base_serializers import BaseDynamicSerializer
from .country_serializers import CountrySerializer
from .image_serializers import ImageSerializer
from ..models.goal_meeting import GoalMeeting


class GoalMeetingSerializer(BaseDynamicSerializer):

	class Meta:
		model = GoalMeeting
		fields = '__all__'

	@staticmethod
	def get_model_absolute_url(obj):
		return obj.get_absolute_url()
	
	@staticmethod
	def get_accounts(obj):
		return AccountSerializer(
			dynamic_fields=('last_name', 'images', 'slug'),
			dynamic_relations={
				'images': ImageSerializer(
					many=True,
					dynamic_fields=('image', 'id')
				),
				'profile': ProfileSerializer(dynamic_fields=('age',)),
				'country': CountrySerializer(dynamic_fields=('name', 'flag'))
			},
			many=True,
			instance=obj.accounts.all()[:5]
		).data
