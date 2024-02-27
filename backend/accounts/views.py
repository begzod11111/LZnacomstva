from django.db.models import Prefetch
from rest_framework.fields import SerializerMethodField
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from accounts.models import Account
from api.models.image import Image
from api.serializers.account_serializers import AccountSerializer
from api.serializers.country_serializers import CountrySerializer
from api.serializers.goal_meeting_serializers import GoalMeetingSerializer
from api.serializers.image_serializers import ImageSerializer
from api.views.base_viewsets import BaseViewSet
from profiles.serializer import ProfileSerializer


# Create your views here.


class AccountViewSet(BaseViewSet, ModelViewSet):
	queryset = Account.objects.all()
	serializer_class = AccountSerializer
	lookup_field = 'slug'

	def get_serializer_relations(self):
		if self.action == 'list':
			return {
				'images': ImageSerializer(dynamic_fields=('id', 'image', 'is_main'), many=True),
				'country': CountrySerializer(dynamic_fields=('name', 'flag')),
				'profile': ProfileSerializer(dynamic_fields=('age', ))
			}
		if self.action == 'retrieve':
			return {
				'goal_meeting': GoalMeetingSerializer(dynamic_fields=('name',)),
				'images': ImageSerializer(dynamic_fields=('id', 'image', 'is_main'), many=True),
				'profile': ProfileSerializer(dynamic_fields=(
					'age',
					'about_me',
					'eye_color',
					'hair_color',
					'height',
					'weight',
				))
			}

	def get_serializer_fields(self):
		if self.action == 'list':
			return 'id', 'last_name', 'images', 'country', 'profile'
		if self.action == 'retrieve':
			return 'last_name', 'date_joined'

	def get_queryset(self):
		if self.action == 'list':
			return Account.objects.prefetch_related(
				Prefetch('images', queryset=Image.objects.filter(is_main=True))
			).all()
		return Account.objects.all()


class MyDataAPIView(APIView):
	def get(self, reverse, *args, **kwargs):
		user = Account.objects.prefetch_related(
			Prefetch('images', queryset=Image.objects.filter(is_main=True))
		).get(id=self.request.user.id)
		serializer = AccountSerializer(
			dynamic_relations={
				'images': ImageSerializer(dynamic_fields=('id', 'image',), many=True),
				'full_name': SerializerMethodField(),
			},
			dynamic_fields=('images', 'full_name'),
			instance=user
		)
		return Response(serializer.data)
