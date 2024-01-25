from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.models import Account
from api.serializers.account_serializers import AccountSerializer
from profiles.models import Profile
from profiles.serializer import ProfileSerializer


# Create your views here.


class AccountViewSet(ModelViewSet):
	queryset = Account.objects.all()

	def list(self, request, *args, **kwargs):
		# serializer = ProfileSerializer(dynamic_fields=('age',), dynamic_relations={
		# 	'user': AccountSerializer(dynamic_fields=('email',))
		# }, many=True, instance=self.get_queryset())
		serializer = AccountSerializer(
			instance=Account.objects.all(),
			many=True,
			dynamic_fields=('email', 'first_name', 'last_name', 'profile'))
		return Response(serializer.data)
