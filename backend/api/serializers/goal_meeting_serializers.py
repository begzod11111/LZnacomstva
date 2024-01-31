from .base_serializers import BaseDynamicSerializer
from ..models.goal_meeting import GoalMeeting


class GoalMeetingSerializer(BaseDynamicSerializer):

	class Meta:
		model = GoalMeeting
		fields = '__all__'

	@staticmethod
	def get_model_absolute_url(obj):
		return obj.get_absolute_url()
