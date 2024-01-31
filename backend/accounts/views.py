from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from accounts.models import Account
from api.serializers.account_serializers import AccountSerializer
from api.serializers.country_serializers import CountrySerializer
from api.serializers.image_serializers import ImageSerializer
from api.views.base_viewsets import BaseViewSet
from profiles.serializer import ProfileSerializer


# Create your views here.


class AccountViewSet(BaseViewSet, ModelViewSet):
	queryset = Account.objects.all()
	serializer_class = AccountSerializer
	lookup_field = 'slug'

	def get_serializer_fields(self):
		return None

