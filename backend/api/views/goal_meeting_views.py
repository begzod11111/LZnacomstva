from django.db.models import Prefetch, OuterRef
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from accounts.models import Account
from api.models.goal_meeting import GoalMeeting
from api.models.image import Image
from api.serializers.account_serializers import AccountSerializer
from api.serializers.country_serializers import CountrySerializer
from api.serializers.goal_meeting_serializers import GoalMeetingSerializer
from api.serializers.image_serializers import ImageSerializer
from api.views.base_viewsets import BaseViewSet
from profiles.serializer import ProfileSerializer


class GoalMeetingViewSet(BaseViewSet, ModelViewSet):
	permission_classes = [IsAuthenticated]
	serializer_class = GoalMeetingSerializer
	lookup_field = 'slug'

	def get_queryset(self):
		if self.action == 'list' or self.action == 'retrieve':
			return GoalMeeting.objects.prefetch_related(
				Prefetch(
					'accounts',
					queryset=Account.objects.all(),
				),
				Prefetch(
					'accounts__images',
					queryset=Image.objects.filter(is_main=True)
				)
			).all()

		return GoalMeeting.objects.all()

	def get_serializer_fields(self):
		if self.action == 'list' or self.action == 'retrieve':
			return 'id', 'name', 'slug',

	def get_serializer_relations(self):
		if self.action == 'list':
			return {
				'accounts': serializers.SerializerMethodField(),
			}
		if self.action == 'retrieve':
			return {
				'accounts': AccountSerializer(
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
				)
			}
