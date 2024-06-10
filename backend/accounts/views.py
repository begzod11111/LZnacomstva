from django.db.models import Prefetch
from djoser.email import ActivationEmail
from rest_framework.fields import SerializerMethodField
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from templated_mail.mail import BaseEmailMessage

from accounts.models import Account
from api.models.image import Image
from api.serializers.account_serializers import AccountSerializer
from api.serializers.country_serializers import CountrySerializer
from api.serializers.goal_meeting_serializers import GoalMeetingSerializer
from api.serializers.image_serializers import ImageSerializer
from api.views.base_viewsets import BaseViewSet
from backend import settings
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
            Prefetch('images', queryset=Image.objects.all())
        ).get(id=self.request.user.id)
        serializer = AccountSerializer(
            dynamic_relations={
                'profile': ProfileSerializer(),
                'goal_meeting': GoalMeetingSerializer(dynamic_fields=('id', 'name',)),
                'images': ImageSerializer(dynamic_fields=('id', 'image', 'is_main'), many=True),

            },
            dynamic_fields=('id', 'email', 'last_name', 'first_name', 'gender'),
            instance=user
        )
        return Response(serializer.data)


