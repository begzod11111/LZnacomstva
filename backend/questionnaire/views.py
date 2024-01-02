from django.db.models import Prefetch
from django.http import HttpResponse, Http404
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import views
from .mixsins import QuestionnaireDetailMixin
from .models import *
from rest_framework.response import Response
from rest_framework import generics, status

from .permissions import QuestionnaireUpdatePermissions
from .serializers import *
# Create your views here.


class RegistrationQuestionnaireView(generics.CreateAPIView):
	permission_classes = [AllowAny]
	queryset = User.objects.all()
	serializer_class = UserRegisterSerializer


class QuestionnaireListView(generics.ListAPIView):
	permission_classes = [IsAuthenticated]
	serializer_class = UserListItemSerializer

	def get_queryset(self):
		queryset = User.objects.select_related('profile').prefetch_related(
			Prefetch('profile__images', queryset=Image.objects.filter(is_main=True))
		).all()
		return queryset


class DetailQuestionnaireView(QuestionnaireDetailMixin, generics.RetrieveAPIView):
	permission_classes = [QuestionnaireUpdatePermissions]


class UpdateQuestionnaireView(generics.UpdateAPIView):
	permission_classes = (QuestionnaireUpdatePermissions,)
	serializer_class = ProfileDetailSerializer

	def get_object(self):
		obj = Profile.objects.get(user_id=self.request.user.id)
		return obj

	def update(self, request, *args, **kwargs):
		user_data = request.data.get('user', False)
		partial = kwargs.pop('partial', False)
		instance = self.get_object()
		if user_data:
			instance.user.username = user_data.get('username', instance.user.username)
			instance.user.email = user_data.get('email', instance.user.email)
			instance.user.date_joined = user_data.get('date_joined', instance.user.date_joined)
		serializer = self.get_serializer(instance, data=request.data, partial=partial)
		serializer.is_valid(raise_exception=True)
		self.perform_update(serializer)

		if getattr(instance, '_prefetched_objects_cache', None):
			# If 'prefetch_related' has been applied to a queryset, we need to
			# forcibly invalidate the prefetch cache on the instance.
			instance._prefetched_objects_cache = {}

		return Response(serializer.data)



