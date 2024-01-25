# from django.db.models import Prefetch
# from django.http import HttpResponse, Http404
# from rest_framework.generics import ListAPIView
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from django.contrib.auth import views
# from rest_framework.views import APIView
# from rest_framework.viewsets import ModelViewSet, ViewSet
# from .mixsins import QuestionnaireDetailMixin
# from .models import *
# from rest_framework.response import Response
# from rest_framework import generics, status
# from .permissions import QuestionnaireUpdatePermissions
# from .serializers import *
# # Create your views here.
#
#
# class QuestionnaireViewSet(ModelViewSet):
#
# 	def get_object(self):
# 		if self.action == 'update':
# 			return Profile.objects.get(id=self.request.user.id)
# 		return super().get_object()
#
# 	def get_queryset(self):
# 		if self.action == 'create' or self.action == 'list':
# 			self.queryset = User.objects.all()
# 		else:
# 			self.queryset = Profile.objects.all()
# 		return super().get_queryset()
#
# 	def get_serializer_class(self):
# 		if self.action == 'list':
# 			return UserListItemSerializer
# 		elif self.action == 'retrieve' or self.action == 'update':
# 			return ProfileDetailSerializer
# 		elif self.action == 'create':
# 			return UserRegisterSerializer
#
# 	def get_permissions(self):
# 		if self.action == 'create':
# 			permission_classes = [AllowAny]
# 		else:
# 			permission_classes = [IsAuthenticated]
# 		return [permission() for permission in permission_classes]
#
# 	def retrieve(self, request, *args, **kwargs):
# 		try:
# 			instance = Profile.objects.get(slug=kwargs['user_slug'])
# 		except Profile.DoesNotExist:
# 			return Response(status=status.HTTP_404_NOT_FOUND)
# 		serializer = self.get_serializer(instance=instance)
# 		return Response(serializer.data)
#
# 	def list(self, request, *args, **kwargs):
# 		cats = PurposeOfDatingSerializer(PurposeOfDating.objects.all(), many=True)
# 		for cat in cats.data:
# 			cat['questionnaire'] = UserListItemSerializer(
# 				User.objects.prefetch_related(
# 					Prefetch(
# 						'profile__images',
# 						queryset=Image.objects.filter(is_main=True)
# 					)
# 				).filter(profile__PurposeOfDating_id=cat['id'])[:4], many=True
# 			).data
# 		return Response(cats.data)
#
#
# class PurposeOfDatingViewSet(ModelViewSet):
# 	queryset = PurposeOfDating.objects.all()
# 	serializer_class = PurposeOfDatingSerializer
#
# 	def retrieve(self, request, *args, **kwargs):
# 		try:
# 			instance = PurposeOfDating.objects.get(slug=kwargs['cat_slug'])
# 		except PurposeOfDating.DoesNotExist:
# 			return Response(status=status.HTTP_404_NOT_FOUND)
# 		serializer = self.get_serializer(instance=instance)
# 		data = serializer.data
# 		questionnaire = UserListItemSerializer(
# 				User.objects.filter(profile__PurposeOfDating=instance),
# 				many=True)
# 		data['questionnaire'] = questionnaire.data
# 		return Response(data)
#
#
# class GetMyData(APIView):
# 	def get(self, request, *args, **kwargs):
# 		print(request.user)
# 		if request.user.is_authenticated:
# 			profile = Profile.objects.prefetch_related(
# 				Prefetch(
# 					'images',
# 					queryset=Image.objects.filter(is_main=True)
# 				)
# 			).get(user_id=request.user.id)
# 			serializer = MyUserProfileSerializer(request.user.profile)
# 			return Response(serializer.data, status=status.HTTP_200_OK)
# 		return Response({
# 			'status': 'Not authenticated'
# 		})