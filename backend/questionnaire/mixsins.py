from rest_framework import status
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response

from questionnaire.models import Profile
from questionnaire.serializers import ProfileDetailSerializer


class QuestionnaireDetailMixin(RetrieveModelMixin):

	def retrieve(self, request, *args, **kwargs):
		try:
			instance = Profile.objects.get(slug=kwargs['user_slug'])
		except Profile.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
		serializer = ProfileDetailSerializer(instance=instance)
		return Response(serializer.data)
